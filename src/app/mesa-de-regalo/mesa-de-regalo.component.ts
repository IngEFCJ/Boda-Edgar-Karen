import { Component } from '@angular/core';

@Component({
  selector: 'app-mesa-de-regalo',
  templateUrl: './mesa-de-regalo.component.html',
  styleUrls: ['./mesa-de-regalo.component.css']
})
export class MesaDeRegaloComponent {

  // Redirige al usuario a la mesa de regalos en Amazon
  irAMesaDeRegalos() {
    window.location.href = 'https://www.amazon.com/wedding/registry/N53CKEG5YIU9'; // Cambia esta URL a la de tu mesa de regalos
  }

}
