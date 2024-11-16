// header.component.ts
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  isMusicOn = true;  // Variable para controlar el estado de la música

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;


  ngOnInit() {
    if (this.isMusicOn) {
      this.audioPlayer.nativeElement.play();  // Inicia el audio cuando la página se carga
    }
  }

  // Método para alternar el menú hamburguesa
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleMusic() {
    this.isMusicOn = !this.isMusicOn;

    // Controlar el reproductor de audio
    if (this.isMusicOn) {
      this.audioPlayer.nativeElement.play();  // Reproducir música
    } else {
      this.audioPlayer.nativeElement.pause();  // Pausar música
    }
  }


}
