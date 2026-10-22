export const metadata = {
  title: "Roteiros de Estudo",
  description: "Roteiros de estudo gerados por IA e revisados por professores da rede municipal",
};

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
