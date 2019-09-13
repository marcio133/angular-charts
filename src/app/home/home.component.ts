import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
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
  estados: Array<Estado>;
  cidades: Array<Microrregiao> = [];
  estado: string;
  cidade: string;
  @ViewChild("inputEstado", { static: false }) inputRef: ElementRef;
  estadoSelecionado: Estado;
  cidadeSelecionada: Microrregiao;

  public chartDataBeneficiarios: ChartDataSets[] = [];
  public chartDataValor: ChartDataSets[] = [];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    }
  };

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

  async carregarGrafico() {
    const graficoDados = await this._apiService.carregaDados(
      this.cidadeSelecionada.id
    );
    console.log(graficoDados);

    const dataBeneficiarios = [];
    const dataValor = [];
    graficoDados.forEach(mes => {
      dataBeneficiarios.push(mes.quantidadeBeneficiados);
      dataValor.push(mes.valor);
      this.barChartLabels.push(mes.dataReferencia);
    });

    this.chartDataBeneficiarios.push({ data: dataBeneficiarios });
    this.chartDataValor.push({ data: dataValor });
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
}
