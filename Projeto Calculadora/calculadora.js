'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

/* variaveis de armazenamento */

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

/* configurando os calculos */

const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace('.', '').replace(',', '.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
};

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
    document.querySelector('#igual').focus();
};

/* atualizando display (div que configura os numeros que aparecem ao clicar ) */

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace('.', '').replace(',', '.'));
    }
};

/* definição dos operadores */
operadores.forEach((operador) =>
    operador.addEventListener('click', selecionarOperador)
);

const ativarIgual = () => {
    calcular();
    operador = undefined;
};
document.getElementById('igual').addEventListener('click', ativarIgual);

/* limpa os numeros ao apertar o botão "CE" */

const limparDisplay = () => (display.textContent = '');
document
    .getElementById('limparDisplay')
    .addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};
document
    .getElementById('limparCalculo')
    .addEventListener('click', limparCalculo);

const removerUltimoNumero = () =>
    (display.textContent = display.textContent.slice(0, -1));
document
    .getElementById('backspace')
    .addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (novoNumero) {
            atualizarDisplay('0,');
        } else {
            atualizarDisplay(',');
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal);

/* adicionando teclas permitidas num array */

const mapaTeclado = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'decimal',
};

/* lógica pra verificar se eu apertei a tecla num ao invés de uma aleatória (exemplo; B) */

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);





            /*  ids de todos os botões
                        <button id="limparDisplay">CE</button>
            <button id="limparCalculo">C</button>
            <button id="backspace">«</button>
            <button id="operadorDividir">/</button>
            <button id="tecla7">7</button>
            <button id="tecla8">8</button>
            <button id="tecla9">9</button>
            <button id="operadorMultiplicar">*</button>
            <button id="tecla4">4</button>
            <button id="tecla5">5</button>
            <button id="tecla6">6</button>
            <button id="operadorSubtrair">-</button>
            <button id="tecla1">1</button>
            <button id="tecla2">2</button>
            <button id="tecla3">3</button>
            <button id="operadorAdicionar">+</button>
            <button id="inverter">±</button>
            <button id="tecla0">0</button>
            <button id="decimal">,</button>
            <button id="igual">=</button> */