import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";

import { getProposicoesExcel } from "@/api/get-proposicoes-excel";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { ProposicoesForm, proposicoesForm } from "./proposicoes.validacao";

const municipios = [
  { id: 9, nome: "Ponta Grossa - PR" },
  { id: 12, nome: "União da Vitória - PR" },
];

const tipoProposicoes = [
  { value: "0", label: "Todos" },
  { value: "1", label: "Indicação" },
  { value: "2", label: "Requerimento" },
  { value: "3", label: "Moção" },
  { value: "4", label: "Resolução MD" },
  { value: "5", label: "Portaria" },
];

export function Proposicoes() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
  } = useForm<ProposicoesForm>({
    resolver: zodResolver(proposicoesForm),
    defaultValues: {
      tipo: "0",
      municipioId: 9,
      dataInicio: new Date(),
    },
  });

  console.log({ errors });

  const handleGerarExcel = async ({
    municipioId,
    tipo,
    dataInicio,
    dataFim,
  }: ProposicoesForm) => {
    await getProposicoesExcel({
      municipioId,
      tipo,
      dataInicio: format(dataInicio, "yyyy-MM-dd"),
      dataFim: format(dataFim, "yyyy-MM-dd"),
    });
  };

  return (
    <>
      <Helmet title="Proposições" />

      <form className="space-y-4" onSubmit={handleSubmit(handleGerarExcel)}>
        <Controller
          name="municipioId"
          control={control}
          render={({ field: { name, onChange, value } }) => {
            return (
              <div className="space-y-2">
                <Label htmlFor="municipio">Municipio</Label>
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={String(value)}
                >
                  <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {municipios.map((tipoProposicao) => (
                      <SelectItem
                        key={tipoProposicao.id}
                        value={String(tipoProposicao.id)}
                      >
                        {tipoProposicao.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        />

        <Controller
          name="tipo"
          control={control}
          render={({ field: { name, onChange, value } }) => {
            return (
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select name={name} onValueChange={onChange} value={value}>
                  <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tipoProposicoes.map((tipoProposicao) => (
                      <SelectItem
                        key={tipoProposicao.value}
                        value={String(tipoProposicao.value)}
                      >
                        {tipoProposicao.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        />
        <div className="space-y-2">
          <Label htmlFor="periodo">Período</Label>
          <div className="flex flex-row gap-2">
            <Controller
              name="dataInicio"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <DatePicker
                  name={name}
                  placeholder="Data inicio"
                  date={value}
                  onDateChange={onChange}
                />
              )}
            />
            <Controller
              name="dataFim"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <DatePicker
                  name={name}
                  placeholder="Data fim"
                  date={value}
                  onDateChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <Button size="lg" type="submit" disabled={isSubmitting || !isValid}>
          Gerar Excel
        </Button>
      </form>
    </>
  );
}
