import { Component } from '@angular/core';
import { AssetService } from '../services/asset.service';

type MosaicPhoto = {
  label: string;
  src: string;
  layout: 'wide' | 'half' | 'vertical';
  missing?: boolean;
};

@Component({
  selector: 'app-galeria-mosaico',
  templateUrl: './galeria-mosaico.component.html',
  styleUrls: ['./galeria-mosaico.component.css']
})
export class GaleriaMosaicoComponent {
  photos: MosaicPhoto[] = [
    { label: '', src: 'images/galeria/Foto6.jpg', layout: 'wide' },
    { label: '', src: 'images/galeria/Foto7.jpg', layout: 'half' },
    { label: '', src: 'images/galeria/Foto8.jpg', layout: 'half' },
    { label: '', src: 'images/galeria/Foto9.jpg', layout: 'vertical' },
    { label: '', src: 'images/galeria/Foto10.jpg', layout: 'vertical' },
    { label: '', src: 'images/galeria/Foto11.jpg', layout: 'wide' },
    { label: '', src: 'images/galeria/Foto12.jpg', layout: 'half' },
    { label: '', src: 'images/galeria/Foto13.jpg', layout: 'half' }
  ];

  constructor(private assets: AssetService) { }

  photoUrl(photo: MosaicPhoto): string {
    return this.assets.url(photo.src);
  }

  markMissing(photo: MosaicPhoto): void {
    photo.missing = true;
  }
}
