import { Component } from '@angular/core';

type Notice = {
  title: string;
  description: string;
};

type VisibleNotice = Notice & {
  index: number;
  position: 'previous' | 'active' | 'next';
};

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent {
  selectedNoticeIndex = 0;

  notices: Notice[] = [
    {
      title: 'Evento libre de ninos',
      description: 'Aunque amamos a sus pequenos, queremos evitar accidentes, hemos optado por una celebracion solo para adultos para nuestro gran dia.'
    },
    {
      title: 'Vestimenta',
      description: 'Azul marino o azul noche, verde esmeralda o botella, borgona, vino o vinotinto.'
    },
    {
      title: 'Hora de llegada',
      description: 'Por favor, puntuales a las 5:00 PM.'
    }
  ];

  get visibleNotices(): VisibleNotice[] {
    if (this.notices.length <= 1) {
      return this.notices.map((notice, index) => ({
        ...notice,
        index,
        position: 'active'
      }));
    }

    const previousIndex = this.getCircularIndex(this.selectedNoticeIndex - 1);
    const nextIndex = this.getCircularIndex(this.selectedNoticeIndex + 1);

    return [
      { ...this.notices[previousIndex], index: previousIndex, position: 'previous' },
      { ...this.notices[this.selectedNoticeIndex], index: this.selectedNoticeIndex, position: 'active' },
      { ...this.notices[nextIndex], index: nextIndex, position: 'next' }
    ];
  }

  previousNotice(): void {
    this.selectedNoticeIndex = this.getCircularIndex(this.selectedNoticeIndex - 1);
  }

  nextNotice(): void {
    this.selectedNoticeIndex = this.getCircularIndex(this.selectedNoticeIndex + 1);
  }

  selectNotice(index: number): void {
    this.selectedNoticeIndex = index;
  }

  private getCircularIndex(index: number): number {
    return (index + this.notices.length) % this.notices.length;
  }
}
