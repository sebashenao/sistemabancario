import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import { BancoService } from '../banco.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rol: number = null
  data: any = []

  constructor(public bancoService: BancoService, private route: Router) { }

  ngOnInit() {
    if (this.bancoService.getUsuario() == undefined || !this.bancoService.sesion) {
      this.route.navigate(['/'])
    } else {
        this.data = this.bancoService.getUsuario()
        this.rol = this.data.tip_usuario
        this.cambiarVista('welcome')
    }
  }

  cambiarVista(vista: string) {
    this.route.navigate(['home/' + vista])
  }

}
