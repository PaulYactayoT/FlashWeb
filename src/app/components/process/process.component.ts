import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-process',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss']
})
export class ProcessComponent {
    steps = [
        {
            id: '01',
            title: 'Descubrimiento',
            description: 'Analizamos tus necesidades, objetivos y audiencia para trazar la mejor estrategia tecnológica.',
            icon: '🔍'
        },
        {
            id: '02',
            title: 'Diseño & Estrategia',
            description: 'Creamos prototipos visuales y definimos la arquitectura que hará brillar tu proyecto.',
            icon: '🎨'
        },
        {
            id: '03',
            title: 'Desarrollo Ágil',
            description: 'Construimos tu solución con las últimas tecnologías, asegurando velocidad y escalabilidad.',
            icon: '⚡'
        },
        {
            id: '04',
            title: 'Lanzamiento & Soporte',
            description: 'Desplegamos tu web y te acompañamos en su crecimiento continuo con soporte dedicado.',
            icon: '🚀'
        }
    ];
}
