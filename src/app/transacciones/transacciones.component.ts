import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import { TransaccionInterface } from '../model/transaccion';
import { BancoService } from '../banco.service';
@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {

  listTransacciones: any = []
  TransaccionInterface: TransaccionInterface = {}

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.TransaccionInterface = {}
    this.getTransacciones()
  }

  getTransacciones() {
    this.bancoService.setTextLoader('Consultando Transacciones...')
    $('.loading').show()
    this.bancoService.getTransacciones()
      .subscribe((data => {
        this.listTransacciones = data
        $('.loading').hide()
      }))
  }

  consultar() {
    setTimeout(() => {
      this.getTransacciones()
    }, 1000);
  }

  limpiar() {
    this.TransaccionInterface = {};
  }

}
