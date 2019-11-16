import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioInterface } from './model/usuario';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import * as $ from "jquery"

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

  getUsuarios() {
    return this.http.get(`${environment.url}/getUsuarios`)
  }

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

  registrarUsuario(nuevoUsuario: UsuarioInterface) {
    this.messageForm = ''
    this.setTextLoader('Registrando Usuario...')
    $('.loading').show()
    return this.http.post<UsuarioInterface>(`${environment.url}/registrarUsuario`, nuevoUsuario)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

  editarUsuario(usuario: UsuarioInterface) {
    this.messageForm = ''
    this.setTextLoader('Editando Usuario...')
    $('.loading').show()
    return this.http.post<UsuarioInterface>(`${environment.url}/editarUsuario`, usuario)
      .subscribe((result) => {
        if (!isNullOrUndefined(result)) {
          let data: any = result
          this.messageForm = data.mensaje
          $('.loading').hide()
        }
      })
  }

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
