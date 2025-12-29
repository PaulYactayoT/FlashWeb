import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-quienes-somos-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
  ],
  template: `
    <app-navbar />
    <main class="quienes-somos-page">
      <div class="page-header">
        <div class="container">
          <h1 class="page-title"><span class="gradient-text">FlashWeb</span></h1>
          <div class="content-wrapper">
            <p class="description animate-up">
              Somos una empresa emergente especializada en el desarrollo de páginas web, plantillas profesionales y sistemas digitales a medida. Nacemos con el objetivo de ofrecer soluciones modernas, funcionales y accesibles, enfocadas en impulsar la presencia digital de negocios, emprendedores y marcas en crecimiento.
            </p>
            <p class="description animate-up" style="animation-delay: 0.2s">
              Trabajamos con tecnología actual, diseño optimizado y un enfoque práctico orientado a resultados.
            </p>
            
            <div class="project-showcase animate-up" style="animation-delay: 0.4s">
              <span class="project-label">Nuestro Primer Proyecto</span>
              <a href="https://firma-legal-jeanne-huayta.vercel.app/" target="_blank" class="project-link">
                Firma Legal Jeanne Huayta
                <span class="link-icon">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer />
  `,
  styles: [`
    .quienes-somos-page {
      padding-top: 100px;
      min-height: 100vh;
      background: rgba(10, 10, 15, 0.3) !important;
      display: flex;
      flex-direction: column;
    }
    .page-header {
      text-align: center;
      padding: 100px 0;
      flex: 1;
      display: flex;
      align-items: center;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .page-title {
      font-size: 4rem;
      font-weight: 800;
      margin-bottom: 40px;
      color: #fff;
    }
    .content-wrapper {
      background: rgba(255, 255, 255, 0.03);
      padding: 60px;
      border-radius: 30px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    .description {
      font-size: 1.4rem;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 30px;
      text-align: justify;
    }
    .description:nth-child(2) {
      margin-bottom: 40px;
      font-weight: 500;
      color: #fff;
      text-align: center;
    }
    .project-showcase {
      margin-top: 40px;
      padding-top: 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
    .project-label {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 600;
    }
    .project-link {
      font-size: 1.8rem;
      color: #FFD700;
      text-decoration: none;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;
    }
    .project-link:hover {
      color: #fff;
      transform: translateY(-2px);
    }
    .link-icon {
      font-size: 1.2rem;
      opacity: 0.7;
    }
    .animate-up {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @media (max-width: 768px) {
      .page-title {
        font-size: 2.8rem;
      }
      .content-wrapper {
        padding: 40px 20px;
      }
      .description {
        font-size: 1.1rem;
      }
      .project-link {
        font-size: 1.4rem;
      }
    }
  `]
})
export class QuienesSomosPage { }
