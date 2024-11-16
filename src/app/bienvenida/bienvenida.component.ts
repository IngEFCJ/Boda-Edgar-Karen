// bienvenida.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {
  isOpened = false;
  isDragging = false;

  @Output() opened = new EventEmitter<boolean>();  // Emite el evento booleano

  startDrag(event: MouseEvent) {
    this.isDragging = true;

    const initialMousePos = { x: event.clientX, y: event.clientY };

    const moveSticker = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - initialMousePos.x;
      const deltaY = moveEvent.clientY - initialMousePos.y;

      if (Math.abs(deltaX) > 100 || Math.abs(deltaY) > 100) {
        this.isOpened = true;
        this.opened.emit(this.isOpened);  // Emitir el valor cuando se abre el sobre
        document.removeEventListener('mousemove', moveSticker);
        document.removeEventListener('mouseup', stopDrag);
      }
    };

    const stopDrag = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', moveSticker);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', moveSticker);
    document.addEventListener('mouseup', stopDrag);
  }
}
