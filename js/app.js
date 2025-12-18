// Array onde serão armazenados os nomes dos amigos
let amigos = [];

function adicionar() {
    // Captura o nome digitado e remove espaços extras
    let amigo = document.getElementById('nome-amigo').value.trim();
    let listaAmigos = document.getElementById('lista-amigos');

    // Regex para permitir apenas letras (com acentos) e espaços
    const somenteLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    // 🔹 converte o nome inserido para minúsculas
    let amigoLower = amigo.toLowerCase();

    // 🔹 converte os nomes armazenados para minúsculas e verifica duplicado
    if (amigos.some(nome => nome.toLowerCase() === amigoLower)) {
        alert(`${amigo} já está participando do nosso sorteio. Digite outro nome!`);
        return;
    }

    // --- Verifica nome vazio ou inválido ---
    if (amigo === '' || !somenteLetras.test(amigo)) {
        alert('Digite um nome válido para o sorteio!');
        return;
    }

    // --- Adiciona o nome ao array ---
    amigos.push(amigo);

    // --- Mostra visualmente na lista ---
    if (listaAmigos.textContent === '') {
        listaAmigos.textContent = amigo;
    } else {
        listaAmigos.textContent = listaAmigos.textContent + ', ' + amigo;
    }

    limparCampo();
}

function limparCampo() {
    document.getElementById('nome-amigo').value = "";
}

function embaralha(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] =
            [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function sortear() {
    if (amigos.length < 4) {
        alert('Adicione pelo menos 4 amigos!');
        return;
    }

    embaralha(amigos);

    let listaSorteio = document.getElementById('lista-sorteio');

    for (let i = 0; i < amigos.length; i++) {
        if (i == amigos.length - 1) {
            listaSorteio.innerHTML += amigos[i] + ' --> ' + amigos[0] + '<br>';
        } else {
            listaSorteio.innerHTML += amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
        }
    }
}

function reiniciar() {
    amigos = [];
    document.getElementById('lista-amigos').innerHTML = "";
    document.getElementById('lista-sorteio').innerHTML = "";
}

document.getElementById('nome-amigo').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        adicionar();
    }
});
