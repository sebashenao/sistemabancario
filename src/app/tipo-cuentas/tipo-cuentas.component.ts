import { Component, OnInit } from '@angular/core';
import { TipoCuentaInterface } from '../model/tipo_cuenta';
import { BancoService } from '../banco.service';
import * as $ from "jquery"

@Component({
  selector: 'app-tipo-cuentas',
  templateUrl: './tipo-cuentas.component.html',
  styleUrls: ['./tipo-cuentas.component.scss']
})
export class TipoCuentasComponent implements OnInit {

  listTipoCuentas: any = []
  tipoCuentaInterface: TipoCuentaInterface = {}

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.tipoCuentaInterface = {}
    this.getTipoCuenta()
  }

  getTipoCuenta() {
    this.bancoService.setTextLoader('Consultando Tipos de Cuenta...')
    $('.loading').show()
    this.bancoService.getTipoCuenta()
      .subscribe((data => {
        this.listTipoCuentas = data
        $('.loading').hide()
      }))
  }

  consultar() {
    setTimeout(() => {
      this.getTipoCuenta()
    }, 1000);
  }

  limpiar() {
    this.tipoCuentaInterface = {};
  }

}
