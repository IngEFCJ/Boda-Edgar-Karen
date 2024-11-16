import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaDeRegaloComponent } from './mesa-de-regalo.component';

describe('MesaDeRegaloComponent', () => {
  let component: MesaDeRegaloComponent;
  let fixture: ComponentFixture<MesaDeRegaloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesaDeRegaloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesaDeRegaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
