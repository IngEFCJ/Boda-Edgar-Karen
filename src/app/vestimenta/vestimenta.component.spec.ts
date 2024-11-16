import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestimentaComponent } from './vestimenta.component';

describe('VestimentaComponent', () => {
  let component: VestimentaComponent;
  let fixture: ComponentFixture<VestimentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VestimentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VestimentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
