import "./globals.css";
import Cabecalho from "../components/Cabecalho";

export const metadata = {
  title: "Roteiros de Estudo",
  description: "Roteiros de estudo gerados por IA e revisados por professores da rede municipal",
};

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho titulo="Roteiros de Estudo" />
        <main className="conteudo">{children}</main>
      </body>
    </html>
  );
}
