import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Estado, Microrregiao } from "../_models/localizacao.models";

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
}
