"use client";

import { useState } from "react";
import roteiros from "../dados/roteiros.json";
import { filtrarRoteiros } from "../lib/roteiros";
import FiltroRoteiros from "../components/FiltroRoteiros";
import TabelaRoteiros from "../components/TabelaRoteiros";

const disciplinas = ["Matemática", "Português", "Ciências", "História"];
const anos = [6, 7, 8, 9];

export default function Inicio() {
  const [disciplina, setDisciplina] = useState("");
  const [ano, setAno] = useState("");

  const encontrados = filtrarRoteiros(roteiros, disciplina, ano);

  return (
    <div>
      <h1>Encontre seu roteiro</h1>
      <FiltroRoteiros
        disciplinas={disciplinas}
        anos={anos}
        disciplina={disciplina}
        ano={ano}
        aoMudarDisciplina={setDisciplina}
        aoMudarAno={setAno}
      />
      <p>{encontrados.length} roteiro(s) encontrado(s):</p>
      <TabelaRoteiros roteiros={encontrados} />
    </div>
  );
}
