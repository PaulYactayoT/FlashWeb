import { Component, inject } from '@angular/core';
import { TemplateService } from '../template.service';
import { Template } from '../template.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.scss'
})
export class TemplateSelectorComponent {
  private templateService = inject(TemplateService);
  private router = inject(Router);

  templates: Template[] = [];
  selectedCategory: string = 'all';
  searchQuery: string = '';

  constructor() {
    this.templates = this.templateService.getAllTemplates();
  }

  filterTemplates(): Template[] {
    let filtered = this.templates;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === this.selectedCategory);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  selectTemplate(templateId: string): void {
    this.router.navigate(['/builder', templateId]);
  }

  getCategories(): string[] {
    const categories = this.templates.map(template => template.category);
    return ['all', ...new Set(categories)];
  }
}