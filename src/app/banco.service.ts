import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioInterface } from './model/usuario';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import * as $ from "jquery"
import { RolInterface } from './model/rol';
import { SucursalInterface } from './model/sucursal';
import { TipoCuentaInterface } from './model/tipo_cuenta';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  listUsuarios: any = []
  listSucursales: any = []
  messageForm: string = ''
  textLoader: string = ''
  rol: string = ''
  sesion: boolean = false
  usuario: UsuarioInterface
  tituloModal: string = ''
  tituloBoton: string = ''

  constructor(private http: HttpClient) { }

  getSucursales() {
    return this.http.get(`${environment.url}/getSucursales`)
      .subscribe((result) => {
        this.listSucursales = result
      })
  }

  getListUsuarios() {
    return this.listUsuarios
  }

  setListUsuarios(listUsuarios: any[]) {
    this.listUsuarios = listUsuarios
  }

  setTextLoader(textLoader: string) {
    this.textLoader = textLoader
  }

  getTextLoader() {
    return this.textLoader
  }

  setTituloModal(tituloModal: string) {
    this.tituloModal = tituloModal
  }

  getTituloModal() {
    return this.tituloModal
  }

  setTituloBoton(tituloBoton: string) {
    this.tituloBoton = tituloBoton
  }

  getTituloBoton() {
    return this.tituloBoton
  }

  setUsuario(usuario: UsuarioInterface) {
    this.usuario = usuario
  }

  getUsuario() {
    return this.usuario
  }

  logueo(body: UsuarioInterface) {
    return this.http.post<UsuarioInterface>(`${environment.url}/login`, body)
      .pipe(map(data => data))
  }

  // USUARIOS
  getUsuarios() {
    return this.http.get(`${environment.url}/getUsuarios`)
  }

  registrarUsuario(obj: UsuarioInterface) {
    this.messageForm = ''
    this.setTextLoader('Registrando Usuario...')
    $('.loading').show()
    return this.http.post<UsuarioInterface>(`${environment.url}/registrarUsuario`, obj)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  editarUsuario(obj: UsuarioInterface) {
    this.messageForm = ''
    this.setTextLoader('Editando Usuario...')
    $('.loading').show()
    return this.http.post<UsuarioInterface>(`${environment.url}/editarUsuario`, obj)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  // ROLES
  getRoles() {
    return this.http.get(`${environment.url}/getRoles`)
  }

  registrarRol(obj: RolInterface) {
    this.messageForm = ''
    this.setTextLoader('Registrando Usuario...')
    $('.loading').show()
    return this.http.post<RolInterface>(`${environment.url}/registrarRoles`, obj)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  editarRol(obj: RolInterface) {
    this.messageForm = ''
    this.setTextLoader('Editando Usuario...')
    $('.loading').show()
    return this.http.post<RolInterface>(`${environment.url}/editarRoles`, obj)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  // SUCURSALES
  getSucursalesAdmin() {
    return this.http.get(`${environment.url}/getSucursales`)
  }

  registrarSucursal(obj: SucursalInterface) {
    this.messageForm = ''
    this.setTextLoader('Registrando Sucursal...')
    $('.loading').show()
    return this.http.post<SucursalInterface>(`${environment.url}/registrarSucursal`, obj)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  editarSucursal(obj: SucursalInterface) {
    this.messageForm = ''
    this.setTextLoader('Editando Sucursal...')
    $('.loading').show()
    return this.http.post<SucursalInterface>(`${environment.url}/editarSucursal`, obj)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  // TIPO CUENTA
  getTipoCuenta() {
    return this.http.get(`${environment.url}/getTipoCuenta`)
  }

  registrarTipoCuenta(obj: TipoCuentaInterface) {
    this.messageForm = ''
    this.setTextLoader('Registrando Sucursal...')
    $('.loading').show()
    return this.http.post<TipoCuentaInterface>(`${environment.url}/registrarTipoCuenta`, obj)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  editarTipoCuenta(obj: TipoCuentaInterface) {
    this.messageForm = ''
    this.setTextLoader('Editando Sucursal...')
    $('.loading').show()
    return this.http.post<TipoCuentaInterface>(`${environment.url}/editarTipoCuenta`, obj)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  // GLOBAL
  borrar(dato, tabla, campo) {
    this.messageForm = ''

    let borrar = {
      dato: dato,
      tabla: tabla,
      campo: campo
    }

    return this.http.post(`${environment.url}/borrar`, borrar)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
        }
      })
  }
}
