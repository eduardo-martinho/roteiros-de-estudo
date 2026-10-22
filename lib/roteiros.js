
export function filtrarRoteiros(roteiros, disciplina, ano) {
  return roteiros.filter(function (roteiro) {
    const disciplinaCerta = disciplina === "" || roteiro.disciplina === disciplina;
    const anoCerto = ano === "" || roteiro.ano === Number(ano);
    return disciplinaCerta && anoCerto;
  });
}
export function buscarRoteiro(roteiros, id) {
  return roteiros.find(function (roteiro) {
    return roteiro.id === id;
  });
}

export function buscarProfessor(professores, id) {
  return professores.find(function (professor) {
    return professor.id === id;
  });
}
