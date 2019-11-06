import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioInterface } from './model/usuario';
import { map } from 'rxjs/operators';

// mysql cluster active y pasive, 
// Fail-over

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private listUsuarios: any = []

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(`${environment.url}/getUsuarios`)
  }

  getListUsuarios() {
    return this.listUsuarios
  }

  setListUsuarios(listUsuarios: any[]) {
    this.listUsuarios = listUsuarios
  }

  logueo(body) {
    return this.http.post<UsuarioInterface>(`${environment.url}/login`, body)
    .pipe(map(data => data))
  }
}
