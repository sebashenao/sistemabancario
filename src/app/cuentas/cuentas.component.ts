import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import { CuentaInterface } from '../model/cuenta';
import * as $ from "jquery"

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  listCuentas: any = []
  listTipoCuenta : any = []
  cuentaInterface: CuentaInterface = {}

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.cuentaInterface = {}
    this.bancoService.getUsuariosForCuentas()
    this.getCuentasAdmin()
    this.bancoService.getTipoCuenta().subscribe((data => {
      this.listTipoCuenta = data
    }))
  }

  getCuentasAdmin() {
    this.bancoService.setTextLoader('Consultando Cuentas...')
    $('.loading').show()
    this.bancoService.getCuentasAdmin()
      .subscribe((data => {
        this.listCuentas = data
        $('.loading').hide()
      }))
  }

  consultar() {
    setTimeout(() => {
      this.getCuentasAdmin()
    }, 1000);
  }

  limpiar() {
    this.cuentaInterface = {};
  }


}
