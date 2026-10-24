import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <div>
      <h1>Roteiro não encontrado</h1>
      <p>Esse roteiro não existe ou saiu do ar.</p>
      <Link href="/">Voltar ao início</Link>
    </div>
  );
}
