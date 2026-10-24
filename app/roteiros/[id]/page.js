import Link from "next/link";
import { notFound } from "next/navigation";
import roteiros from "../../../dados/roteiros.json";
import professores from "../../../dados/professores.json";
import { buscarRoteiro, buscarProfessor } from "../../../lib/roteiros";
import AvisoIA from "../../../components/AvisoIA";
import QuestaoFixacao from "../../../components/QuestaoFixacao";
import TextoApoio from "../../../components/TextoApoio";

export function generateStaticParams() {
  return roteiros.map((roteiro) => ({ id: roteiro.id }));
}

export const dynamicParams = false;

export default async function PaginaRoteiro({ params }) {
  const { id } = await params;
  const roteiro = buscarRoteiro(roteiros, id);

  if (!roteiro) {
    notFound();
  }

  const professor = buscarProfessor(professores, roteiro.professorId);

  return (
    <div>
      <Link href="/">&lt;- Voltar ao início</Link>
      <h1>{roteiro.titulo}</h1>
      <p>
        {roteiro.tema} · {roteiro.disciplina} · {roteiro.ano}º ano · {roteiro.tempoMinutos} min de estudo
      </p>
      <AvisoIA professor={professor} />

      <h2>Explicação</h2>
      <p>{roteiro.explicacao}</p>

      <h2>Questões para treino</h2>
      {roteiro.questoes.map((questao, indice) => (
        <QuestaoFixacao key={indice} numero={indice + 1} pergunta={questao.pergunta} resposta={questao.resposta} />
      ))}

      <TextoApoio artigo={roteiro.artigoWikipedia} />
    </div>
  );
}
