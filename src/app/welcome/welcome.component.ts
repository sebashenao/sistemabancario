import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BancoService } from '../banco.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  data : any = []

  constructor(public bancoService: BancoService, private route: Router) { }

  ngOnInit() {
    if (this.bancoService.getUsuario() == undefined || !this.bancoService.sesion) {
      this.route.navigate(['/'])
    }
    else {
      this.data = this.bancoService.getUsuario()
    }
  }
}
