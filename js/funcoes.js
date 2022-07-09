function removeClasse(tag, classe){
    tag.classList.remove(classe);
}

function adicionaClasse(tag, classe){
    tag.classList.add(classe);
}

function alterarTexto(tag, texto){
    tag.textContent = texto;
}

function mudarAtributo(tag, atributo, valor){
    tag.setAttribute(atributo, valor);
}

function mudarCor(tag, valor){
    tag.style.color = valor;
}

function salvarMemoria(nome, objeto){
    return localStorage.setItem(nome, objeto);
}

function buscarMemoria(nome){
    return localStorage.getItem(nome)
}