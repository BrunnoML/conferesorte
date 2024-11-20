// Lista com os jogos (exemplo: substitua por sua lista de 20.000 jogos)
const jogos = [
  [5, 12, 23, 34, 45, 50, 56, 59, 60],
  [10, 12, 15, 23, 34, 50, 55, 58, 60],
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // Adicione mais jogos...
];

// Função para buscar e destacar
function buscarJogos() {
  const inputs = Array.from(document.querySelectorAll('input'));
  const numerosDigitados = inputs.map(input => parseInt(input.value)).filter(Boolean);

  const resultados = jogos.filter(jogo =>
    numerosDigitados.every(num => jogo.includes(num))
  );

  exibirResultados(resultados, numerosDigitados);
  atualizarMensagem(resultados, numerosDigitados);
}

// Função para exibir os resultados
function exibirResultados(resultados, numerosDigitados) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Limpar resultados anteriores

  resultados.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = jogo.map(numero => {
      return numerosDigitados.includes(numero)
        ? `<span class="highlight">${numero}</span>`
        : numero;
    }).join(', ');
    resultsDiv.appendChild(linha);
  });
}
// Função para atualizar a mensagem
function atualizarMensagem(resultados, numerosDigitados) {
  const resultMessage = document.getElementById('result-message');
  let maxAcertos = 0;

// Contar coincidências apenas nos números destacados em verde escuro
  resultados.forEach(jogo => {
    const acertos = numerosDigitados.filter(num => jogo.includes(num)).length;
    if (acertos >= 4) {
      maxAcertos = Math.max(maxAcertos, acertos); // Atualiza o maior número de acertos
    }
  });
  
// Atualizar a mensagem com base no número de dezenas coincidentes
  switch (maxAcertos) {
    case 6:
      resultMessage.textContent = "Espetacular! Você acertou a SENA e está RICO!!!";
      break;
    case 5:
      resultMessage.textContent = "Maravilha! Está quase rico, você acertou a QUINA!!!";
      break;
    case 4:
      resultMessage.textContent = "Parabéns! Você acertou a QUADRA!!";
      break;
    default:
      resultMessage.textContent = "Vai dar certo! Fé!!";
  }
}

// Função para limpar campos e resultados
function limparCampos() {
  document.querySelectorAll('input').forEach(input => input.value = '');
  document.getElementById('results').innerHTML = '';
  document.getElementById('result-message').textContent = "Vai dar certo! Fé!!";
}

// Adicionar evento para cada campo de entrada
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', buscarJogos);
});

// Adicionar evento para o botão de limpar
document.getElementById('clear-button').addEventListener('click', limparCampos);