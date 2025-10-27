import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';
import { AssetService } from '../services/asset.service';
@Directive({ selector: '[blobBg]', standalone: true })
export class BlobBgDirective implements OnChanges {
  @Input('blobBg') path?: string | null;
  private el = inject(ElementRef<HTMLElement>);
  private assets = inject(AssetService);
  ngOnChanges() {
    const url = this.path ? this.assets.url(this.path) : '';
    const n = this.el.nativeElement;
    n.style.backgroundImage = url ? `url("${url}")` : '';
    n.style.backgroundSize = 'cover';
    n.style.backgroundPosition = 'center';
  }
}
