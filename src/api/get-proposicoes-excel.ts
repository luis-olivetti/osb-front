import { api } from "@/lib/axios";

export interface GetProposicoesExcelQuery {
  municipioId: number;
  tipo: string;
  dataInicio: string;
  dataFim: string;
}

export interface GetProposicoesExcelResponse {
  xlsxFile: Uint8Array;
}

export async function getProposicoesExcel({
  municipioId,
  tipo,
  dataInicio,
  dataFim,
}: GetProposicoesExcelQuery) {
  const response = await api.get<GetProposicoesExcelResponse>(
    "/proposicao/gerar-excel",
    {
      params: {
        id_municipio: municipioId,
        tipo,
        data_inicio: dataInicio,
        data_final: dataFim,
      },
    },
  );

  return response.data;
}
