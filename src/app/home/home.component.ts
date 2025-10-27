import { Component, Input } from '@angular/core';
import { AssetService } from '../services/asset.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private assets: AssetService) { }

  /**
   * Opcional: si algún día el manifest trae una foto específica, se la pasas desde App:
   * <app-home [photo]="manifest?.hero?.photo"></app-home>
   * Si no la pasas, usamos "images/home/hero.jpg" por convención.
   */
  @Input() photo?: string;

  get heroSrc(): string {
    const rel = this.photo && this.photo.trim().length ? this.photo : 'images/home/EdgarIncado.jpeg';
    return this.assets.url(rel); // resuelve /assets/invitaciones/<slug>/<v>/...
  }

  imgFallback(e: Event): void {
    (e.target as HTMLImageElement).src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMBg4yHq+QAAAAASUVORK5CYII=';
  }
}
