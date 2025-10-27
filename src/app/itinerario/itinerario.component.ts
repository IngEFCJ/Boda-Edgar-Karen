import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ManifestService } from '../services/manifest.service';
import { AssetService } from '../services/asset.service';

type Evento = {
  label: string;
  icono: string;   // ruta relativa del manifest (e.g. images/itinerario/recepcion.png)
  hora?: string;   // opcional
};

@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.css']
})
export class ItinerarioComponent implements OnInit {
  eventos$!: Observable<Evento[]>;

  constructor(
    private manifest: ManifestService,
    public assets: AssetService
  ) { }

  ngOnInit(): void {
    this.eventos$ = this.manifest.manifest$.pipe(
      map((m: any) => m?.itinerario ?? [])
    );
  }

  onImgError(e: Event): void {
    const img = e.target as HTMLImageElement;
    img.style.opacity = '0.5';
    img.alt = 'Ícono no disponible';
  }
}
