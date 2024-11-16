import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaAsistenciaComponent } from './confirma-asistencia.component';

describe('ConfirmaAsistenciaComponent', () => {
  let component: ConfirmaAsistenciaComponent;
  let fixture: ComponentFixture<ConfirmaAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmaAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmaAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
