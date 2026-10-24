import Link from "next/link";

export default function TabelaRoteiros({ roteiros }) {
  if (roteiros.length === 0) {
    return <p className="aviso">Nenhum roteiro para essa disciplina e ano.</p>;
  }

  return (
    <div className="tabela-caixa">
      <table className="tabela">
        <thead>
          <tr>
            <th>Título do roteiro</th>
            <th>Tema</th>
            <th>Disciplina</th>
            <th>Ano</th>
            <th>Tempo de estudo</th>
          </tr>
        </thead>
        <tbody>
          {roteiros.map((roteiro) => (
            <tr key={roteiro.id}>
              <td>
                <Link href={"/roteiros/" + roteiro.id}>{roteiro.titulo}</Link>
              </td>
              <td>{roteiro.tema}</td>
              <td>{roteiro.disciplina}</td>
              <td>{roteiro.ano}º ano</td>
              <td>{roteiro.tempoMinutos} min</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
