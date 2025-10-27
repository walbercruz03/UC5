function pegarnumero(){
    let conteudo = document.getElementById('numero').value
    document.getElementById('numero').value = ""

    if(conteudo >= 0){
        if(conteudo % 2 === 0){
            document.getElementById('Resultado').innerHTML = "O numero é positivo e par!"
        }
        else{
            document.getElementById('Resultado').innerHTML = "O numero é positivo e impar!"
        }
    }else{
        if(conteudo % 2 === 0){
            document.getElementById('Resultado').innerHTML = "O numero é negativo e par!"
        }
        else{
            document.getElementById('Resultado').innerHTML = "O numero é negativo e impar!"
        }

    }
    
}

function pegarnota(){
    
}


function pegarvalor(moeda){
    let operacao = Number(document.getElementById('valor').value)
    document.getElementById('valor').value
    let valor = Number (document.getElementById('valor').value)
    let resultado = 0

    if(!valor){
        document.getElementById('Converteu').innerText = "Digite um valor valido!"
        return;
    }
    const cotacoes = {
        dolar:5.424,
        euro:6.353,
        peso:0.0042,
        libra:7.326,
        franco:6.753

    }
    if(!cotacoes[moeda]){
        document.getElementById('Converteu').innerText = "Moeda invalida!"
        return;
    }
    resultado = valor/cotacoes[moeda]

    document.getElementById('Converteu').innerText =
    `${valor.toFixed(2)} Reais = ${resultado.toFixed(2)} ${moeda.toUpperCase()} `
     
}