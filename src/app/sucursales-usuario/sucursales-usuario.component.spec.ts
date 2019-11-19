import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesUsuarioComponent } from './sucursales-usuario.component';

describe('SucursalesUsuarioComponent', () => {
  let component: SucursalesUsuarioComponent;
  let fixture: ComponentFixture<SucursalesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalesUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
