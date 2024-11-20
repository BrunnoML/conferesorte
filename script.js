/* Lista com os jogos (exemplo: substitua por sua lista de 20.000 jogos)
const jogos = [
  [5, 12, 23, 34, 45, 50, 56, 59, 60],
  [10, 12, 15, 23, 34, 50, 55, 58, 60],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 55, 44, 58],
  [1, 2, 3, 4, 5, 10, 11, 12, 13],
  [1, 2, 3, 4, 14, 15, 16, 17, 18],
  [1, 2, 3, 4, 5, 6, 19, 20, 21],
  // Adicione mais jogos...
];
*/

// Função para carregar o arquivo CSV
async function carregarJogosCSV() {
  const response = await fetch('jogos.csv');
  const data = await response.text();

  // Converter o CSV em uma lista de arrays
  const linhas = data.split('\n').map(linha => 
    linha.split(';').map(num => parseInt(num.trim()))
  );

  return linhas;
}

// Chamada para carregar os jogos ao iniciar
let jogos = [];
carregarJogosCSV().then(data => {
  jogos = data;
});

// Função para buscar e destacar
function buscarJogos() {
  const inputs = Array.from(document.querySelectorAll('input'));
  const numerosDigitados = inputs.map(input => parseInt(input.value)).filter(Boolean);

  const quadras = [];
  const quinas = [];
  const senas = [];

  jogos.forEach(jogo => {
    const acertos = numerosDigitados.filter(num => jogo.includes(num)).length;

    if (acertos >= 4) quadras.push(jogo); // Adicionar todos os jogos com 4+ acertos no campo de quadras
    if (acertos >= 5) quinas.push(jogo); // Adicionar todos os jogos com 5+ acertos no campo de quinas
    if (acertos === 6) senas.push(jogo); // Adicionar jogos com 6 acertos no campo de senas
  });

  atualizarResultados(quadras, quinas, senas, numerosDigitados);
}

// Função para exibir os resultados separados
function atualizarResultados(quadras, quinas, senas, numerosDigitados) {
  const quadrasDiv = document.getElementById('quadras');
  const quinasDiv = document.getElementById('quinas');
  const senasDiv = document.getElementById('senas');

  // Limpar os campos anteriores
  quadrasDiv.innerHTML = '';
  quinasDiv.innerHTML = '';
  senasDiv.innerHTML = '';

  // Atualizar quadras
  quadras.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = formatarJogo(jogo, numerosDigitados);
    quadrasDiv.appendChild(linha);
  });

  // Atualizar quinas
  quinas.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = formatarJogo(jogo, numerosDigitados);
    quinasDiv.appendChild(linha);
  });

  // Atualizar senas
  senas.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = formatarJogo(jogo, numerosDigitados);
    senasDiv.appendChild(linha);
  });

  atualizarMensagem(quadras, quinas, senas);
}

// Função para formatar um jogo e destacar os números coincidentes
function formatarJogo(jogo, numerosDigitados) {
  return jogo.map(numero => {
    return numerosDigitados.includes(numero)
      ? `<span class="highlight">${numero}</span>`
      : numero;
  }).join(', ');
}

// Função para atualizar a mensagem principal
function atualizarMensagem(quadras, quinas, senas) {
  const resultMessage = document.getElementById('result-message');

  if (senas.length > 0) {
    resultMessage.textContent = "Espetacular! Você acertou a SENA e está RICO!!!";
  } else if (quinas.length > 0) {
    resultMessage.textContent = "Maravilha! Está quase rico, você acertou a QUINA!!!";
  } else if (quadras.length > 0) {
    resultMessage.textContent = "Parabéns! Você acertou a QUADRA!!";
  } else {
    resultMessage.textContent = "Vai dar certo! Fé!!";
  }
}

// Função para limpar campos e resultados
function limparCampos() {
  document.querySelectorAll('input').forEach(input => input.value = '');
  document.getElementById('result-message').textContent = "Vai dar certo! Fé!!";
  document.getElementById('quadras').innerHTML = '';
  document.getElementById('quinas').innerHTML = '';
  document.getElementById('senas').innerHTML = '';
}

// Adicionar evento para cada campo de entrada
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', buscarJogos);
});

// Adicionar evento para o botão de limpar
document.getElementById('clear-button').addEventListener('click', limparCampos);
