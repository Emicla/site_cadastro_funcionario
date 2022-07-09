let formulario = document.querySelector("#formulario");
let divConteiner = document.querySelector("#div-conteiner");
let divEntradas = document.querySelector("#div_trocar");
let labelNome = document.querySelector("#texto_nome");
let input = document.querySelector("#input");
let botaoProximo = document.querySelector("#botao-proximo");
let aviso = document.querySelector(".aviso");

let estados = {
    nome: 0,
    concluido: 1,
    cadastro: 2
};

let estadoAtual = 0;

let frase;

let diaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];

formulario.addEventListener("submit", function(e){
    e.preventDefault();

});

function verificaInf(nome){
    let infArmazenada = JSON.parse(buscarMemoria(nome));

    if(infArmazenada != null){
        let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth();
        let horas = String(data.getHours()) + " : " + String(data.getMinutes());

        if(dia < 10 && mes < 10){
            dia = "0" + String(dia);
            mes = "0" + String(mes);

        }else if(dia < 10){
            dia = "0" + String(dia);

        }else if(mes < 10){
            mes = "0" + String(mes);
        }

        data = dia + " / " + mes + " / " + String(data.getFullYear()) + " - " + diaSemana[data.getDay()];

        if(infArmazenada.datas.length == infArmazenada.entrada.length && infArmazenada.datas.length == infArmazenada.saida.length){
            infArmazenada.datas.push(data);
            infArmazenada.entrada.push(horas);
            frase = "Entrada Registrada com sucesso";

        }else if(infArmazenada.datas[infArmazenada.datas.length - 1] != data && infArmazenada.entrada.length > infArmazenada.saida.length){
            infArmazenada.datas.push(data);
            infArmazenada.entrada.push(horas);
            infArmazenada.saida.push("NÃO REGISTRADO");

        }else if(infArmazenada.entrada.length > infArmazenada.saida.length){
            infArmazenada.saida.push(horas);
            frase = "Saída Registrada com sucesso";

        }else{
            infArmazenada.entrada.push(horas);
            frase = "Entrada Registrada com sucesso";
        }
        console.log(infArmazenada);
        estadoAtual++;
        salvarMemoria(nome, JSON.stringify(infArmazenada));
        trocarPagina();
    }else{
        console.log("Não encontrado");
        removeClasse(aviso, "invisivel");
        alterarTexto(aviso, "Nome não encontrado");
        mudarCor(aviso, "#FF0000");
    }
}

function trocarPagina(){
    console.log("Estado = " + estadoAtual);
    if(estadoAtual == estados.nome){
        removeClasse(divEntradas, "invisivel");
        alterarTexto(labelNome, "Nome:");
        alterarTexto(botaoProximo, "Próximo");
        removeClasse(botaoProximo, "invisivel");
        mudarAtributo(input, "type", "text");
        adicionaClasse(aviso, "invisivel");

    }else if(estadoAtual == estados.concluido){
        removeClasse(aviso, "invisivel");
        alterarTexto(aviso, frase);
        mudarCor(aviso, "rgb(6, 226, 255)");
        adicionaClasse(divEntradas, "invisivel");
        alterarTexto(botaoProximo, "Voltar");

    }else if(estadoAtual == estados.cadastro){
        alterarTexto(labelNome, "Novo Cadastro:");
        mudarAtributo(input, "type", "text");
        removeClasse(divEntradas, "invisivel");
        removeClasse(botaoProximo, "invisivel");
        input.value = "";
    }
}

function proximaPagina(evento){
    if(estadoAtual == estados.cadastro){
        let horarios = {
            datas: [],
            entrada: [],
            saida: []
        };
        salvarMemoria(input.value, JSON.stringify(horarios));
        removeClasse(aviso, "invisivel");
        mudarCor(aviso, "#00FF00");
        alterarTexto(aviso, "Nome armazenado com sucesso");
        nomesArmazenado = buscarMemoria("Nomes");
        if(nomesArmazenado != null){
            nomesArmazenado = nomesArmazenado + ", " + input.value;
            salvarMemoria("Nomes", nomesArmazenado);
        }else{
            salvarMemoria("Nomes", input.value);
        }
        input.value = "";

    }else if(estadoAtual == estados.nome){
        verificaInf(input.value);

    }else if(estadoAtual == estados.concluido){
        estadoAtual = estados.nome;
        trocarPagina();
    }
}