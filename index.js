// Lista de taxas fictícias só para exemplo
const taxasDeCambio = {
  "Bitcoin": 588309.26,  // Exemplo: 1 real = 0.0000032 BTC
  "Dólar": 5.55,          // 1 USD = 5,55 R$
  "Euro": 6.25,           // 1 EUR = 6,25 R$
  "Libra": 7.10,          // 1 GBP = 7,10 R$
  "Real": 1               // 1 BRL = 1 BRL
};

const simbolosMoeda = {
  "Bitcoin": "₿",
  "Dólar": "US$",
  "Euro": "€",
  "Libra": "£",
  "Real": "R$"
};

let moedaEscolhida = null;

// Capturando os botões de moeda (as imagens dentro da seção .moedas)
document.querySelectorAll('.moeda img').forEach(img => {
  img.addEventListener('click', function() {
    moedaEscolhida = img.getAttribute('value');
    console.log('Moeda escolhida:', moedaEscolhida);

    const taxa = taxasDeCambio[moedaEscolhida];

    const textos1 = document.querySelectorAll('.texto1');
    textos1[0].innerText = `Moeda escolhida: ${moedaEscolhida}`;
    textos1[1].innerText = `Taxa de câmbio: ${taxa}`;

    const input = document.querySelector('input');
    input.value = '';  // Limpa o campo ao escolher nova moeda
    input.placeholder = `${simbolosMoeda[moedaEscolhida]} (${moedaEscolhida})`;
  });
});

// Função de máscara de moeda (formatação ao digitar)
function formatarMoeda(valor) {
  // Troca vírgula por ponto para tratar decimal no parseFloat

  switch (moedaEscolhida) {
    case 'Real':
      return valorFloat.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    case 'Dólar':
      return valorFloat.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    case 'Euro':
      return valorFloat.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    case 'Libra':
      return valorFloat.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
    case 'Bitcoin':
      return valorFloat.toFixed(8) + ' BTC';
    default:
      return valorFloat.toFixed(2);
  }
}

// Aplica a máscara enquanto digita
const input = document.querySelector('input');
input.addEventListener('input', function() {
  const cursorPos = input.selectionStart;
  const valorFormatado = formatarMoeda(input.value);
  input.value = valorFormatado;
  input.setSelectionRange(cursorPos, cursorPos);  // Mantém o cursor no lugar
});


function parseInput(valor) {
  let valorLimpo = valor.replace(/[^0-9,.-]/g, '');

  let partes = valorLimpo.split(',');
  if (partes.length > 2) {
    valorLimpo = partes.slice(0, -1).join('') + '.' + partes[partes.length - 1];
  } else {
    valorLimpo = valorLimpo.replace(',', '.');
  }

  return parseFloat(valorLimpo);
}

document.querySelector('button').addEventListener('click', function() {
  const inputValor = document.querySelector('input').value;

  if (!moedaEscolhida) {
    alert('Escolha uma moeda antes de converter.');
    return;
  }

  const valor = parseInput(inputValor);
  const taxa = taxasDeCambio[moedaEscolhida];

  if (isNaN(valor)) {
    alert('Digite um valor numérico válido.');
    return;
  }

  const valorConvertido = valor * taxa;

  const textos2 = document.querySelectorAll('.texto2');
  textos2[0].innerText = `Valor convertido para Real (BRL):`;
  textos2[1].innerText = valorConvertido.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
});
function apertarBotao() { //evento adioconado
  const botao = document.querySelector('button')
  document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter'){
    botao.click();
  }

  })};
  apertarBotao()

