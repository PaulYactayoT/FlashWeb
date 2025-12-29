import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightningIntroComponent } from '../../components/lightning-intro/lightning-intro.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { TemplateShowcaseComponent } from '../../components/template-showcase/template-showcase.component';
import { ContactCtaComponent } from '../../components/contact-cta/contact-cta.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        LightningIntroComponent,
        NavbarComponent,
        HeroComponent,
        TemplateShowcaseComponent,
        ContactCtaComponent,
        FooterComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
}
