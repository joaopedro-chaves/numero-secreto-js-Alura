let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Exibe o texto na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if (window.responsiveVoice) {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

// Exibe a mensagem inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

// Ativa/Desativa o botão chutar de acordo com o input, mas só se o jogo não tiver acabado
document.querySelector('input').addEventListener('input', function () {
    const botaoChutar = document.getElementById('chutar');
    const botaoreiniciar = document.getElementById('reiniciar');

    // Se o botão Novo Jogo estiver ativado, o jogo acabou, então mantemos o Chutar desativado
    if (botaoreiniciar.disabled) {
        botaoChutar.disabled = this.value === '';
    }
});

// Verifica o chute do jogador
function verificarChute() {
    let campoInput = document.querySelector('input');
    let chute = parseInt(campoInput.value);

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        document.querySelector('h1').classList.add('win-anim');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').disabled = false;
        document.getElementById('chutar').disabled = true;
        campoInput.disabled = true; // Desativa o input ao vencer

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D0BCFF', '#381E72', '#EADDFF']
        });
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
        campoInput.focus();
        document.getElementById('chutar').disabled = true;
    }
}

// Gera um número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Limpa o campo de input
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

// Reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').disabled = true;
    document.querySelector('input').disabled = false; // Reativa o input
    document.querySelector('h1').classList.remove('win-anim');
}

