import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-caracteristicas',
  imports: [
    CommonModule,
    NavbarComponent,
    FeaturesComponent,
    FooterComponent
  ],
  templateUrl: './caracteristicas.html',
  styleUrl: './caracteristicas.scss',
})
export class Caracteristicas {

}
