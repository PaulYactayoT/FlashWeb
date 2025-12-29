import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LightningEffectComponent } from './components/lightning-effect/lightning-effect.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LightningEffectComponent, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected readonly title = signal('Creador de Páginas Web');
}
