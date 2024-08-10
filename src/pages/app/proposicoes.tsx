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
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { toast } from 'react-toastify';

export function Proposicoes() {
  const [municipios, setMunicipios] = useState([]);
  const [tiposProposicoes, setTiposProposicoes] = useState([]);

  useEffect(() => {
    async function fetchMunicipios() {
      try {
        const response = await api.get('municipios', {
          headers: {
            'Accept': 'application/json',
          },
        });
        setMunicipios(response.data);
      } catch (error) {
        toast.error("Erro ao buscar municípios");
      }
    }

    async function fetchTiposProposicoes() {
      try {
        const response = await api.get('proposicao/tipos', {
          headers: {
            'Accept': 'application/json',
          },
        });
        setTiposProposicoes(response.data);
      } catch (error) {
        toast.error("Erro ao buscar tipos de proposições");
      }
    }

    fetchMunicipios();
    fetchTiposProposicoes();
  }, []);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<ProposicoesForm>({
    resolver: zodResolver(proposicoesForm),
    defaultValues: {
      tipo: "0",
      municipioId: 9,
      dataInicio: new Date(),
      dataFim: new Date(),
    },
  });

  const handleGerarExcel = async ({
    municipioId,
    tipo,
    dataInicio,
    dataFim,
  }: ProposicoesForm) => {
    try {
      await getProposicoesExcel({
        municipioId,
        tipo,
        dataInicio: format(dataInicio, "yyyy-MM-dd"),
        dataFim: format(dataFim, "yyyy-MM-dd"),
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet title="Proposições" />

      <form className="space-y-4" onSubmit={handleSubmit(handleGerarExcel)}>
        <Controller
          name="municipioId"
          control={control}
          render={({ field: { name, onChange, value } }) => (
            <div className="space-y-2">
              <Label htmlFor="municipio">Município</Label>
              <Select
                name={name}
                onValueChange={(val) => onChange(Number(val))}
                value={String(value)}
              >
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {municipios.map((municipio: any) => (
                    <SelectItem
                      key={municipio.id}
                      value={String(municipio.id)}
                    >
                      {municipio.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
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
                    {tiposProposicoes.map((tipoProposicao: any) => (
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
          Gerar excel
        </Button>
      </form>
    </>
  );
}
