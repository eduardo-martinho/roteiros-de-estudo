export default function FiltroRoteiros({ disciplinas, anos, disciplina, ano, aoMudarDisciplina, aoMudarAno }) {
  return (
    <div className="filtro">
      <label>
        Disciplina:{" "}
        <select value={disciplina} onChange={(evento) => aoMudarDisciplina(evento.target.value)}>
          <option value="">Todas</option>
          {disciplinas.map((nome) => (
            <option key={nome} value={nome}>
              {nome}
            </option>
          ))}
        </select>
      </label>
      <label>
        Ano:{" "}
        <select value={ano} onChange={(evento) => aoMudarAno(evento.target.value)}>
          <option value="">Todos</option>
          {anos.map((numero) => (
            <option key={numero} value={numero}>
              {numero}º ano
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
