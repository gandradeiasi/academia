function preencheCorpoPopUp(popup, conteudo_corpo) {
    var corpo = popup.querySelector('.pop-up-body');
    corpo.innerHTML = conteudo_corpo;
}

function inicializaPopPup(selector) {
    fechaTodosPopUps();
    pop_up = preencheEstruturaBasicaDoPopUp(selector);
    if (!pop_up) return;
    abrePopUp(pop_up);
    return pop_up;
}

function fechaTodosPopUps() {
    var pop_ups = document.querySelectorAll('.pop-up');
    pop_ups.forEach(function(popup) {
        popup.classList.remove('ativo');
    });
}

function preencheEstruturaBasicaDoPopUp(selector) {
    var pop_up = document.querySelector(selector);
    if (!selector) return alert('Pop-up não encontrado:', selector);

    pop_up.innerHTML = `
        <div class="pop-up-window">
            <div class="pop-up-header">
                <button class="fecha-pop-up">X</button>
            </div>
            <div class="pop-up-body"></div>
        </div>
    `;

    configuraBotaoFecharPopUp(pop_up);

    return pop_up
}

function configuraBotaoFecharPopUp(pop_up) {
    var botao_fechar = pop_up.querySelector('.fecha-pop-up');
    if (botao_fechar) botao_fechar.addEventListener('click', function() {
        fechaPopUp(pop_up);
    })
}

function fechaPopUp(pop_up) {
    pop_up.classList.remove('ativo');

}

function abrePopUp(pop_up) {
    pop_up.classList.add('ativo');
}