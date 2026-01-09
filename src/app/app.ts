import { Component, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class App implements AfterViewInit {
  @ViewChild('bgVideo') videoElement!: ElementRef<HTMLVideoElement>;
  protected readonly title = signal('Creador de Páginas Web');

  ngAfterViewInit() {
    this.attemptPlay();

    // Fallback: Try playing on first user interaction if it hasn't started
    const handleInteraction = () => {
      if (this.videoElement && this.videoElement.nativeElement.paused) {
        this.attemptPlay();
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
  }

  private attemptPlay() {
    if (!this.videoElement) return;

    const video = this.videoElement.nativeElement;
    video.muted = true;
    video.playsInline = true;

    // Small delay to ensure browser is ready
    setTimeout(() => {
      video.play().catch(error => {
        console.log('Autoplay blocked or delayed:', error);
      });
    }, 150);
  }
}
