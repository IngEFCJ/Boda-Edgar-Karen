import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AssetService } from '../services/asset.service';

type ImgLike = string | { src?: string } | null | undefined;

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnChanges {
  constructor(private assets: AssetService) { }

  /** Puede venir null/undefined si aún no cargó el manifest */
  @Input() imagenes: ImgLike[] | null | undefined = [];

  resolved: string[] = [];

  ngOnChanges(_: SimpleChanges): void {
    const arr = Array.isArray(this.imagenes) ? this.imagenes : [];
    this.resolved = arr
      .map(i => typeof i === 'string' ? i : (i?.src ?? ''))
      .filter(Boolean)
      .map(rel => this.assets.url(rel));
  }

  onImgError(e: Event) {
    (e.target as HTMLImageElement).src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMBg4yHq+QAAAAASUVORK5CYII=';
  }
}
