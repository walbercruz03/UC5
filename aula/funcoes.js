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


function pegarvalor(){
    let operacao = Number(document.getElementById('valor').value)
    document.getElementById('valor').value
    let valor = Number (document.getElementById('valor').value)
    let resultado = 0

    if(!valor){
        document.getElementById('Converteu').innerText = "Digite um valor valido!"
        return;
    }
    const cotacoes = {
        dolar:
    }


}