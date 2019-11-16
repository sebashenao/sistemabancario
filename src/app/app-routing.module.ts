import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RolesComponent } from './roles/roles.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { TipoCuentasComponent } from './tipo-cuentas/tipo-cuentas.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'welcome',
        component: WelcomeComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'sucursales',
        component: SucursalesComponent
      },
      {
        path: 'tipo_cuenta',
        component: TipoCuentasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
