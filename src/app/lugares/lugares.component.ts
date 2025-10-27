import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AssetService } from '../services/asset.service';
import { ManifestService } from '../services/manifest.service'; // <-- ojo a la ruta

type Lugar = {
  titulo: string;
  direccion: string;
  icono?: string;     // p. ej. "images/lugares/templo.png"
  mapsQuery?: string; // opcional: si no viene, armamos con titulo+direccion
};

type AppManifest = {
  lugares?: Lugar[];
};

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
})
export class LugaresComponent implements OnInit {
  lugares$!: Observable<Lugar[]>;

  constructor(
    private manifest: ManifestService,
    public assets: AssetService // público para usarlo en el template como en Home
  ) { }

  ngOnInit(): void {
    this.lugares$ = this.manifest.manifest$.pipe(
      map((m: AppManifest | null) => m?.lugares ?? [])
    );
  }

  iconSrc(l: Lugar): string {
    // igual que en Home: resolvemos una ruta relativa del manifest
    const rel = (l.icono && l.icono.trim().length) ? l.icono : 'images/lugares/default.png';
    return this.assets.url(rel);
  }

  imgFallback(e: Event): void {
    (e.target as HTMLImageElement).src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuMBg4yHq+QAAAAASUVORK5CYII=';
  }

  openGoogleMaps(l: Lugar): void {
    const q = encodeURIComponent(l.mapsQuery?.trim() || `${l.titulo} ${l.direccion}`.trim());
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener,noreferrer');
  }
}
