const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

// Função que valida o valor do input quando há uma alteração (evento 'input')
const validateInput = ({ target }) => {
    // Verifica se o comprimento do valor no input é maior que 3
    if (target.value.length > 3) {
        // Remove o atributo 'disabled' do botão se a condição for verdadeira
        button.removeAttribute('disabled');
        return;
    }

    // Adiciona o atributo 'disabled' ao botão se a condição não for verdadeira
    button.setAttribute('disabled', '');
}

// Função que manipula o envio do formulário
const handleSubmit = (event) => {
    // Previne o comportamento padrão de envio do formulário, que é recarregar a página
    event.preventDefault();

    // Armazena o valor do input na localStorage com a chave 'player'
    localStorage.setItem('player', input.value);
    // Redireciona o usuário para a página 'game.html'
    window.location = 'pages/game.html';
}

// Adiciona um ouvinte de evento para o evento 'input' no elemento de input, chamando a função validateInput
input.addEventListener('input', validateInput);

// Adiciona um ouvinte de evento para o evento 'submit' no formulário, chamando a função handleSubmit
form.addEventListener('submit', handleSubmit);