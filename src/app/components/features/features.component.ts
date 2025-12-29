import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
    id: number;
    icon: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-features',
    imports: [CommonModule],
    templateUrl: './features.component.html',
    styleUrl: './features.component.scss'
})
export class FeaturesComponent {
    protected features: Feature[] = [
        {
            id: 1,
            icon: '📱',
            title: 'Diseño Responsive',
            description: 'Tu sitio web se verá perfecto en cualquier dispositivo, desde móviles hasta pantallas 4K.'
        },
        {
            id: 2,
            icon: '⚡',
            title: 'Carga Ultra Rápida',
            description: 'Optimización avanzada para tiempos de carga mínimos y mejor experiencia de usuario.'
        },
        {
            id: 3,
            icon: '🔒',
            title: 'Seguridad Premium',
            description: 'Protección completa con certificados SSL y las mejores prácticas de seguridad web.'
        },
        {
            id: 4,
            icon: '🎨',
            title: 'Diseño Personalizado',
            description: 'Cada proyecto es único y adaptado específicamente a tu marca y necesidades.'
        },
        {
            id: 5,
            icon: '🔍',
            title: 'SEO Optimizado',
            description: 'Construido desde cero para aparecer primero en los resultados de búsqueda.'
        },
        {
            id: 6,
            icon: '💬',
            title: 'Soporte 24/7',
            description: 'Asistencia continua para resolver cualquier duda o problema que tengas.'
        }
    ];
}
