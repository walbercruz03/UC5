import {app, BrowserWindow} from "electron"

function criarJanela(){
const janela = new BrowserWindow({
    width: 800,
    heigth: 800,
    title: "Exemplo - Aplicação Desktop"
})
janela.loadFile('calculadorahtml')

}

app.whenReady()
   .then(() => { 
    criarJanela()
    console.log ('Electron pronto!')
   })
   .catch((erro) => {
    console.error (erro)
   })