import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  weddingDate = new Date('2026-10-25T14:00:00');  // Cambia esta fecha por la fecha de tu boda

  days  = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  prevSeconds = 0;
  prevMinutes = 0;
  prevHours = 0;
  prevDays = 0;


  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    setInterval(() => {
      const now = new Date();
      const timeDiff = this.weddingDate.getTime() - now.getTime();

      this.days = Math.floor(timeDiff / (1000 * 3600 * 24));
      this.hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
      this.minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
      this.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      this.applyAnimation();
    }, 1000); // Actualiza el contador cada segundo
  }

  applyAnimation() {
    // Si los segundos cambian, aplicar la animación solo a los segundos
    if (this.seconds !== this.prevSeconds) {
      this.prevSeconds = this.seconds;
      this.addChangeClass('seconds');
    }

    // Si los minutos cambian, aplicar la animación solo a los minutos
    if (this.minutes !== this.prevMinutes) {
      this.prevMinutes = this.minutes;
      this.addChangeClass('minutes');
    }

    // Si las horas cambian, aplicar la animación solo a las horas
    if (this.hours !== this.prevHours) {
      this.prevHours = this.hours;
      this.addChangeClass('hours');
    }

    // Si los días cambian, aplicar la animación solo a los días
    if (this.days !== this.prevDays) {
      this.prevDays = this.days;
      this.addChangeClass('days');
    }
  }

  addChangeClass(unit: string) {
    // Eliminar la clase "change" de todas las unidades
    const allItems = document.querySelectorAll('.countdown-item');
    allItems.forEach(item => {
      item.classList.remove('change');
    });

    // Añadir la clase "change" a la unidad que ha cambiado
    const unitElement = document.querySelector(`#${unit}`);
    if (unitElement) {
      unitElement.classList.add('change');
    }
  }
}
