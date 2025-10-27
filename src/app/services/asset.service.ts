import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private http = inject(HttpClient);
  private root = environment.assetBaseUrl.replace(/\/+$/, '');
  private sas = environment.assetSas ?? '';
  private ns = 'karen-edgar/v1'; // se cambia al iniciar

  setNamespace(ns: string) { this.ns = ns.replace(/^\/+|\/+$/g, ''); }
  url(path: string) {
    const clean = path.replace(/^\/+/, '');
    const base = `${this.root}/${this.ns}/${clean}`;
    return `${base}${this.sas ? (base.includes('?') ? '&' : '?') + this.sas.replace(/^\?/, '') : ''}`;
  }
  fetchManifest(file = 'config/manifest.json') {
    return this.http.get<any>(this.url(file));
  }
}
