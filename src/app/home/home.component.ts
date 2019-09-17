import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/public_api";
import { Estado, Microrregiao } from "../_models/localizacao.models";
import { ApiService } from "../_services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  estados: Array<Estado> = [
    { id: "0", sigla: "", nome: "Carregando...", regiao: null }
  ];
  cidades: Array<Microrregiao> = [];
  estado: string;
  cidade: string;
  estadoSelecionado: Estado;
  cidadeSelecionada: Microrregiao;

  public chartDataBeneficiarios: ChartDataSets[] = [];
  public chartDataValor: ChartDataSets[] = [];
  public barChartLabels: Label[] = [];
  loading: boolean = false;

  @ViewChild("inputEstado", { static: false }) inputRef: ElementRef;
  @ViewChild("inputCidade", { static: false }) inputRefCidade: ElementRef;
  erro: boolean;
  erroMenssagem: string;

  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this.carregarEstados();
  }

  async carregarEstados() {
    this.setLoading(true);
    this.estados = await this._apiService.getEstados();
    this.setLoading();
  }

  async carregarCidades() {
    const { id } = this.estadoSelecionado;

    this.cidades = await this._apiService.getCidades(id);
  }

  async carregarGrafico() {
    this.setLoading(true);
    this.inputRefCidade.nativeElement.blur();
    // try {
    const graficoDados = await this._apiService.carregaDados(
      this.cidadeSelecionada.id
    );
    console.log(graficoDados);

    this.reiniciaGrafico();
    const dataBeneficiarios = [];
    const dataValor = [];
    graficoDados.forEach(mes => {
      dataBeneficiarios.push(mes.quantidadeBeneficiados);
      dataValor.push(mes.valor);
      this.barChartLabels.push(mes.dataReferencia);
    });

    this.chartDataBeneficiarios.push({ data: dataBeneficiarios });
    this.chartDataValor.push({ data: dataValor });
    // } catch (error) {
    // console.log(error);

    // this.erro = true;
    // this.erroMenssagem =
    //   "Ocorreu um erro ao tentar recuperar os dados, por favor tente novamente.";
    // } finally {
    this.setLoading();
    // }
  }

  reiniciaGrafico() {
    this.chartDataBeneficiarios = [];
    this.chartDataValor = [];
    this.barChartLabels = [];
  }

  onSelectEstado(event: TypeaheadMatch): void {
    this.estadoSelecionado = event.item;
    this.estado = `${this.estadoSelecionado.nome}-${this.estadoSelecionado.sigla} `;
    this.carregarCidades();
  }

  onSelectCidade(event: TypeaheadMatch): void {
    this.cidadeSelecionada = event.item;
    this.carregarGrafico();
  }

  setLoading(loading = false) {
    this.loading = loading;
  }

  removeErro() {
    this.erro = false;
  }

  get disabledInputCidade() {
    return (
      this.estadoSelecionado == null || this.estadoSelecionado == undefined
    );
  }
}
