// app.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetService } from './services/asset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // si no tienes CSS, puedes quitar esta línea
})
export class AppComponent implements OnInit, OnDestroy {  // <--- aquí el nombre correcto
  private sub?: Subscription;
  manifest: any | null = null;


  constructor(private assets: AssetService, private route: ActivatedRoute,
    private router: Router) { }

  private readSlugFromUrl(): string {
    // 1) query ?i=slug
    const fromQuery = this.route.snapshot.queryParamMap.get('i');
    if (fromQuery) return fromQuery;

    // 2) ruta /i/<slug...> (cuando hay ruta con wildcard)
    const url = this.router.url; // ej: /i/karen-edgar/v1
    const match = url.match(/^\/i\/(.+)$/);
    if (match?.[1]) return decodeURIComponent(match[1]);

    // 3) fallback por defecto (útil para dev)
    return 'karen-edgar/v1';
  }


  ngOnInit(): void {
    const slug = this.readSlugFromUrl();
    this.assets.setNamespace(slug);

    this.sub = this.assets.fetchManifest().subscribe((m) => {
      this.manifest = m;
      console.log('Manifest cargado:', m);
      const url = this.assets.url(m?.hero?.bg ?? '');
      console.log('BG URL =>', url);        // <- log 2 (ver URL final)
      document.documentElement.style.setProperty('--app-bg', `url("${url}")`);
    });
  }

  public url(p?: string | null): string {
    return p ? this.assets.url(p) : '';
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    document.documentElement.style.setProperty('--app-bg', 'none');
  }
}
