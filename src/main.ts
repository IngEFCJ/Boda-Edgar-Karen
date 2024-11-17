import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { register } from 'swiper/element/bundle';  // Importar la función para registrar los Web Components

import { AppModule } from './app/app.module';

register();  // Registra los componentes globalmente
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
