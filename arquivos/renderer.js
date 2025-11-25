
 let texto = document.getElementById('texto').value

function salvarArquivo() {
     
    window.api.salvarArquivo(texto.value).then((caminho) => {
        document.getElementById("caminho").innerHTML = `caminho: ${caminho}`
    })
}

function abrirArquivo() {
    window.api.abrirArquivo().then((conteudo) => {
        texto.value = conteudo
    })
}