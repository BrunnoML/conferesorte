document.addEventListener('DOMContentLoaded', () => {
console.log('DOM carregado, vinculando eventos...');

// Altere o título principal, se existir
const titulo = document.querySelector('h1');
if (titulo) {
  titulo.textContent = 'Quina de São João';
}

// Navegação com setas entre os campos de entrada
document.addEventListener("keydown", (event) => {
  const fields = document.querySelectorAll("input[type='number']");
  let currentIndex = -1;
  fields.forEach((field, index) => {
    if (document.activeElement === field) {
      currentIndex = index;
    }
  });
  if (currentIndex !== -1) {
    if (event.key === "ArrowLeft" && currentIndex > 0) {
      fields[currentIndex - 1].focus();
    } else if (event.key === "ArrowRight" && currentIndex < fields.length - 1) {
      fields[currentIndex + 1].focus();
    }
  }
});

// Adicionar eventos de input para todos os campos
document.querySelectorAll("input[type='number']").forEach(input => {
  input.addEventListener('input', buscarJogos);
});

// Evento do botão Limpar
const clearButton = document.getElementById('clear-button');
if (clearButton) {
  clearButton.addEventListener('click', () => {
    console.log('Botão Limpar clicado');
    limparCampos();
  });
} else {
  console.warn("Botão com ID 'clear-button' não encontrado no DOM.");
}

// Evento do botão Listar Todos os Jogos
const listAllGamesButton = document.getElementById('list-all-games-button');
if (listAllGamesButton) {
  listAllGamesButton.addEventListener('click', () => {
    console.log('Botão Listar Todos os Jogos clicado');
    listarTodosJogos();
  });
} else {
  console.warn("Botão com ID 'list-all-games-button' não encontrado no DOM.");
}
});

function buscarJogos() {
  // Obter dezenas do Sorteio (Quina)
  const sorteioInputs = [
    document.getElementById('sorteio-number1'),
    document.getElementById('sorteio-number2'),
    document.getElementById('sorteio-number3'),
    document.getElementById('sorteio-number4'),
    document.getElementById('sorteio-number5')
  ];
  const numerosDigitados = sorteioInputs
    .map(input => parseInt(input.value))
    .filter(num => !isNaN(num));

  const duques = [];
  const ternos = [];
  const quadras = [];
  const quinas = [];

  window.jogos.forEach(jogo => {
    if (numerosDigitados.length === 5) {
      const acertos = numerosDigitados.filter(num => jogo.numeros.includes(num)).length;
      if (acertos === 5) {
        quinas.push({ ...jogo, dezenasSorteio: numerosDigitados });
      } else if (acertos === 4) {
        quadras.push({ ...jogo, dezenasSorteio: numerosDigitados });
      } else if (acertos === 3) {
        ternos.push({ ...jogo, dezenasSorteio: numerosDigitados });
      } else if (acertos === 2) {
        duques.push({ ...jogo, dezenasSorteio: numerosDigitados });
      }
    }
  });

  atualizarResultados(duques, ternos, quadras, quinas);
}

