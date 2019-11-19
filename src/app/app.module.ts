import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { BancoService } from './banco.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RolesComponent } from './roles/roles.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { TipoCuentasComponent } from './tipo-cuentas/tipo-cuentas.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { CuentaUsuarioComponent } from './cuenta-usuario/cuenta-usuario.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { SucursalesUsuarioComponent } from './sucursales-usuario/sucursales-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    UsuariosComponent,
    HomeComponent,
    LoaderComponent,
    WelcomeComponent,
    RolesComponent,
    SucursalesComponent,
    TipoCuentasComponent,
    CuentasComponent,
    TransaccionesComponent,
    CuentaUsuarioComponent,
    SucursalesUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule.forRoot(),
  ],
  providers: [BancoService, CuentaUsuarioComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
