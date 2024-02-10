render();

var botao_editar = document.querySelector("#editar");

botao_editar.addEventListener('click', abrePopUpEditar);



function abrePopUpEditar() {
    var pop_up_editar = inicializaPopPup("#pop-up-editar");

    if (!pop_up_editar) return;
    
    var lista_exercicios_inner_html = '';
    
    var dados = getData();

    dados.forEach(exercicio => {
        lista_exercicios_inner_html += `
            <li class="linha-exercicio">
                <p>${exercicio.nome}</p>
                <button data-funcao="editar-exercicio" data-nome="${exercicio.nome}">Editar</button>
                <button data-funcao="excluir-exercicio" data-nome="${exercicio.nome}">Excluir</button>
            </li>
        `;
    });

    return `<ul class="lista-exercicios">${lista_exercicios_inner_html}</ul>`;
}

function render() {
    var div_exercicios = document.querySelector('#div-exercicio');

    var proximo_exercicio = obtemProximoExercicio();

    if (!proximo_exercicio) {
        div_exercicios.innerHTML = `<div class="mensagem-sem-exercicio">Sem exercícios</div>`;
    }
    else {
        div_exercicios.innerHTML = `
            <div class="nome-exercicio">
                ${proximo_exercicio.nome}
            </div>
        `
    }
}

function obtemProximoExercicio() {
    var dados = ordenaExercicios();

    var data_atual = new Date();

    var exercícios_permitidos_hoje = dados.filter(function(exercicio) {
        return exercicio.data_permitida < data_atual;
    });

    return exercícios_permitidos_hoje[0];
}

function ordenaExercicios() {
    var dados = getData();

    var sorted_dados = dados.sort(function(a,b) {
        return a.ultima_vez - b.ultima_vez
    });

    saveDados(sorted_dados);

    return sorted_dados;
}

function saveDados(dados) {
    if (!dados) return alert('Dados foram passados de forma incorreta na hora de salvar');
    localStorage.dados = JSON.stringify(dados)
}

function getData() {
    var dados = localStorage.dados ? JSON.parse(localStorage.dados) : [];
    return dados;
}