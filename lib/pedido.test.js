import { test } from "node:test";
import assert from "node:assert";
import { validarPedido, diasEntre, formatarData, dataBrasileira } from "./pedido.js";

const HOJE = "2026-10-24";

function pedidoCerto() {
  return {
    nome: "Ana Paula Ferreira",
    email: "ana.ferreira@escola.educa.gov.br",
    disciplina: "Matemática",
    ano: "7",
    tema: "Números inteiros",
    numeroQuestoes: "5",
    dataUso: "2026-11-05",
  };
}

test("pedido completo e certo não tem erros", function () {
  assert.deepStrictEqual(validarPedido(pedidoCerto(), HOJE), {});
});

test("pedido vazio tem erro em todos os campos", function () {
  const vazio = { nome: "", email: "", disciplina: "", ano: "", tema: "", numeroQuestoes: "", dataUso: "" };
  const erros = validarPedido(vazio, HOJE);
  assert.strictEqual(Object.keys(erros).length, 7);
});

test("nome só com espaços conta como vazio", function () {
  const pedido = pedidoCerto();
  pedido.nome = "   ";
  assert.ok(validarPedido(pedido, HOJE).nome);
});

test("e-mail de outro domínio é recusado", function () {
  const pedido = pedidoCerto();
  pedido.email = "ana@gmail.com";
  assert.strictEqual(validarPedido(pedido, HOJE).email, "O e-mail precisa terminar em @escola.educa.gov.br.");
});

test("e-mail só com o domínio é recusado", function () {
  const pedido = pedidoCerto();
  pedido.email = "@escola.educa.gov.br";
  assert.ok(validarPedido(pedido, HOJE).email);
});

test("e-mail com letras maiúsculas é aceito", function () {
  const pedido = pedidoCerto();
  pedido.email = "Ana.Ferreira@Escola.Educa.Gov.Br";
  assert.strictEqual(validarPedido(pedido, HOJE).email, undefined);
});

test("2 e 11 questões são recusadas", function () {
  const pedido = pedidoCerto();
  pedido.numeroQuestoes = "2";
  assert.ok(validarPedido(pedido, HOJE).numeroQuestoes);
  pedido.numeroQuestoes = "11";
  assert.ok(validarPedido(pedido, HOJE).numeroQuestoes);
});

test("3 e 10 questões são aceitas", function () {
  const pedido = pedidoCerto();
  pedido.numeroQuestoes = "3";
  assert.strictEqual(validarPedido(pedido, HOJE).numeroQuestoes, undefined);
  pedido.numeroQuestoes = "10";
  assert.strictEqual(validarPedido(pedido, HOJE).numeroQuestoes, undefined);
});

test("data com 6 dias de antecedência é recusada", function () {
  const pedido = pedidoCerto();
  pedido.dataUso = "2026-10-30";
  assert.ok(validarPedido(pedido, HOJE).dataUso);
});

test("data com exatamente 7 dias de antecedência é aceita", function () {
  const pedido = pedidoCerto();
  pedido.dataUso = "2026-10-31";
  assert.strictEqual(validarPedido(pedido, HOJE).dataUso, undefined);
});

test("data no passado é recusada", function () {
  const pedido = pedidoCerto();
  pedido.dataUso = "2026-10-01";
  assert.ok(validarPedido(pedido, HOJE).dataUso);
});

test("conta os dias entre duas datas, inclusive virando o mês", function () {
  assert.strictEqual(diasEntre("2026-10-24", "2026-11-03"), 10);
});

test("formata a data no mesmo formato do campo de data", function () {
  assert.strictEqual(formatarData(new Date(2026, 9, 5)), "2026-10-05");
});

test("mostra a data no formato brasileiro", function () {
  assert.strictEqual(dataBrasileira("2026-11-05"), "05/11/2026");
});
