// lugares.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent {

  // Función para abrir Google Maps en la aplicación del teléfono
  openGoogleMaps(address: string): void {
    const googleMapsUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_system'); // Abre la dirección en Google Maps
  }
}
