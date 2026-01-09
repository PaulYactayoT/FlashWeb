import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProcessComponent } from '../../components/process/process.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-como-trabajamos-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ProcessComponent,
    FooterComponent
  ],
  template: `
    <app-navbar />
    <main class="como-trabajamos-page">
      <div class="page-header">
        <div class="container">
          <h1 class="page-title">Nuestro <span class="gradient-text">Proceso</span></h1>
          <p class="page-subtitle">Transparencia y excelencia en cada etapa de tu proyecto</p>
        </div>
      </div>
      <app-process />
    </main>
    <app-footer />
  `,
  styles: [`
    .como-trabajamos-page {
      padding-top: 80px;
      min-height: 100vh;
      background: rgba(10, 10, 15, 0.3) !important;
    }
    .page-header {
      text-align: center;
      padding: clamp(40px, 8vw, 80px) 0;
      position: relative;
      background: transparent !important;
    }
    .page-title {
      font-size: clamp(2.2rem, 8vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 15px;
      color: #fff;
    }
    .page-subtitle {
      font-size: clamp(1rem, 3vw, 1.25rem);
      color: rgba(255, 255, 255, 0.7);
      max-width: 600px;
      margin: 0 auto;
      padding: 0 20px;
    }
    @media (max-width: 480px) {
      .page-header {
        padding: 30px 0;
      }
    }
  `]
})
export class ComoTrabajamosPage { }
