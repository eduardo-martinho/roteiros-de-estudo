"use client";

import { useState } from "react";

export default function TextoApoio({ artigo }) {
  const [estado, setEstado] = useState("inicio");
  const [texto, setTexto] = useState("");

  async function carregar() {
    setEstado("carregando");
    try {
      const resposta = await fetch("https://pt.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(artigo));
      if (!resposta.ok) {
        setEstado("erro");
        return;
      }
      const dados = await resposta.json();
      setTexto(dados.extract);
      setEstado("sucesso");
    } catch (erro) {
      setEstado("erro");
    }
  }

  return (
    <div className="texto-apoio">
      <h2>Texto de apoio (Wikipédia)</h2>

      {estado === "inicio" && <button onClick={carregar}>Carregar texto de apoio</button>}

      {estado === "carregando" && <p>Carregando texto de apoio...</p>}

      {estado === "erro" && (
        <div>
          <p>Não deu para carregar o texto de apoio. O roteiro continua acima.</p>
          <button onClick={carregar}>Tentar novamente</button>
        </div>
      )}

      {estado === "sucesso" && (
        <div>
          <p>{texto}</p>
          <a href={"https://pt.wikipedia.org/wiki/" + encodeURIComponent(artigo)} target="_blank">
            Ler o artigo completo na Wikipédia
          </a>
        </div>
      )}
    </div>
  );
}
