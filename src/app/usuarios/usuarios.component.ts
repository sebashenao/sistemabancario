import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  listUsuarios: any = []
  constructor(private bancoService: BancoService) { }

  ngOnInit() {
     this.bancoService.getUsuarios()
    .subscribe((data => {
      this.listUsuarios = data
      console.log(this.listUsuarios);
    }))
    
  }

}
