import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaUsuarioComponent } from './cuenta-usuario.component';

describe('CuentaUsuarioComponent', () => {
  let component: CuentaUsuarioComponent;
  let fixture: ComponentFixture<CuentaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
