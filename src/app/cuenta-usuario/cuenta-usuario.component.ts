import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import { TransaccionInterface } from '../model/transaccion';
import { BancoService } from '../banco.service';
import { isNullOrUndefined } from 'util';
import * as Highcharts from 'highcharts';
import { formatDate, formatCurrency } from '@angular/common';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-cuenta-usuario',
  templateUrl: './cuenta-usuario.component.html',
  styleUrls: ['./cuenta-usuario.component.scss']
})
export class CuentaUsuarioComponent implements OnInit {

  listTransacciones: any = []
  transaccionInterface: TransaccionInterface = {}

  constructor(public bancoService: BancoService) { }

  ngOnInit() {

  }

  getTraFechas() {
    if (!isNullOrUndefined(this.transaccionInterface.fec_ini)
      && !isNullOrUndefined(this.transaccionInterface.fec_fin)) {
      this.bancoService.getTransaccionesFechas(this.transaccionInterface.fec_ini, this.transaccionInterface.fec_fin, this.bancoService.getCuenta().num_cue)
        .subscribe((data => {

          this.listTransacciones = data

          let fechas: any = []
          let total: any = []

          for (var i of this.listTransacciones) {
            fechas.push(i.fec_tra.substring(0,10))
            total.push(i.total)
          }

          let options: any = {
            chart: {
              type: 'bar',
              height: 300
            },
            title: {
              text: 'Transacciones Por  Dia'
            },
            credits: {
              enabled: false
            },
            xAxis: {
              categories: fechas,
              type: 'datetime',
              title: {
                text: null
              }
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Total Transacciones Por Dia(pesos)',
                align: 'high'
              },
              labels: {
                overflow: 'justify'
              }
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true
                }
              }
            },
            series: [{
              name: 'Total',
              data: total
            }]
          }

          Highcharts.chart('container', options);

          if (this.listTransacciones.length > 0) {
            $('#container').show()
          }
        }))
    }
  }

  limpiar() {
    this.transaccionInterface.num_cue = this.bancoService.getCuenta().num_cue
    // this.transaccionInterface = {};
  }

}
