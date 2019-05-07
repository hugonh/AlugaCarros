import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Carro } from '../modelos/Carro';
import { Acessorio } from '../modelos/Acessorio';

@Component({
  selector: 'app-escolha',
  templateUrl: './escolha.page.html',
  styleUrls: ['./escolha.page.scss'],
})
export class EscolhaPage implements OnInit {

  constructor(private navCtrl: NavController,
    private activatedRoute: ActivatedRoute) { }

    private carro: Carro

    private acessorios: Acessorio[];
  
    private precoTotal: number;

  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe(params =>{
      this.carro = <Carro>JSON.parse(params["carroSelecionado"]);

      console.log("O carro que chegou na pagina de escolha é:"+ this.carro.nome);
      
    });
    this.precoTotal = this.carro.preco;

    this.acessorios = [
      {nome: "Freio ABS", preco:800},
      {nome: "Ar-Condicionado", preco:1000},
      {nome: "MP3 Player", preco:500},
    ];
  }

  atualizarTotal(ativo:boolean, acessorio: Acessorio){
    ativo ? this.precoTotal += acessorio.preco : this.precoTotal -= acessorio.preco;
  }

  avancaCadastro(){
    let extras: NavigationExtras = {
      queryParams:{
        carroSelecionado: JSON.stringify(this.carro),
        precoTotal: this.precoTotal
      }
    };

    this.navCtrl.navigateForward(['cadastro'], extras);
  }
  
}
