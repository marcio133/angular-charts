import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/public_api";
import { Estado, Microrregiao } from "../_models/localizacao.models";
import { ApiService } from "../_services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  estados: Array<Estado>;
  cidades: Array<Microrregiao> = [];
  estado: string;
  cidade: string;
  @ViewChild("inputEstado", { static: false }) inputRef: ElementRef;
  estadoSelecionado: Estado;
  cidadeSelecionada: Microrregiao;

  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    console.log(this.inputRef);
    this.carregarEstados();
  }

  async carregarEstados() {
    this.estados = await this._apiService.getEstados();
  }

  async carregarCidades() {
    const { id } = this.estadoSelecionado;

    this.cidades = await this._apiService.getCidades(id);
  }

  onSelectEstado(event: TypeaheadMatch): void {
    this.estadoSelecionado = event.item;
    this.estado = `${this.estadoSelecionado.nome}-${this.estadoSelecionado.sigla} `;
    this.carregarCidades();
  }

  onSelectCidade(event: TypeaheadMatch): void {
    this.cidadeSelecionada = event.item;
    console.log(this.estadoSelecionado.id + this.cidadeSelecionada.id);
  }
}
