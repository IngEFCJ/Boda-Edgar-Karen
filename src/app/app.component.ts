import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvitationResponse } from './models/invitation.model';
import { AssetService } from './services/asset.service';
import { InvitationService } from './services/invitation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private manifestSub?: Subscription;
  private invitationSub?: Subscription;
  private routerSub?: Subscription;
  private retryTimer?: ReturnType<typeof setTimeout>;
  private readonly retryDelayMs = 6000;

  manifest: any | null = null;
  token: string | null = null;
  invitationData: InvitationResponse | null = null;
  loadingInvitation = false;
  invitationError: string | null = null;

  constructor(
    private assets: AssetService,
    private invitationSvc: InvitationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private readSlugFromUrl(): string {
    const fromQuery = this.route.snapshot.queryParamMap.get('i');
    if (fromQuery) return fromQuery;

    const url = this.router.url;
    const match = url.match(/^\/i\/(.+)$/);
    if (match?.[1]) return decodeURIComponent(match[1]);

    return 'karen-edgar/v1';
  }

  ngOnInit(): void {
    const slug = this.readSlugFromUrl();
    this.assets.setNamespace(slug);

    this.manifestSub = this.assets.fetchManifest().subscribe({
      next: (m) => {
        this.manifest = m;
        const url = this.assets.url(m?.hero?.bg ?? '');
        document.documentElement.style.setProperty('--app-bg', `url("${url}")`);
      },
      error: (err) => console.error('Error manifest:', err)
    });

    this.detectToken();

    this.routerSub = this.router.events.subscribe(() => {
      this.detectToken();
    });
  }

  private detectToken(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl && tokenFromUrl !== this.token) {
      this.token = tokenFromUrl;
      this.invitationData = null;
      this.fetchInvitation(tokenFromUrl);
    }
  }

  private fetchInvitation(token: string): void {
    this.clearRetryTimer();
    this.invitationSub?.unsubscribe();
    this.loadingInvitation = true;
    this.invitationError = null;

    this.invitationSub = this.invitationSvc.getByToken(token).subscribe({
      next: (data) => {
        this.invitationData = data;
        this.loadingInvitation = false;
        this.invitationError = null;
      },
      error: (err) => {
        console.error('Error backend, reintentando consulta de invitación:', err);
        this.invitationError = null;
        this.loadingInvitation = true;
        this.retryTimer = setTimeout(() => {
          if (this.token === token && !this.invitationData) {
            this.fetchInvitation(token);
          }
        }, this.retryDelayMs);
      }
    });
  }

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

  private clearRetryTimer(): void {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = undefined;
    }
  }

  ngOnDestroy(): void {
    this.clearRetryTimer();
    this.manifestSub?.unsubscribe();
    this.invitationSub?.unsubscribe();
    this.routerSub?.unsubscribe();
    document.documentElement.style.setProperty('--app-bg', 'none');
  }
}
