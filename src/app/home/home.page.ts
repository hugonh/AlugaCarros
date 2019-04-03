import { Component, OnInit } from '@angular/core';
//import {HttpClient, HttpErrorResponse} from '@angular/common/http';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { HttpErrorResponse } from '@angular/common/http';
import { Carro } from '../modelos/Carro';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { CarrosService } from '../providers/carros.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
 
public carros: Carro[];

constructor (private loadingCtrl:LoadingController,
              private alertCtrl: AlertController,
              private carrosService: CarrosService,
              private navCtrl: NavController){
  
  }

 async ngOnInit() {
const loading = await this.loadingCtrl.create({
  message: 'Aguarde enquanto os carros são carregados...'

});

await loading.present();




 //this.http.get<Carro[]>('http://localhost:8080/api/carro/listaTodos')
 this.carrosService.lista()
  .subscribe(
    (carros)=>{
      this.carros = carros;
     loading.dismiss(); // corta a mensagem de loading
    },
    async (err: HttpErrorResponse)=>{
      console.log('Deu erro ' + err.status);
      const al = await this.alertCtrl.create({
        header:'Erro!',
        message: 'Erro ao listar carros' ,
        buttons: [{text:'Ok'}]
      });
      
      await al.present();
    }

    ) .add(
      ()=>{
      loading.dismiss();
    }
    )
  
}
selecionaCarro(carro: Carro){
  console.log("Carro selecionado: "+carro.nome);

let extras: NavigationExtras = {
  queryParams:{
    carroSelecionado: JSON.stringify(carro)

  }
};

  this.navCtrl.navigateForward(['escolha'], extras);
}
  
}


