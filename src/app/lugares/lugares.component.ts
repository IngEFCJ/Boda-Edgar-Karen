// lugares.component.ts
import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements AfterViewInit, OnDestroy {
  private intersectionObserver?: IntersectionObserver;

  // Abre Google Maps de forma confiable en móviles (app nativa si es posible) con fallback a web
  openGoogleMaps(address: string): void {
    const query = encodeURIComponent(address);
    const googleMapsWebUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    try {
      const userAgent = navigator.userAgent || '';
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);

      if (isIOS) {
        // Intenta abrir la app de Google Maps en iOS. Si no está instalada, cae a la web.
        window.location.href = `comgooglemaps://?q=${query}`;
        setTimeout(() => {
          window.location.href = googleMapsWebUrl;
        }, 700);
        return;
      }

      if (isAndroid) {
        // Intenta abrir con esquema geo: (Android). Si falla, cae a la web.
        window.location.href = `geo:0,0?q=${query}`;
        setTimeout(() => {
          window.location.href = googleMapsWebUrl;
        }, 700);
        return;
      }

      // Escritorio u otros: abre en una nueva pestaña de forma segura
      window.open(googleMapsWebUrl, '_blank', 'noopener');
    } catch {
      // Fallback final
      window.location.href = googleMapsWebUrl;
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const rootElement = this.elementRef.nativeElement as HTMLElement;
    const elements = rootElement.querySelectorAll('.text-from-right, .text-from-left, .text-from-bottom');

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('animate');
          this.intersectionObserver?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    elements.forEach((el) => this.intersectionObserver!.observe(el));
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }
}
