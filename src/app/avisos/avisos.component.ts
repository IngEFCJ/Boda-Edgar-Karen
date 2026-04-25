import { Component } from '@angular/core';

type Notice = {
  title: string;
  description: string;
  image?: string;
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
      title: 'Vestimenta',
      description: 'Azul marino o azul noche, verde esmeralda o botella, borgoña, vino o vinotinto.',
      image: 'assets/invitaciones/karen-edgar/v1/images/logovestidotraje.png'
    },
    {
      title: 'Evento libre de niños',
      description: 'Aunque amamos a sus pequeños, queremos evitar accidentes, hemos optado por una celebración solo para adultos.'
    },
    {
      title: 'Otro aviso',
      description: 'Texto del aviso.'
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
      {
        ...this.notices[previousIndex],
        index: previousIndex,
        position: 'previous'
      },
      {
        ...this.notices[this.selectedNoticeIndex],
        index: this.selectedNoticeIndex,
        position: 'active'
      },
      {
        ...this.notices[nextIndex],
        index: nextIndex,
        position: 'next'
      }
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
