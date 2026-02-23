// Importar las dependencias necesarias de Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { HeaderComponent } from './header/header.component';  // Importar HeaderComponent
import { HttpClientModule } from '@angular/common/http';
import { BlobUrlPipe } from './shared/blob-url.pipe';
import { BlobBgDirective } from './shared/blob-bg.directive';
// Importar el módulo de rutas
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { register } from 'swiper/element/bundle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    GaleriaComponent,
    LugaresComponent,
    ItinerarioComponent,
    VestimentaComponent,
    MesaDeRegaloComponent,
    AvisosComponent,
    ConfirmaAsistenciaComponent,
    BienvenidaComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    BlobUrlPipe,
    BlobBgDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Agrega CUSTOM_ELEMENTS_SCHEMA aquí
  providers: [],
  bootstrap: [AppComponent]  // Asegúrate de que AppComponent esté aquí
})
export class AppModule {
  constructor() {
    register();
  }
}
