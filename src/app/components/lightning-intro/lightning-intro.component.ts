import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lightning-intro',
  imports: [CommonModule],
  templateUrl: './lightning-intro.component.html',
  styleUrl: './lightning-intro.component.scss',
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('600ms ease-out'))
    ])
  ]
})
export class LightningIntroComponent implements OnInit {
  protected showIntro = signal(true);
  protected animationState = signal('visible');

  ngOnInit() {
    // Check if animation has been shown in this session
    const hasSeenIntro = sessionStorage.getItem('flashweb_intro_seen');

    if (hasSeenIntro) {
      // Skip intro completely if already seen
      this.showIntro.set(false);
      return;
    }

    // Show intro for 2 seconds, then fade out
    setTimeout(() => {
      this.animationState.set('hidden');
    }, 2000);

    // Remove from DOM after fade out completes
    setTimeout(() => {
      this.showIntro.set(false);
      sessionStorage.setItem('flashweb_intro_seen', 'true');
    }, 2600); // 2000ms display + 600ms fade out
  }
}
