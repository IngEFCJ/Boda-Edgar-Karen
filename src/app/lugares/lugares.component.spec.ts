import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LugaresComponent } from './lugares.component';

const manifestMock = {
  manifest$: of({
    lugares: [
      { titulo: 'Iglesia', direccion: 'Calle 123', icono: 'images/templo.png' },
    ],
  }),
};

describe('LugaresComponent', () => {
  let component: LugaresComponent;
  let fixture: ComponentFixture<LugaresComponent>;
  const openSpy = jasmine.createSpy('open');

  beforeAll(() => {
    // Espiamos window.open para no abrir pestañas en el test
    (window as any).open = openSpy;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LugaresComponent],
      providers: [{ provide: (class { } as any), useValue: {} }],
    })
      .overrideProvider((class { } as any), { useValue: manifestMock })
      .compileComponents();

    fixture = TestBed.createComponent(LugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openGoogleMaps should open a maps url', () => {
    component.openGoogleMaps({
      titulo: 'Iglesia',
      direccion: 'Calle 123',
      icono: 'images/templo.png',
    });
    expect(openSpy).toHaveBeenCalled();
    const url = openSpy.calls.mostRecent().args[0] as string;
    expect(url).toContain('https://www.google.com/maps/search/?api=1&query=');
  });
});
