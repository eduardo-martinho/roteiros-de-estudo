"use client";

import { useState } from "react";

export default function QuestaoFixacao({ numero, pergunta, resposta }) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="questao">
      <p>
        {numero}. {pergunta}
      </p>
      <button onClick={() => setMostrar(!mostrar)}>{mostrar ? "Esconder resposta" : "Mostrar resposta"}</button>
      {mostrar && <p className="resposta">Resposta: {resposta}</p>}
    </div>
  );
}
