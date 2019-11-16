import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import * as $ from "jquery"
import { UsuarioInterface } from '../model/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  listUsuarios: any = []
  usuarioInterface: UsuarioInterface = {}
  cedulaUsuario: string = ''

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.usuarioInterface = {}
    this.getUsuarios()
  }

  getUsuarios() {
    this.bancoService.setTextLoader('Consultando Usuarios...')
    $('.loading').show()
    this.bancoService.getUsuarios()
      .subscribe((data => {
        this.listUsuarios = data
        $('.loading').hide()
      }))
  }

  consultar() {
    this.bancoService.setTextLoader('Eliminando Usuario...')
    $('.loading').show()
    setTimeout(() => {
      this.getUsuarios()
    }, 2000);
  }

}
