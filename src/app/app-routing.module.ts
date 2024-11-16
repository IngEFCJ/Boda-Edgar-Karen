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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'lugares', component: LugaresComponent },
  { path: 'itinerario', component: ItinerarioComponent },
  { path: 'vestimenta', component: VestimentaComponent },
  { path: 'mesa-de-regalo', component: MesaDeRegaloComponent },
  { path: 'avisos', component: AvisosComponent },
  { path: 'confirma-asistencia', component: ConfirmaAsistenciaComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'header', component: HeaderComponent },  // Si necesitas una ruta para HeaderComponent, la puedes agregar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
