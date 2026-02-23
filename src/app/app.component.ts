// app.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetService } from './services/asset.service';
import { InvitationService } from './services/invitation.service';
import { InvitationResponse } from './models/invitation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub?: Subscription;
  manifest: any | null = null;

  /** Token leído de ?token=... */
  token: string | null = null;
  /** Datos de la invitación (solo si hay token válido) */
  invitationData: InvitationResponse | null = null;
  /** True mientras carga la invitación */
  loadingInvitation = false;
  /** Error al cargar la invitación */
  invitationError: string | null = null;

  constructor(
    private assets: AssetService,
    private invitationSvc: InvitationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private readSlugFromUrl(): string {
    // 1) query ?i=slug
    const fromQuery = this.route.snapshot.queryParamMap.get('i');
    if (fromQuery) return fromQuery;

    // 2) ruta /i/<slug...> (cuando hay ruta con wildcard)
    const url = this.router.url;
    const match = url.match(/^\/i\/(.+)$/);
    if (match?.[1]) return decodeURIComponent(match[1]);

    // 3) fallback por defecto (útil para dev)
    return 'karen-edgar/v1';
  }

  ngOnInit(): void {
    // 1. Cargar manifest y BG (usando snapshot para el slug inicial)
    const slug = this.readSlugFromUrl();
    this.assets.setNamespace(slug);

    this.sub = this.assets.fetchManifest().subscribe({
      next: (m) => {
        this.manifest = m;
        const url = this.assets.url(m?.hero?.bg ?? '');
        document.documentElement.style.setProperty('--app-bg', `url("${url}")`);
      },
      error: (err) => console.error('Error manifest:', err)
    });

    // 2. Leer token usando URLSearchParams (más robusto en AppComponent)
    this.detectToken();

    // También re-detectar si el usuario cambia la URL sin recargar
    this.router.events.subscribe(() => {
      this.detectToken();
    });
  }

  private detectToken(): void {
    // Intentar leer de URL nativa (más fiable si ActivatedRoute falla)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl && tokenFromUrl !== this.token) {
      console.log('AppComponent: Nuevo token detectado en URL:', tokenFromUrl);
      this.token = tokenFromUrl;
      this.fetchInvitation(tokenFromUrl);
    } else {
      console.log('AppComponent: Token actual mantenido:', this.token, ' (URL search:', window.location.search, ')');
    }
  }

  private fetchInvitation(token: string): void {
    console.log('Llamando al backend por token:', token);
    this.loadingInvitation = true;
    this.invitationError = null;

    this.invitationSvc.getByToken(token).subscribe({
      next: (data) => {
        this.invitationData = data;
        this.loadingInvitation = false;
        console.log('Respuesta backend OK:', data);
      },
      error: (err) => {
        console.error('Error backend:', err);
        this.invitationError = 'Error al conectar con el servidor. Revisa si el backend está corriendo y permite CORS.';
        this.loadingInvitation = false;
      }
    });
  }

  /** Actualiza los datos de invitación después de confirmar */
  onInvitationUpdated(): void {
    if (!this.token) return;
    this.invitationSvc.getByToken(this.token).subscribe({
      next: (data) => { this.invitationData = data; },
      error: () => { /* silenciar, ya tenemos los datos previos */ }
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
