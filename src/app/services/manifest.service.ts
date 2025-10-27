// src/app/services/manifest.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AssetService } from '../services/asset.service';

@Injectable({ providedIn: 'root' })
export class ManifestService {
  readonly manifest$: Observable<any>;

  constructor(http: HttpClient, assets: AssetService) {
    // 👇 OJO: apunta a config/manifest.json
    const url = assets.url('config/manifest.json');
    this.manifest$ = http.get(url).pipe(
      // Opcional: para que el 404 no “mate” el stream
      catchError(() => of(null)),
      shareReplay(1)
    );
  }
}
