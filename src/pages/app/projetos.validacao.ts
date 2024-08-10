import { z } from "zod";

export const projetosForm = z.object({
  municipioId: z.number(),
  especie: z.string(),
  dataInicio: z.date({ required_error: "Data inicial é obrigatória" }),
  dataFim: z.date({ required_error: "Data final é obrigatória" }),
});

export type ProjetosForm = z.infer<typeof projetosForm>;
