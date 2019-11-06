import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioInterface } from '../model/usuario';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuarioInterface: UsuarioInterface = {}
  mensajeServer: string = ''

  constructor(private bancoService: BancoService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    if (!isNullOrUndefined(this.usuarioInterface.usuario) && !isNullOrUndefined(this.usuarioInterface.clave)) {
      this.mensajeServer = ''
      this.bancoService.logueo(this.usuarioInterface).subscribe(result => {
        let data: any
        data = result
        if (data.estado == 200) {
          this.router.navigate(['/home'])
        }
        else {
          this.mensajeServer = data.mensaje
        }
      })
    }
    else {
      this.mensajeServer = 'Todos Los Datos Son Requeridos!'
    }
  }

}
