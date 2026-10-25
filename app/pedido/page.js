import Link from "next/link";
import FormularioPedido from "../../components/FormularioPedido";

const disciplinas = ["Matemática", "Português", "Ciências", "História"];
const anos = [6, 7, 8, 9];

export default function PaginaPedido() {
  return (
    <div>
      <Link href="/">&lt;- Voltar ao início</Link>
      <h1>Pedir roteiro novo</h1>
      <p>Todos os campos são obrigatórios.</p>
      <FormularioPedido disciplinas={disciplinas} anos={anos} />
    </div>
  );
}
