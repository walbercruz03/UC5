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