function atualizarResultados(duques, ternos, quadras, quinas) {
  const duquesDiv = document.getElementById('duques');
  const ternosDiv = document.getElementById('ternos');
  const quadrasDiv = document.getElementById('quadras');
  const quinasDiv = document.getElementById('quinas');
  const totalDuquesDiv = document.getElementById('total-duques');
  const totalTernosDiv = document.getElementById('total-ternos');
  const totalQuadrasDiv = document.getElementById('total-quadras');

  if (duquesDiv) duquesDiv.innerHTML = '';
  if (ternosDiv) ternosDiv.innerHTML = '';
  if (quadrasDiv) quadrasDiv.innerHTML = '';
  if (quinasDiv) quinasDiv.innerHTML = '';
  if (totalDuquesDiv) totalDuquesDiv.textContent = 'Total de duques: 0';
  if (totalTernosDiv) totalTernosDiv.textContent = 'Total de ternos: 0';
  if (totalQuadrasDiv) totalQuadrasDiv.textContent = 'Total de quadras: 0';

  duques.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = formatarJogo(jogo, jogo.dezenasSorteio);
    if (duquesDiv) duquesDiv.appendChild(linha);
  });

  ternos.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = formatarJogo(jogo, jogo.dezenasSorteio);
    if (ternosDiv) ternosDiv.appendChild(linha);
  });

  quadras.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = formatarJogo(jogo, jogo.dezenasSorteio);
    if (quadrasDiv) quadrasDiv.appendChild(linha);
  });

  quinas.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = formatarJogo(jogo, jogo.dezenasSorteio);
    if (quinasDiv) quinasDiv.appendChild(linha);
  });

  if (totalDuquesDiv) totalDuquesDiv.textContent = `Total de duques: ${duques.length}`;
  if (totalTernosDiv) totalTernosDiv.textContent = `Total de ternos: ${ternos.length}`;
  if (totalQuadrasDiv) totalQuadrasDiv.textContent = `Total de quadras: ${quadras.length}`;

  atualizarMensagem(duques, ternos, quadras, quinas);
}

function formatarJogo(jogo, numerosDigitados) {
  const numerosFormatados = jogo.numeros.map(numero =>
    numerosDigitados.includes(numero)
      ? `<span class="highlight">${numero}</span>`
      : numero
  ).join(', ');
  return `<span class="jogo-id">Jogo ${jogo.numero_jogo+1} no volante ${Math.floor(jogo.numero_jogo / 2) + 1}: </span> ${numerosFormatados}`;
}

function atualizarMensagem(duques, ternos, quadras, quinas) {
  const resultMessage = document.getElementById('result-message');
  if (!resultMessage) return;

  if (quinas.length > 0) {
    resultMessage.textContent = "Espetacular!!! Acertamos a QUINA!!!!!!";
  } else if (quadras.length > 0) {
    resultMessage.textContent = "Maravilha!!! Acertamos QUADRA !!!";
  } else if (ternos.length > 0) {
    resultMessage.textContent = "Acertamos TERNO!";
  } else if (duques.length > 0) {
    resultMessage.textContent = "Acertamos DUQUE!";
  } else {
    resultMessage.textContent = "Não foi dessa vez.";
  }
}

function limparCampos() {
  console.log('Executando limparCampos');
  document.querySelectorAll("input[type='number']").forEach(input => input.value = '');
  const resultMessage = document.getElementById('result-message');
  if (resultMessage) resultMessage.textContent = "Calma que vai dar certo!! Quina de São João!";
  const duquesDiv = document.getElementById('duques');
  if (duquesDiv) duquesDiv.innerHTML = '';
  const ternosDiv = document.getElementById('ternos');
  if (ternosDiv) ternosDiv.innerHTML = '';
  const quadrasDiv = document.getElementById('quadras');
  if (quadrasDiv) quadrasDiv.innerHTML = '';
  const quinasDiv = document.getElementById('quinas');
  if (quinasDiv) quinasDiv.innerHTML = '';
  const allGamesDiv = document.getElementById('all-games');
  if (allGamesDiv) allGamesDiv.innerHTML = '';
}

function listarTodosJogos() {
  console.log('Executando listarTodosJogos');
  const allGamesDiv = document.getElementById('all-games');
  if (!allGamesDiv) {
    console.warn("Elemento com ID 'all-games' não encontrado no DOM.");
    return;
  }

  allGamesDiv.innerHTML = '';

  window.jogos.forEach(jogo => {
    const linha = document.createElement('div');
    linha.innerHTML = `<span class="jogo-id"> Jogo ${jogo.numero_jogo+1} no volante ${Math.floor(jogo.numero_jogo / 2) + 1}: </span> ${jogo.numeros.join(', ')}`;
    allGamesDiv.appendChild(linha);
  });
}