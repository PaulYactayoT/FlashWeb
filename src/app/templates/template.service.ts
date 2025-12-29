import { Injectable } from '@angular/core';
import { Template } from './template.model';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    private templates: Template[] = [
        {
            id: 'corporate-1',
            name: 'Corporate Pulse',
            description: 'A professional template for modern businesses.',
            category: 'Corporate',
            previewImage: 'assets/templates/corporate-1.jpg',
            colorScheme: {
                primary: '#003366',
                secondary: '#0055A4',
                accent: '#FFD700'
            },
            features: ['Responsive Layout', 'Contact Form', 'Team Section']
        },
        {
            id: 'creative-1',
            name: 'Creative Studio',
            description: 'Vibrant and dynamic design for creative agencies.',
            category: 'Creative',
            previewImage: 'assets/templates/creative-1.jpg',
            colorScheme: {
                primary: '#FF4081',
                secondary: '#C51162',
                accent: '#00E676'
            },
            features: ['Portfolio Gallery', 'Animated Headers', 'Blog Integration']
        },
        {
            id: 'retail-1',
            name: 'Urban Retail',
            description: 'Clean and sales-focused template for shops.',
            category: 'Retail',
            previewImage: 'assets/templates/retail-1.jpg',
            colorScheme: {
                primary: '#2E7D32',
                secondary: '#1B5E20',
                accent: '#FFAB00'
            },
            features: ['Product Showcase', 'Opening Hours', 'Map Integration']
        }
    ];

    getAllTemplates(): Template[] {
        return this.templates;
    }

    getTemplateById(id: string): Template | undefined {
        return this.templates.find(t => t.id === id);
    }
}
