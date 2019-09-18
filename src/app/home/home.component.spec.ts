import { HttpClientModule } from "@angular/common/http";
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from "ng2-charts";
import { TypeaheadMatch, TypeaheadModule } from "ngx-bootstrap/typeahead";
import { GraphComponent } from "../graph/graph.component";
import { LoadingComponent } from "../loading/loading.component";
import {
  Estado,
  Microrregiao,
  ValorBeneficio
} from "../_models/localizacao.models";
import { ApiService } from "../_services/api.service";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;
  let estadoTeste: Estado;
  let cidadeTeste: Microrregiao;
  let valorBeneficioTeste: ValorBeneficio;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, GraphComponent, LoadingComponent],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TypeaheadModule.forRoot(),
        ChartsModule,
        FontAwesomeModule
      ],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    apiService = TestBed.get(ApiService);
    estadoTeste = {
      id: "11",
      sigla: "RO",
      nome: "Rondônia",
      regiao: { id: "1", sigla: "N", nome: "Norte" }
    };
    cidadeTeste = {
      id: "5300108",
      nome: "Brasília",

      mesorregiao: {
        id: "5301",
        nome: "Distrito Federal",
        UF: {
          id: "53",
          sigla: "DF",
          nome: "Distrito Federal",
          regiao: { id: "5", sigla: "CO", nome: "Centro-Oeste" }
        }
      }
    };
    valorBeneficioTeste = {
      id: 1,
      dataReferencia: "01/2001",
      valor: 10,
      quantidadeBeneficiados: 10
    };
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("carregarEstados() must set this.estaados and remove the loading", fakeAsync(() => {
    //Mock de requisição

    spyOn(apiService, "getEstados").and.returnValue(
      Promise.resolve([estadoTeste])
    );

    component.carregarEstados();
    tick();

    expect(component.estados.length).toBe(1);
    expect(component.loading).toBeFalsy();
  }));

  it("carregarCidades() must call getCidades() and set an array of cidades", fakeAsync(() => {
    //Mock de requisição

    spyOn(apiService, "getCidades").and.returnValue(
      Promise.resolve([cidadeTeste])
    );

    component.estadoSelecionado = estadoTeste;
    component.carregarCidades();
    tick();

    expect(apiService.getCidades).toHaveBeenCalledTimes(1);
    expect(component.cidades.length).toBe(1);
  }));

  it("disabledInputCidade must return true when estadoSelecionado is equal to null", () => {
    component.estadoSelecionado = null;

    expect(component.disabledInputCidade).toBeTruthy();
  });

  it("carregarGrafico() must disable loading and set chartDataBeneficiarios, chartDataValor and barChartLabels", fakeAsync(() => {
    //Mock de requisição
    spyOn(apiService, "carregaDados").and.callFake(() => {
      return Promise.resolve([valorBeneficioTeste]);
    });
    component.cidadeSelecionada = cidadeTeste;

    component.carregarGrafico();
    tick();

    expect(apiService.carregaDados).toHaveBeenCalledTimes(1);
    expect(component.chartDataBeneficiarios).toContain({
      data: [valorBeneficioTeste.quantidadeBeneficiados]
    });
    expect(component.chartDataValor).toContain({
      data: [valorBeneficioTeste.valor]
    });
    expect(component.loading).toBeFalsy();
  }));

  it("carregarGrafico() must disable loading and set erroMessage when carregaDados return an error", fakeAsync(() => {
    //Mock de requisição
    spyOn(apiService, "carregaDados").and.callFake(() => {
      return new Promise(() => {
        throw new Error("test error inside");
      });
    });

    component.cidadeSelecionada = cidadeTeste;

    component.carregarGrafico();
    tick();

    expect(component.erro).toBeTruthy();
    expect(component.loading).toBeFalsy();
    expect(component.erroMenssagem).toContain("Ocorreu um erro");
  }));

  it("onSelectEstado() must call carregarCidades() and set estado and estadoSelecionado", () => {
    //Mock de requisição
    spyOn(apiService, "getCidades").and.returnValue(
      Promise.resolve([cidadeTeste])
    );
    spyOn(component, "carregarCidades");
    const typeaheadMock = new TypeaheadMatch(estadoTeste);

    component.onSelectEstado(typeaheadMock);

    expect(component.carregarCidades).toHaveBeenCalledTimes(1);
    expect(component.estado).toContain("Rondônia-RO");
    expect(component.estadoSelecionado).toBe(estadoTeste);
  });

  it("when estado isnt null cidadesInput shoud be enabled", () => {
    component.estadoSelecionado = estadoTeste;
    const inputCidade = fixture.debugElement.query(By.css("#inputCidade"));

    expect(inputCidade.nativeElement.disabled).toBeFalsy();
  });
});
