import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto.model';
import { ProdutoService } from 'src/app/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  public produto: Produto = new Produto(0, "", "", "", 0);

  constructor(private _produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
  }

  cadastrar(): void {
    this._produtoService.cadastrarProduto(this.produto).subscribe(
      produto => {
        this.produto = new Produto(0, "", "", "", 0);
        alert("Cadastro Efetuado com Sucesso");
        this.router.navigate(["/restrito/lista"]);
      },
      err => {
        alert("Erro ao cadastrar");
      }
    );
  }
}
