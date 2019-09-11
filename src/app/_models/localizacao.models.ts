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
  id: number;
  nome: string;
  UF: Estado;
}

export interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}
