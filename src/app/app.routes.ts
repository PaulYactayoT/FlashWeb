import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Servicios } from './pages/servicios/servicios';
import { Caracteristicas } from './pages/caracteristicas/caracteristicas';
import { TemplateSelectorComponent } from './templates/template-selector/template-selector.component';
import { TemplateBuilderComponent } from './templates/template-builder/template-builder.component';
import { ComoTrabajamosPage } from './pages/como-trabajamos/como-trabajamos';
import { QuienesSomosPage } from './pages/quienes-somos/quienes-somos';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servicios', component: Servicios },
  { path: 'caracteristicas', component: Caracteristicas },
  { path: 'como-trabajamos', component: ComoTrabajamosPage },
  { path: 'quienes-somos', component: QuienesSomosPage },
  { path: 'templates', component: TemplateSelectorComponent },
  { path: 'builder/:id', component: TemplateBuilderComponent },
  { path: '**', redirectTo: '' }
];
