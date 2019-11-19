import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import { SucursalInterface } from '../model/sucursal';

@Component({
  selector: 'app-sucursales-usuario',
  templateUrl: './sucursales-usuario.component.html',
  styleUrls: ['./sucursales-usuario.component.scss']
})
export class SucursalesUsuarioComponent implements OnInit {

  sucursaleUsuInterfase : SucursalInterface = {}

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
  }

}
