function cadastrar(tag){
    if(estadoAtual != estados.cadastro){
        estadoAtual = estados.cadastro;
        alterarTexto(tag, "Inicio");
        alterarTexto(botaoProximo, "Cadastrar");

    }else if(estadoAtual == estados.cadastro){
        estadoAtual = estados.nome;
        alterarTexto(tag, "Cadastrar");
        alterarTexto(botaoProximo, "Próximo");
    }
    adicionaClasse(aviso, "invisivel");
    trocarPagina();
}