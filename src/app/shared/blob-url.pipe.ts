import { Pipe, PipeTransform, inject } from '@angular/core';
import { AssetService } from '../services/asset.service';
@Pipe({ name: 'blobUrl', standalone: true })
export class BlobUrlPipe implements PipeTransform {
  private assets = inject(AssetService);
  transform(path?: string | null) { return path ? this.assets.url(path) : ''; }
}
