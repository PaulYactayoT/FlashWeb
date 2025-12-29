import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../template.service';
import { Template, BusinessInfo } from '../template.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { BusinessDataService } from '../business-data.service';
import { TemplatePreviewEmbeddedComponent } from '../../components/template-preview-embedded/template-preview-embedded';

@Component({
  selector: 'app-template-builder',
  imports: [CommonModule, DecimalPipe, ReactiveFormsModule, TemplatePreviewEmbeddedComponent],
  templateUrl: './template-builder.component.html',
  styleUrl: './template-builder.component.scss'
})
export class TemplateBuilderComponent {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  private templateService = inject(TemplateService);
  private fb = inject(FormBuilder);
  public businessDataService = inject(BusinessDataService);

  template: Template | undefined;
  businessForm: FormGroup;
  activeStep: number = 1;
  previewHtml: string = '';

  constructor() {
    this.businessForm = this.fb.group({
      businessName: ['', Validators.required],
      businessType: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      openingHours: ['', Validators.required],
      socialMedia: this.fb.group({
        facebook: [''],
        instagram: [''],
        twitter: ['']
      })
    });
  }

  ngOnInit(): void {
    const templateId = this.route.snapshot.paramMap.get('id');
    if (templateId) {
      this.template = this.templateService.getTemplateById(templateId);
      if (!this.template) {
        this.router.navigate(['/']);
      } else {
        this.generatePreview();
      }
    }
  }

  nextStep(): void {
    if (this.activeStep === 1 && this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }
    // Guardar datos del formulario en el servicio antes de avanzar
    if (this.activeStep === 2) {
      const businessInfo: BusinessInfo = this.businessForm.value;
      this.businessDataService.setBusinessInfo(businessInfo);
    }
    this.activeStep++;
    this.generatePreview();
  }

  prevStep(): void {
    this.activeStep--;
  }

  generatePreview(): void {
    if (!this.template) return;

    const businessInfo = this.businessForm.value;
    const primaryColor = this.template.colorScheme.primary;
    const secondaryColor = this.template.colorScheme.secondary;
    const accentColor = this.template.colorScheme.accent;

    this.previewHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: ${accentColor};
          }
          .header {
            background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
            color: white;
            padding: 2rem;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 2.5rem;
          }
          .header p {
            margin: 0.5rem 0 0;
            font-size: 1.1rem;
          }
          .nav {
            background-color: ${primaryColor};
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-around;
          }
          .content {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          .business-info {
            background-color: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
          }
          .business-info h2 {
            color: ${primaryColor};
            margin-top: 0;
          }
          .footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1rem;
            position: fixed;
            bottom: 0;
            width: 100%;
          }
          .btn {
            background-color: ${primaryColor};
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s;
          }
          .btn:hover {
            background-color: ${secondaryColor};
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${businessInfo.businessName || 'Nombre de tu Negocio'}</h1>
          <p>${this.template.description}</p>
        </div>
        <nav class="nav">
          <a href="#inicio" style="color: white; text-decoration: none;">Inicio</a>
          <a href="#servicios" style="color: white; text-decoration: none;">Servicios</a>
          <a href="#contacto" style="color: white; text-decoration: none;">Contacto</a>
        </nav>
        <div class="content">
          <div class="business-info">
            <h2>Sobre Nosotros</h2>
            <p><strong>Tipo de negocio:</strong> ${businessInfo.businessType || this.template.name}</p>
            <p><strong>Dirección:</strong> ${businessInfo.address || 'Dirección no especificada'}</p>
            <p><strong>Teléfono:</strong> ${businessInfo.phone || 'Teléfono no especificado'}</p>
            <p><strong>Email:</strong> ${businessInfo.email || 'Email no especificado'}</p>
            <p><strong>Horario:</strong> ${businessInfo.openingHours || 'Horario no especificado'}</p>
            <p>${businessInfo.description || 'Descripción de tu negocio aparecerá aquí'}</p>
          </div>

          <div class="features">
            <h2>Nuestros Servicios</h2>
            <ul style="list-style-type: none; padding: 0;">
              ${this.template.features.map(feature => `<li style="padding: 0.5rem; background-color: #f5f5f5; margin-bottom: 0.5rem; border-radius: 4px;">${feature}</li>`).join('')}
            </ul>
          </div>

          <div class="contact" id="contacto">
            <h2>Contáctanos</h2>
            <p>Puedes visitarnos en nuestra dirección o contactarnos por teléfono/email.</p>
            ${businessInfo.socialMedia?.facebook ? `<p>Facebook: <a href="${businessInfo.socialMedia.facebook}" target="_blank">${businessInfo.socialMedia.facebook}</a></p>` : ''}
            ${businessInfo.socialMedia?.instagram ? `<p>Instagram: <a href="${businessInfo.socialMedia.instagram}" target="_blank">${businessInfo.socialMedia.instagram}</a></p>` : ''}
            ${businessInfo.socialMedia?.twitter ? `<p>Twitter: <a href="${businessInfo.socialMedia.twitter}" target="_blank">${businessInfo.socialMedia.twitter}</a></p>` : ''}
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${businessInfo.businessName || 'Tu Negocio'}. Todos los derechos reservados.</p>
        </div>
      </body>
      </html>
    `;
  }

  downloadWebsite(): void {
    const blob = new Blob([this.previewHtml], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.businessForm.value.businessName || 'mi-negocio'}-website.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  getStepTitle(step: number): string {
    const titles = [
      'Información del Negocio',
      'Personalización',
      'Vista Previa',
      'Descarga'
    ];
    return titles[step - 1] || '';
  }
}