import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
declare var $ : any

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public bancoService: BancoService) { }

  ngOnInit() {
    $('.loading').hide()
  }

}
