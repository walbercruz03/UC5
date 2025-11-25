import { BrowserWindow, app } from "electron"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let janela = null 

const criarJanela = () => {
    janela = new BrowserWindow({
        titlte: "Aplicação desktop",
        heigth: 600,
        width: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false

}
    })
janela.removeMenu()
// janela.webContents.openDevTools()
janela.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
    lerArquivo()
    criarJanela()
})

let dados = []

function  escreverArquivo(){
    try{
    fs.writeFileSync(__dirname,'arquivo.txt', 'Escrevendo', 'utf-8')
    } catch (err){
        console.error('Erro ao escrever o arquivo:', err)
    }
}

function lerArquivo(){
    try{
    let conteudo = fs.readFileSync(arquivo, 'utf-8')
    console.log('caminho do arquivo:',aqruivo,'\n')
    console.log('Conteúdo do arquivo:', conteudo)
    }catch (err){
        console.error('Erro ao ler o arquivo:', err)
    }
}
