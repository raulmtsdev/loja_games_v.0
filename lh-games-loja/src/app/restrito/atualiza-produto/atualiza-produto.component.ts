import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/Produto.model';
import { ProdutoService } from 'src/app/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-atualiza-produto',
    templateUrl: './atualiza-produto.component.html',
    styleUrls: ['./atualiza-produto.component.css']
})
export class AtualizaProdutoComponent implements OnInit {
    public produtoId: number = 0;
    public produto: Produto = new Produto(0, "", "", "", 0);
    private _produto: Produto[] | undefined;
    constructor(private _produtoService: ProdutoService, private _activatedRoute:
        ActivatedRoute, private _router: Router) {
        this._activatedRoute.params.subscribe(params => this.produtoId =
            params['id']);
    }
    ngOnInit(): void {
        this.listarProduto();
    }
    listarProduto(): void {
        this._produtoService.getProduto(this.produtoId)
            .subscribe((res: any) => {
                console.log(res[0].produto);
                this.produto = new
                    Produto(res[0].id, res[0].produto, res[0].descricao, res[0].foto, res[0].preco);
            })
    }
    atualizar(id: number) {
        this._produtoService.atualizarProduto(id, this.produto).subscribe(
            produto => {
                this._produto = produto; // Atualiza o produto com os dados retornados após a atualização
                this._router.navigate(["/restrito/lista"]); // Move o redirecionamento para dentro do bloco de sucesso da atualização
            },
            _err => {
                console.log("erro ao atualizar");
            }
        );
    }
}