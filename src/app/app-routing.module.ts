// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes que usarás en las rutas
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ItinerarioComponent } from './itinerario/itinerario.component';
import { VestimentaComponent } from './vestimenta/vestimenta.component';
import { MesaDeRegaloComponent } from './mesa-de-regalo/mesa-de-regalo.component';
import { AvisosComponent } from './avisos/avisos.component';
import { ConfirmaAsistenciaComponent } from './confirma-asistencia/confirma-asistencia.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // Si usas i/:ns para el slug de assets, lo dejamos para que el Router no tire error 404
  { path: 'i/:ns', component: HomeComponent },
  { path: 'i/**', component: HomeComponent },
  // Por defecto a nada, ya que AppComponent tiene todas las secciones hardcoded
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
