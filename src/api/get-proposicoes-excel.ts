import { api } from "@/lib/axios";

export interface GetProposicoesExcelQuery {
  municipioId: number;
  tipo: string;
  dataInicio: string;
  dataFim: string;
}

export async function getProposicoesExcel({
  municipioId,
  tipo,
  dataInicio,
  dataFim,
}: GetProposicoesExcelQuery) {
  const response = await api.get<Blob>("/proposicao/gerar-excel", {
    params: {
      id_municipio: municipioId,
      tipo,
      data_inicio: dataInicio,
      data_final: dataFim,
    },
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'proposicoes.xlsx');
  document.body.appendChild(link);
  link.click();

  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);

  return response.data;
}
