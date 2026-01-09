import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-cta',
    imports: [CommonModule],
    templateUrl: './contact-cta.component.html',
    styleUrl: './contact-cta.component.scss'
})
export class ContactCtaComponent {
    protected isSubmitting = signal(false);
    protected showSuccess = signal(false);

    async onSubmit(event: Event) {
        event.preventDefault();
        if (this.isSubmitting()) return;

        this.isSubmitting.set(true);
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/xzdzongn', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showSuccess.set(true);
                form.reset();
                setTimeout(() => this.showSuccess.set(false), 5000);
            } else {
                alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            alert('Error de conexión. Por favor, revisa tu internet e inténtalo de nuevo.');
        } finally {
            this.isSubmitting.set(false);
        }
    }
}
