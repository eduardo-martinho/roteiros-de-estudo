"use client";

import { useState } from "react";
import { validarPedido, formatarData, dataBrasileira } from "../lib/pedido";

export default function FormularioPedido({ disciplinas, anos }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [ano, setAno] = useState("");
  const [tema, setTema] = useState("");
  const [numeroQuestoes, setNumeroQuestoes] = useState("");
  const [dataUso, setDataUso] = useState("");
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);

  const opcoesQuestoes = [3, 4, 5, 6, 7, 8, 9, 10];

  function enviar(evento) {
    evento.preventDefault();
    const pedido = { nome, email, disciplina, ano, tema, numeroQuestoes, dataUso };
    const novosErros = validarPedido(pedido, formatarData(new Date()));
    setErros(novosErros);
    setEnviado(Object.keys(novosErros).length === 0);
  }

  if (enviado) {
    return (
      <div className="sucesso">
        <p>Pedido conferido. Por enquanto ele não é enviado para a equipe.</p>
        <p>
          {nome} ({email}) pediu um roteiro de {disciplina} para o {ano}º ano sobre "{tema}", com {numeroQuestoes} questões, para usar em {dataBrasileira(dataUso)}.
        </p>
        <button onClick={() => setEnviado(false)}>Fazer outro pedido</button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="formulario">
      <div>
        <label htmlFor="nome">Nome do professor</label>
        <input id="nome" type="text" value={nome} onChange={(evento) => setNome(evento.target.value)} />
        {erros.nome && <p className="erro">{erros.nome}</p>}
      </div>

      <div>
        <label htmlFor="email">E-mail institucional</label>
        <input id="email" type="email" placeholder="nome@escola.educa.gov.br" value={email} onChange={(evento) => setEmail(evento.target.value)} />
        {erros.email && <p className="erro">{erros.email}</p>}
      </div>

      <div>
        <label htmlFor="disciplina">Disciplina</label>
        <select id="disciplina" value={disciplina} onChange={(evento) => setDisciplina(evento.target.value)}>
          <option value="">Selecione</option>
          {disciplinas.map((nomeDisciplina) => (
            <option key={nomeDisciplina} value={nomeDisciplina}>
              {nomeDisciplina}
            </option>
          ))}
        </select>
        {erros.disciplina && <p className="erro">{erros.disciplina}</p>}
      </div>

      <div>
        <label htmlFor="ano">Ano</label>
        <select id="ano" value={ano} onChange={(evento) => setAno(evento.target.value)}>
          <option value="">Selecione</option>
          {anos.map((numero) => (
            <option key={numero} value={numero}>
              {numero}º ano
            </option>
          ))}
        </select>
        {erros.ano && <p className="erro">{erros.ano}</p>}
      </div>

      <div>
        <label htmlFor="tema">Tema</label>
        <input id="tema" type="text" value={tema} onChange={(evento) => setTema(evento.target.value)} />
        {erros.tema && <p className="erro">{erros.tema}</p>}
      </div>

      <div>
        <label htmlFor="questoes">Número de questões (de 3 a 10)</label>
        <select id="questoes" value={numeroQuestoes} onChange={(evento) => setNumeroQuestoes(evento.target.value)}>
          <option value="">Selecione</option>
          {opcoesQuestoes.map((numero) => (
            <option key={numero} value={numero}>
              {numero}
            </option>
          ))}
        </select>
        {erros.numeroQuestoes && <p className="erro">{erros.numeroQuestoes}</p>}
      </div>

      <div>
        <label htmlFor="data">Data de uso (pelo menos 7 dias a partir de hoje)</label>
        <input id="data" type="date" value={dataUso} onChange={(evento) => setDataUso(evento.target.value)} />
        {erros.dataUso && <p className="erro">{erros.dataUso}</p>}
      </div>

      <button type="submit">Enviar pedido</button>
    </form>
  );
}
