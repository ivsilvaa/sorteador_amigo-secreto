// Array onde serão armazenados os nomes dos amigos
let amigos = [];

function adicionar() {
    // Captura o nome digitado e remove espaços extras
    let amigo = document.getElementById('nome-amigo').value.trim();
    let listaAmigos = document.getElementById('lista-amigos');

    // Regex para permitir apenas letras (com acentos) e espaços
    const somenteLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    // --- Verifica se o nome já existe no array ---
    if (amigos.includes(amigo)) {
        alert(`${amigo} já está participando do nosso sorteio. Digite outro nome!`);
        return; // interrompe a função
    }

    // --- Verifica nome vazio ou contendo caracteres inválidos ---
    if (amigo === '' || !somenteLetras.test(amigo)) {
        alert('Digite um nome válido para o sorteio!');
        return;
    }

    // --- Adiciona o nome ao array ---
    amigos.push(amigo);

    // --- Mostra visualmente na lista da página ---
    if (listaAmigos.textContent === '') {
        listaAmigos.textContent = amigo;
    } else {
        listaAmigos.textContent = listaAmigos.textContent + ', ' + amigo;
    }

    // Limpa input após adicionar
    limparCampo();
}

function limparCampo() {
    // Limpa o campo do formulário
    document.getElementById('nome-amigo').value = "";
}

function embaralha(lista) {
    // Algoritmo Fisher-Yates para embaralhar a lista
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);

        // Troca de posições usando destructuring
        [lista[indice - 1], lista[indiceAleatorio]] = 
        [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function sortear() {
    // Exige ao menos 4 nomes antes de sortear
    if (amigos.length < 4) {
        alert('Adicione pelo menos 4 amigos!');
        return;
    }

    // Embaralha a lista de participantes
    embaralha(amigos);

    let listaSorteio = document.getElementById('lista-sorteio');

    // Percorre todos os participantes criando pares
    for (let i = 0; i < amigos.length; i++) {

        // O último da lista tira o primeiro → ciclo fechado
        if (i == amigos.length - 1) {
            listaSorteio.innerHTML += amigos[i] + ' --> ' + amigos[0] + '<br>';
        } else {
            // Os demais tiram o próximo da lista
            listaSorteio.innerHTML += amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
        }
    }
}

function reiniciar() {
    // Reseta array e apaga conteúdos visuais
    amigos = [];
    document.getElementById('lista-amigos').innerHTML = "";
    document.getElementById('lista-sorteio').innerHTML = "";
}
