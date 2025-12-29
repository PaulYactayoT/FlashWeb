import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
    id: number;
    icon: string;
    title: string;
    description: string;
    features: string[];
}

@Component({
    selector: 'app-services',
    imports: [CommonModule],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss'
})
export class ServicesComponent {
    protected services: Service[] = [
        {
            id: 1,
            icon: '🎨',
            title: 'Diseño Web',
            description: 'Diseños modernos y atractivos que capturan la esencia de tu marca.',
            features: [
                'Diseño personalizado',
                'UI/UX profesional',
                'Prototipado rápido'
            ]
        },
        {
            id: 2,
            icon: '💻',
            title: 'Desarrollo Web',
            description: 'Desarrollo con las últimas tecnologías para máximo rendimiento.',
            features: [
                'Código limpio y mantenible',
                'Tecnologías modernas',
                'Optimización de rendimiento'
            ]
        },
        {
            id: 3,
            icon: '🛒',
            title: 'E-commerce',
            description: 'Tiendas online completas con gestión de inventario y pagos.',
            features: [
                'Catálogo de productos',
                'Carrito de compras',
                'Pasarelas de pago'
            ]
        },
        {
            id: 4,
            icon: '📱',
            title: 'Responsive Design',
            description: 'Sitios perfectamente adaptados a todos los dispositivos.',
            features: [
                'Mobile-first',
                'Tablet optimizado',
                'Desktop premium'
            ]
        },
        {
            id: 5,
            icon: '🚀',
            title: 'SEO Optimization',
            description: 'Optimización para motores de búsqueda y mejor visibilidad.',
            features: [
                'Meta tags optimizados',
                'Performance mejorado',
                'Indexación efectiva'
            ]
        },
        {
            id: 6,
            icon: '🔧',
            title: 'Mantenimiento',
            description: 'Soporte continuo y actualizaciones para tu sitio web.',
            features: [
                'Actualizaciones regulares',
                'Monitoreo 24/7',
                'Backup automático'
            ]
        }
    ];
}
