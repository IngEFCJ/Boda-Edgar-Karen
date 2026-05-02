import { Component } from '@angular/core';

type NoticeLink = {
  text: string;
  url: string;
};

type Notice = {
  title: string;
  description?: string;
  image?: string;
  links?: NoticeLink[];
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
      image: 'assets/invitaciones/karen-edgar/v1/images/logovestidotraje.png',
      links: [
        {
          text: 'Dress Code Mujeres',
          url: 'https://pin.it/5cw4ak6Ig'
        },
        {
          text: 'Dress Code Hombres',
          url: 'https://pin.it/39QQ9gSlU'
        }
      ]
    },
    {
      title: 'Evento libre de niños',
      image: 'assets/invitaciones/karen-edgar/v1/images/evento-sin-ninos.png',
      description: 'Aunque amamos a sus pequeños, queremos evitar accidentes, hemos optado por una celebración solo para adultos.'
    },
    {
      title: 'CONFIRMAR ASISTENCIA',
      description: 'Favor de confirmar tu asistencia a la brevedad posible. En caso de no poder acompañarnos, te pedimos avisar con un máximo de 15 días de anticipación. Si no recibimos confirmación, entenderemos que no te será posible asistir de manera presencial. Agradecemos también tu puntualidad, ya que este evento ha sido organizado con mucho cariño y esfuerzo.'
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
