import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatePreviewModalComponent } from '../template-preview-modal/template-preview-modal';
import { ModalService } from '../../services/modal.service';

interface Template {
    id: number;
    title: string;
    category: string;
    categoryId: string;
    description: string;
    image: string;
    features: string[];
}

interface Category {
    id: string;
    name: string;
}

@Component({
    selector: 'app-template-showcase',
    imports: [CommonModule, TemplatePreviewModalComponent],
    templateUrl: './template-showcase.component.html',
    styleUrl: './template-showcase.component.scss'
})
export class TemplateShowcaseComponent {
    private modalService = inject(ModalService);
    protected activeCategory = signal<string>('all');
    protected isModalOpen = this.modalService.isOpen;
    protected selectedTemplate = signal<Template | null>(null);

    protected categories: Category[] = [
        { id: 'all', name: 'Todas' },
        { id: 'legal', name: 'Legal' },
        { id: 'ecommerce', name: 'E-commerce' },
        { id: 'real-estate', name: 'Inmobiliaria' },
        { id: 'health', name: 'Salud' }
    ];

    protected templates: Template[] = [
        {
            id: 1,
            title: 'Estudio Jurídico Premium',
            category: 'Legal',
            categoryId: 'legal',
            description: 'Diseño elegante y profesional para estudios de abogados con enfoque en confianza y credibilidad.',
            image: '/assets/templates/law-firm.svg',
            features: [
                'Áreas de práctica destacadas',
                'Perfiles de abogados',
                'Blog legal integrado',
                'Formulario de consulta'
            ]
        },
        {
            id: 2,
            title: 'Bodega E-commerce',
            category: 'E-commerce',
            categoryId: 'ecommerce',
            description: 'Tienda online completa para vinos y licores con catálogo de productos y carrito de compras.',
            image: '/assets/templates/ecommerce.svg',
            features: [
                'Catálogo de productos',
                'Filtros avanzados',
                'Carrito de compras',
                'Sistema de pagos'
            ]
        },
        {
            id: 3,
            title: 'Inmobiliaria Luxury',
            category: 'Inmobiliaria',
            categoryId: 'real-estate',
            description: 'Plataforma elegante para mostrar propiedades con búsqueda avanzada y tours virtuales.',
            image: '/assets/templates/real-estate.svg',
            features: [
                'Listado de propiedades',
                'Búsqueda con filtros',
                'Galería de imágenes',
                'Perfil de agentes'
            ]
        },
        {
            id: 4,
            title: 'Farmacia Online',
            category: 'Salud',
            categoryId: 'health',
            description: 'Tienda online de farmacia con productos de salud, medicamentos y envío rápido.',
            image: '/assets/templates/pharmacy.svg',
            features: [
                'Categorías de productos',
                'Recetas médicas online',
                'Delivery tracking',
                'Consultas virtuales'
            ]
        }
    ];

    protected filteredTemplates = computed(() => {
        const category = this.activeCategory();
        if (category === 'all') {
            return this.templates;
        }
        return this.templates.filter(t => t.categoryId === category);
    });

    setCategory(categoryId: string) {
        this.activeCategory.set(categoryId);
    }

    viewDemo(templateId: number) {
        const template = this.templates.find(t => t.id === templateId);
        if (template) {
            this.selectedTemplate.set(template);
            this.modalService.openModal();
        }
    }

    closeModal() {
        this.modalService.closeModal();
        this.selectedTemplate.set(null);
    }
}
