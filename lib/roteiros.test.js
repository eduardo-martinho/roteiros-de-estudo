import { test } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { filtrarRoteiros, buscarRoteiro, buscarProfessor } from "./roteiros.js";

const roteiros = [
  { id: "fracoes", disciplina: "Matemática", ano: 6, professorId: 1 },
  { id: "pitagoras", disciplina: "Matemática", ano: 8, professorId: 1 },
  { id: "fotossintese", disciplina: "Ciências", ano: 7, professorId: 2 },
];

const professores = [
  { id: 1, nome: "Professora de Matemática" },
  { id: 2, nome: "Professora de Ciências" },
];

test("sem filtro mostra todos os roteiros", function () {
  assert.strictEqual(filtrarRoteiros(roteiros, "", "").length, 3);
});

test("filtra pela disciplina", function () {
  const resultado = filtrarRoteiros(roteiros, "Matemática", "");
  assert.strictEqual(resultado.length, 2);
});

test("filtra pelo ano vindo do select como texto", function () {
  const resultado = filtrarRoteiros(roteiros, "", "7");
  assert.strictEqual(resultado.length, 1);
  assert.strictEqual(resultado[0].id, "fotossintese");
});

test("filtra pela disciplina e pelo ano juntos", function () {
  const resultado = filtrarRoteiros(roteiros, "Matemática", "8");
  assert.strictEqual(resultado.length, 1);
  assert.strictEqual(resultado[0].id, "pitagoras");
});

test("filtro sem resultado devolve lista vazia", function () {
  assert.strictEqual(filtrarRoteiros(roteiros, "Ciências", "9").length, 0);
});

test("busca o roteiro pelo id", function () {
  assert.strictEqual(buscarRoteiro(roteiros, "fracoes").ano, 6);
});

test("roteiro inexistente devolve undefined", function () {
  assert.strictEqual(buscarRoteiro(roteiros, "nao-existe"), undefined);
});

test("busca o professor que revisou o roteiro", function () {
  const professor = buscarProfessor(professores, roteiros[2].professorId);
  assert.strictEqual(professor.nome, "Professora de Ciências");
});

test("os dados reais têm pelo menos 6 roteiros e todo roteiro tem um professor que existe", function () {

  const roteirosReais = JSON.parse(readFileSync("dados/roteiros.json", "utf-8"));
  const professoresReais = JSON.parse(readFileSync("dados/professores.json", "utf-8"));
  assert.ok(roteirosReais.length >= 6);
  for (const roteiro of roteirosReais) {
    assert.ok(buscarProfessor(professoresReais, roteiro.professorId), "roteiro sem professor: " + roteiro.id);
    assert.ok(roteiro.questoes.length >= 3, "roteiro com menos de 3 questões: " + roteiro.id);
  }
});
