import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessInfo } from '../../templates/template.model';

@Component({
  selector: 'app-template-preview-embedded',
  imports: [CommonModule],
  templateUrl: './template-preview-embedded.html',
  styleUrl: './template-preview-embedded.scss',
  encapsulation: ViewEncapsulation.None
})
export class TemplatePreviewEmbeddedComponent {
  @Input() businessInfo: BusinessInfo | null = null;
  @Input() templateId: string = 'corporate-1';
}
