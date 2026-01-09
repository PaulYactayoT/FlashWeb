import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoLightningComponent } from '../logo-lightning/logo-lightning.component';
import { ModalService } from '../../services/modal.service';
import { inject } from '@angular/core';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterLink, RouterLinkActive, LogoLightningComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    private modalService = inject(ModalService);
    protected isScrolled = signal(false);
    protected isMenuOpen = signal(false);

    @HostListener('window:scroll')
    onScroll() {
        this.isScrolled.set(window.scrollY > 50);
    }

    toggleMenu() {
        this.isMenuOpen.update(value => !value);
    }

    closeMenu() {
        this.isMenuOpen.set(false);
        this.modalService.closeModal();
    }
}
