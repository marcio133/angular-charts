import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { catchError, map } from "rxjs/operators";
import {
  Estado,
  Microrregiao,
  ValorBeneficio
} from "../_models/localizacao.models";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private _httpClient: HttpClient) {}

  getEstados(): Promise<Array<Estado>> {
    return this._httpClient
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
      .pipe(
        map(res => {
          return <Array<Estado>>res;
        })
      )
      .toPromise();
  }

  getCidades(uf: string): Promise<Array<Microrregiao>> {
    return this._httpClient
      .get(
        `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .pipe(
        map(res => {
          return <Array<Microrregiao>>res;
        })
      )
      .toPromise();
  }

  carregaDados(codigoCidade: string): Promise<Array<ValorBeneficio>> {
    let todayDate = moment(new Date());
    let dates: Array<string> = [];
    let requisicoes: Array<Promise<any>> = [];

    for (let index = 0; index < 12; index++) {
      todayDate = moment(todayDate).subtract(1, "M");
      dates.push(
        `${todayDate.year()}${this.formatMonthString(todayDate.month())}`
      );
    }

    dates.forEach(date => {
      requisicoes.push(this.getDadoEmMes(date, codigoCidade));
    });

    return Promise.all(requisicoes);
  }

  getDadoEmMes(mesAno: string, codigoCidade: string) {
    const headers = new HttpHeaders({ "Content-Type": "text/plain" });

    return this._httpClient
      .get(
        `api-de-dados/bolsa-familia-por-municipio?mesAno=${mesAno}&codigoIbge=${codigoCidade}&pagina=1`,
        { responseType: "json", headers }
      )
      .pipe(
        map(
          (res: Array<any>) => {
            delete res[0].municipio;
            delete res[0].tipo;

            const result = <ValorBeneficio>res[0];
            result.dataReferencia = result.dataReferencia.slice(-7);

            return result;
          },
          catchError(() => {
            return null;
          })
        )
      )
      .toPromise();
  }

  formatMonthString(month) {
    return `${("0" + (month + 1)).slice(-2)}`;
  }
}
