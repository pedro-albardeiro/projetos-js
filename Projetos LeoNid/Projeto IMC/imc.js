/* criação das variaveis e atribundo cada um de acordo com seu id no index.html */

const calcular = document.getElementById('calcular')


/* exemplo de como atribuir um valor a um elemento
nome.value = 'pedro';
*/

function imc () {
    /* exemplo de como fazer um alert após um click
    alert ('teste click');
    */
    const nome = document.getElementById('nome').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const resultado = document.getElementById('resultado');

    if (nome !== '' && altura !== '' && peso !== '') {
        
    const valorIMC = (peso / (altura * altura)).toFixed(2);
    
    let classificacao = "";

    if (valorIMC < 18.5) {
        classificacao = 'Parece O Vinicius'
    } else if (valorIMC < 25.3) {
        classificacao = 'Parece A Rebeca'
    } else if (valorIMC < 32.4) {
        classificacao = 'Parece um ulisses da vida'
    }
    


    resultado.textContent = `${nome} Seu IMC é ${valorIMC}, e sua classificação é ${classificacao}`; 


    } else {
        resultado.textContent = 'Preencha os campos, bicho burro.';
    }


}

/* ficar atento a quando um evento de click ocorrer, ele adiciona um evento (no caso no elemento calcular) */
calcular.addEventListener('click', imc)
