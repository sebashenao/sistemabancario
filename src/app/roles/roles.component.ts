import { Component, OnInit } from '@angular/core';
import { RolInterface } from '../model/rol';
import { BancoService } from '../banco.service';
import * as $ from "jquery"

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  listRoles: any = []
  rolesInterface: RolInterface = {}

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.rolesInterface = {}
    this.getRoles()
  }

  getRoles() {
    this.bancoService.setTextLoader('Consultando Roles...')
    $('.loading').show()
    this.bancoService.getRoles()
      .subscribe((data => {
        this.listRoles = data
        $('.loading').hide()
      }))
  }

  consultar() {
    setTimeout(() => {
      this.getRoles()
    }, 1000);
  }

  limpiar() {
    this.rolesInterface = {};
  }

}
