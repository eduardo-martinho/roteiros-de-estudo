export default function AvisoIA({ professor }) {
  return (
    <p className="aviso-ia">
      Roteiro gerado por inteligência artificial. Revisado por Prof. {professor.nome}, {professor.disciplina}, {professor.escola}.
    </p>
  );
}
