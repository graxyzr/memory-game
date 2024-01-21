const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'ellie',
    'joel',
    'dina',
    'tommy',
    'jesse',
    'abby',
    'lev',
    'yara',
    'owen',
    'mel',
];

// Função auxiliar para criar elementos HTML com a tag e classe especificadas
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Variáveis para armazenar as duas cartas selecionadas durante o jogo
let firstCard = '';
let secondCard = '';

// Função para verificar se todas as cartas foram desabilitadas, indicando o fim do jogo
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

// Função para verificar se as duas cartas viradas correspondem
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        // Desabilita as duas cartas se corresponderem
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        // Verifica se todas as cartas foram desabilitadas, indicando o fim do jogo
        checkEndGame();

    } else {
        // Esconde as cartas se não corresponderem após um curto intervalo
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }

}

// Função para revelar uma carta ao clicar nela
const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        // Se a primeira carta ainda não foi selecionada, a torna visível
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        // Se a segunda carta ainda não foi selecionada, a torna visível e verifica a correspondência
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

// Função para criar uma carta com um personagem específico
const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    // Define a imagem de fundo da face frontal da carta com base no personagem
    front.style.backgroundImage = `url('../img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    // Adiciona um ouvinte de evento de clique para revelar a carta
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

// Função para carregar o jogo, duplicando os personagens, embaralhando e adicionando ao grid
const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    // Embaralha o array de personagens duplicados
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    // Para cada personagem embaralhado, cria uma carta e a adiciona ao grid
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

// Função para iniciar o timer do jogo
const startTimer = () => {
    // Inicia um intervalo que incrementa o tempo a cada segundo
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

// Função a ser executada quando a janela é totalmente carregada
window.onload = () => {
    // Obtém o nome do jogador da localStorage e exibe no elemento 'player'
    spanPlayer.innerHTML = localStorage.getItem('player');

    // Inicia o timer e carrega o jogo
    startTimer();
    loadGame();
}