const DOMINIO = "@escola.educa.gov.br";
const UM_DIA = 1000 * 60 * 60 * 24;

export function diasEntre(dataInicial, dataFinal) {
  return (new Date(dataFinal) - new Date(dataInicial)) / UM_DIA;
}

export function formatarData(data) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return data.getFullYear() + "-" + mes + "-" + dia;
}
// transforma a data para o modelo brasileiro
export function dataBrasileira(texto) {
  const partes = texto.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

export function validarPedido(pedido, hoje) {
  const erros = {};

  if (pedido.nome.trim() === "") {
    erros.nome = "Informe o seu nome.";
  }

  const email = pedido.email.trim().toLowerCase();
  if (email === "") {
    erros.email = "Informe o seu e-mail institucional.";
  } else if (!email.endsWith(DOMINIO) || email.length === DOMINIO.length) {
    erros.email = "O e-mail precisa terminar em " + DOMINIO + ".";
  }

  if (pedido.disciplina === "") {
    erros.disciplina = "Escolha a disciplina.";
  }

  if (pedido.ano === "") {
    erros.ano = "Escolha o ano.";
  }

  if (pedido.tema.trim() === "") {
    erros.tema = "Informe o tema do roteiro.";
  }

  const questoes = Number(pedido.numeroQuestoes);
  if (pedido.numeroQuestoes === "") {
    erros.numeroQuestoes = "Escolha o número de questões.";
  } else if (questoes < 3 || questoes > 10) {
    erros.numeroQuestoes = "O número de questões precisa ser de 3 a 10.";
  }

  if (pedido.dataUso === "") {
    erros.dataUso = "Informe a data em que vai usar o roteiro.";
  } else if (diasEntre(hoje, pedido.dataUso) < 7) {
    erros.dataUso = "A data precisa ser pelo menos 7 dias depois de hoje, porque a revisão leva uma semana.";
  }

  return erros;
}
