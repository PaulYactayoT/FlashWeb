import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ServicesComponent } from '../../components/services/services.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-servicios',
  imports: [
    CommonModule,
    NavbarComponent,
    ServicesComponent,
    FooterComponent
  ],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss',
})
export class Servicios {

}
