import { Component, OnInit } from '@angular/core';
import { ManifestService } from '../services/manifest.service';
import { AssetService } from '../services/asset.service';
import { map, Observable } from 'rxjs';

type MesaDeRegalos = {
  titulo: string;
  descripcion: string;
  imagen: string;
  link: string;
};

@Component({
  selector: 'app-mesa-de-regalo',
  templateUrl: './mesa-de-regalo.component.html',
  styleUrls: ['./mesa-de-regalo.component.css']
})
export class MesaDeRegaloComponent implements OnInit {
  mesa$!: Observable<MesaDeRegalos | null>;

  constructor(
    private manifest: ManifestService,
    public assets: AssetService
  ) { }

  ngOnInit(): void {
    this.mesa$ = this.manifest.manifest$.pipe(
      map((m: any) => m?.mesaDeRegalos ?? null)
    );
  }

  irAMesaDeRegalos(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  onImgError(e: Event): void {
    const img = e.target as HTMLImageElement;
    img.style.opacity = '0.5';
    img.alt = 'Imagen no disponible';
  }
}
