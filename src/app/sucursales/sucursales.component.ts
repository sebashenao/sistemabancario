import { Component, OnInit } from '@angular/core';
import { SucursalInterface } from '../model/sucursal';
import { BancoService } from '../banco.service';
import * as $ from "jquery"

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {

  listSucursales: any = []
  sucursalInterface: SucursalInterface = {}

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.sucursalInterface = {}
    this.getSucursalesAdmin()
  }

  getSucursalesAdmin() {
    this.bancoService.setTextLoader('Consultando Sucursales...')
    $('.loading').show()
    this.bancoService.getSucursalesAdmin()
      .subscribe((data => {
        this.listSucursales = data
        $('.loading').hide()
      }))
  }

  consultar() {
    setTimeout(() => {
      this.getSucursalesAdmin()
    }, 1000);
  }

  limpiar() {
    this.sucursalInterface = {};
  }

}
