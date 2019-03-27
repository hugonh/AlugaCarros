import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Carro } from '../modelos/Carro';

@Component({
  selector: 'app-escolha',
  templateUrl: './escolha.page.html',
  styleUrls: ['./escolha.page.scss'],
})
export class EscolhaPage implements OnInit {

  constructor(private navCtrl: NavController,
    private activatedRoute: ActivatedRoute) { }

  
  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe(params=>{
      let carro = <Carro>JSON.parse(params)["carroSelecionado"]);

      console.log("O carro que chegou na pagina de escolha é:"+carro.nome);
      
    });

  }

  
  voltar(){
  this.navCtrl.back();
  //fazer o voltar
  }
  
}
