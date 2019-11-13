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

  logueo(body) {
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
          setTimeout(() => {
            let data: any = result
            this.messageForm = data.mensaje
            $('.loading').hide()
          }, 1000);
        }
      })
  }
}
