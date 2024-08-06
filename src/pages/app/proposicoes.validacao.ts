import { z } from "zod";

export const proposicoesForm = z.object({
  municipioId: z.number(),
  tipo: z.string(),
  dataInicio: z.date({ required_error: "Data inicial é obrigatória" }),
  dataFim: z.date({ required_error: "Data final é obrigatória" }),
});

export type ProposicoesForm = z.infer<typeof proposicoesForm>;
