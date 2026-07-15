import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { retry, Subscription, timer } from 'rxjs';
import { InvitationResponse } from './models/invitation.model';
import { AssetService } from './services/asset.service';
import { InvitationService } from './services/invitation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  private manifestSub?: Subscription;
  private invitationSub?: Subscription;
  private routerSub?: Subscription;
  private revealObserver?: IntersectionObserver;
  private revealMutationObserver?: MutationObserver;
  private observedRevealElements = new WeakSet<Element>();
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

  ngAfterViewInit(): void {
    this.setupRevealAnimation();
  }

  private setupRevealAnimation(): void {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
      return;
    }

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        this.revealObserver?.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    });

    this.observeRevealElements();

    const content = document.querySelector('.content');
    if (!content) return;

    this.revealMutationObserver = new MutationObserver(() => this.observeRevealElements());
    this.revealMutationObserver.observe(content, { childList: true, subtree: true });
  }

  private observeRevealElements(): void {
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        if (this.observedRevealElements.has(el) || el.classList.contains('is-visible')) return;

        el.classList.add('reveal-ready');
        this.observedRevealElements.add(el);
        this.revealObserver?.observe(el);
      });
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
    this.invitationSub?.unsubscribe();
    this.loadingInvitation = true;
    this.invitationError = null;

    this.invitationSub = this.invitationSvc.getByToken(token).pipe(
      retry({
        delay: (err) => {
          console.error('Error backend, reintentando consulta de invitación:', err);
          return timer(this.retryDelayMs);
        }
      })
    ).subscribe({
      next: (data) => {
        if (this.token !== token) return;
        this.invitationData = data;
        this.loadingInvitation = false;
        this.invitationError = null;
      },
      error: (err) => {
        console.error('Error backend:', err);
        this.invitationError = null;
        this.loadingInvitation = true;
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

  ngOnDestroy(): void {
    this.manifestSub?.unsubscribe();
    this.invitationSub?.unsubscribe();
    this.routerSub?.unsubscribe();
    this.revealObserver?.disconnect();
    this.revealMutationObserver?.disconnect();
    document.documentElement.style.setProperty('--app-bg', 'none');
  }
}
