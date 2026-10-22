import Link from "next/link";

export default function Cabecalho({ titulo }) {
  return (
    <header className="cabecalho">
      <Link href="/" className="cabecalho-titulo">
        {titulo}
      </Link>
      <nav>
        <Link href="/">Início</Link>
        <Link href="/pedido">Pedir roteiro</Link>
      </nav>
    </header>
  );
}
