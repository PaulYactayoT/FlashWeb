import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ChatMessage {
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

@Injectable({
    providedIn: 'root'
})
export class AiService {

    constructor() { }

    sendMessage(message: string): Observable<string> {
        // Simulate network delay and AI processing
        const response = this.generateResponse(message);
        return of(response).pipe(delay(1000 + Math.random() * 1000));
    }

    private generateResponse(input: string): string {
        const lowerInput = input.toLowerCase().trim();

        // 1. Identify Intentions
        const wantsPrices = lowerInput.includes('precio') || lowerInput.includes('costo') || lowerInput.includes('plan') || lowerInput.includes('cuánto') || lowerInput.includes('cuanto') || lowerInput.includes('cotiza') || lowerInput.includes('cotización') || lowerInput.includes('cotizacion');
        const wantsContact = lowerInput.includes('contacto') || lowerInput.includes('whatsapp') || lowerInput.includes('teléfono') || lowerInput.includes('telefono') || lowerInput.includes('email') || lowerInput.includes('escribir');
        const wantsServices = lowerInput.includes('servicio') || lowerInput.includes('qué hacen') || lowerInput.includes('que hacen') || lowerInput.includes('ofrecen');
        const wantsTemplates = lowerInput.includes('plantilla') || lowerInput.includes('ver');
        const wantsPersonalized = lowerInput.includes('personalizada') || lowerInput.includes('específica') || lowerInput.includes('especifica');
        const wantsSystem = lowerInput.includes('sistema') || lowerInput.includes('completo') || lowerInput.includes('e-commerce') || lowerInput.includes('tienda');
        const greetings = lowerInput.includes('hola') || lowerInput.includes('buenos') || lowerInput.includes('qué tal') || lowerInput.includes('que tal');

        // 2. Official Pricing & Services Info
        const priceTemplate = "S/ 200 (Plantilla)";
        const pricePersonalized = "S/ 250 (Página personalizada)";
        const priceSystem = "S/ 850 (Sistema web completo)";
        const allPrices = `Nuestros precios oficiales son: Plantillas ${priceTemplate}, Páginas personalizadas ${pricePersonalized} y Sistemas completos ${priceSystem}.`;

        const contactInfo = "Puedes contactarnos vía WhatsApp al +51 946 067 050 o al correo flashwebuniverse@gmail.com para una atención inmediata.";
        const servicesInfo = "Ofrecemos Plantillas Web, Páginas Web Personalizadas y Sistemas Web Completos.";

        // 3. Logic following Rules
        if (greetings && lowerInput.length < 10) {
            return "¡Hola! Soy Gideon. ¿En qué puedo ayudarte hoy? ¿Buscas una plantilla, una web personalizada o un sistema completo?";
        }

        // Specific Service Pricing Requests
        if (wantsSystem && (wantsPrices || lowerInput.includes('cuanto'))) {
            return `Un sistema web completo tiene un costo de ${priceSystem}. ¿Deseas que te contactemos por WhatsApp para ver los detalles?`;
        }
        if (wantsPersonalized && (wantsPrices || lowerInput.includes('cuanto'))) {
            return `Una página personalizada tiene un costo de ${pricePersonalized}. ¿Quieres ver ejemplos de nuestros trabajos?`;
        }
        if (wantsTemplates && (wantsPrices || lowerInput.includes('cuanto'))) {
            return `Nuestras plantillas web están a ${priceTemplate}. ¿Te gustaría ver las opciones disponibles?`;
        }

        // Rule: Price + Contact
        if (wantsPrices && wantsContact) {
            return `${allPrices} ${contactInfo} ¿Deseas que agendemos una llamada?`;
        }

        if (wantsPrices) {
            return `${allPrices} ¿Puedo ayudarte a elegir la mejor opción para tu negocio?`;
        }

        if (wantsContact) {
            return `${contactInfo} ¿Quieres que un asesor te ayude hoy mismo?`;
        }

        if (wantsServices) {
            return `${servicesInfo} ${allPrices} ¿Cuál de estos servicios necesitas?`;
        }

        return "Ofrecemos soluciones web profesionales con precios transparentes. ¿Te gustaría cotizar un sistema completo o prefieres una web personalizada?";
    }
}
