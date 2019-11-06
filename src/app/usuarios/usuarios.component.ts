import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.bancoService.getUsuarios().subscribe(result => {
      let data: any
      data = result
      // this.bancoService.getUsuario().setListUsuarios(data)
    })
  }

}
