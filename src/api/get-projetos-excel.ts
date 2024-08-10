import { api } from "@/lib/axios";

export interface GetProjetosExcelQuery {
  municipioId: number;
  especie: string;
  dataInicio: string;
  dataFim: string;
}

export async function getProjetosExcel({
  municipioId,
  especie,
  dataInicio,
  dataFim,
}: GetProjetosExcelQuery) {
  try {
    const response = await api.get<Blob>("/projeto/gerar-excel", {
      params: {
        id_municipio: municipioId,
        especie,
        data_inicio: dataInicio,
        data_final: dataFim,
      },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'projetos.xlsx');
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error("Nenhum dado encontrado para os parâmetros fornecidos.");
    } else {
      throw new Error("Ocorreu um erro ao tentar gerar o Excel.");
    }
  }
}
