import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService, ChatMessage } from '../../services/ai.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chatbot.component.html',
    styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
    isOpen = signal(false);
    isTyping = signal(false);
    messages = signal<ChatMessage[]>([]);
    currentMessage = '';

    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    constructor(private aiService: AiService) {
        this.setInitialGreeting();
    }

    private setInitialGreeting() {
        const hour = new Date().getHours();
        let greeting = '';
        if (hour >= 6 && hour < 12) {
            greeting = 'Buenos días';
        } else if (hour >= 12 && hour < 19) {
            greeting = 'Buenas tardes';
        } else {
            greeting = 'Buenas noches';
        }

        this.messages.set([{
            text: `${greeting}, Soy Gideon, una conciencia artificial interactiva. ¿En qué puedo ayudarle?`,
            sender: 'ai',
            timestamp: new Date()
        }]);
    }

    // We'll call this specifically when messages change
    private scrollToBottom(): void {
        setTimeout(() => {
            try {
                if (this.scrollContainer) {
                    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
                }
            } catch (err) { }
        }, 100);
    }

    toggleChat() {
        this.isOpen.set(!this.isOpen());
    }

    sendMessage() {
        if (!this.currentMessage.trim() || this.isTyping()) return;

        const userMsg: ChatMessage = {
            text: this.currentMessage,
            sender: 'user',
            timestamp: new Date()
        };

        this.messages.update((msgs: ChatMessage[]) => [...msgs, userMsg]);
        const messageToSend = this.currentMessage;
        this.currentMessage = '';
        this.isTyping.set(true);
        this.scrollToBottom();

        this.aiService.sendMessage(messageToSend)
            .pipe(finalize(() => this.isTyping.set(false)))
            .subscribe({
                next: (response) => {
                    const aiMsg: ChatMessage = {
                        text: response,
                        sender: 'ai',
                        timestamp: new Date()
                    };
                    this.messages.update((msgs: ChatMessage[]) => [...msgs, aiMsg]);
                    this.scrollToBottom();
                },
                error: (err) => {
                    console.error("Error from AI service", err);
                    this.messages.update((msgs: ChatMessage[]) => [...msgs, {
                        text: "Lo siento, tuve un problema al procesar tu solicitud. Inténtalo de nuevo.",
                        sender: 'ai',
                        timestamp: new Date()
                    }]);
                    this.scrollToBottom();
                }
            });
    }
}
