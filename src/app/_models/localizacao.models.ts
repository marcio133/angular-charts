export interface Regiao {
  id: string;
  sigla: string;
  nome: string;
}

export interface Estado {
  id: string;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

export interface Mesorregiao {
  id: string;
  nome: string;
  UF: Estado;
}

export interface Microrregiao {
  id: string;
  nome: string;
  mesorregiao: Mesorregiao;
}

export interface ValorBeneficio {
  id: number;
  dataReferencia: string;
  // municipio: Municipio;
  // tipo: Tipo;
  valor: number;
  quantidadeBeneficiados: number;
}
