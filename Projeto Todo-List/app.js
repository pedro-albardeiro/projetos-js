"use strict";

// indica o modo estrito do javascript para evitar erros comuns, como variáveis não declaradas.

let banco = [];

// declara um array vazio que armazenará temporariamente as tarefas.

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
// recupera a lista de tarefas armazenada no localstorage ou retorna um array vazio caso não exista.

const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));
// salva a lista de tarefas no localstorage após convertê-la para string.

// end banco

const criarItem = (tarefa, status, indice) => {
    // cria um item de tarefa com base nos parâmetros fornecidos e o adiciona ao documento.
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    // remove todas as tarefas exibidas na tela.
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    // atualiza a tela com a lista atualizada de tarefas.
    limparTarefas();
    const banco = getBanco(); 
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    // adiciona uma nova tarefa ao pressionar a tecla enter.
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    // remove a tarefa com base no índice fornecido.
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    // alterna o status da tarefa entre marcada e desmarcada.
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    // trata eventos de clique para remover ou atualizar uma tarefa.
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
// adiciona um evento para capturar a tecla pressionada no campo de entrada.

document.getElementById('todoList').addEventListener('click', clickItem);
// adiciona um evento para capturar cliques na lista de tarefas.

atualizarTela(); // inicia a aplicação com a lista atualizada de tarefas.
