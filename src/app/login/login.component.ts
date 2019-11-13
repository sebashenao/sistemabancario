import { Component, OnInit } from '@angular/core'
import { BancoService } from '../banco.service'
import { Router, ActivatedRoute } from '@angular/router'
import { UsuarioInterface } from '../model/usuario'
import { isNullOrUndefined } from 'util'
import * as $ from "jquery"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuarioInterface: UsuarioInterface = {}
  mensajeServer: string = ''

  constructor(public bancoService: BancoService, private router: Router) { }

  ngOnInit() {
    $('.content-menu').hide()
    this.bancoService.getSucursales()
  }

  login() {
    if (!isNullOrUndefined(this.usuarioInterface.ced_usu) && !isNullOrUndefined(this.usuarioInterface.pas_usu)) {
      this.mensajeServer = ''
      this.bancoService.setTextLoader('Validando Datos...')
      $('.loading').show()
      this.bancoService.logueo(this.usuarioInterface).subscribe(result => {
        let data: any
        data = result
        if (data.estado == 200) {
          setTimeout(() => {
            $('.loading').hide()
            this.bancoService.setUsuario(data.data)
            this.router.navigate(['/home'])
          }, 1000)
        }
        else {
          setTimeout(() => {
            $('.loading').hide()
            this.mensajeServer = data.mensaje
          }, 1000)
        }
      })
    }
    else {
      this.mensajeServer = 'Todos Los Datos Son Requeridos!'
    }
  }

}
