import { HttpClient } from "@angular/common/http";
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
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
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
    return this._httpClient
      .get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `http://www.transparencia.gov.br/api-de-dados/bolsa-familia-por-municipio?mesAno=${mesAno}&codigoIbge=${codigoCidade}&pagina=1`
        )}`
      )
      .pipe(
        map(
          (res: any) => {
            console.log(res);

            let { contents } = res;
            contents = JSON.parse(contents);
            delete contents[0].municipio;
            delete contents[0].tipo;

            const content = <ValorBeneficio>contents[0];
            content.dataReferencia = content.dataReferencia.slice(-7);

            return content;
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
