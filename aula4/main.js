import { app, BrowserWindow, ipcMain } from "electron"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow
let historicoOperacoes = []

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    mainWindow.loadFile("index.html")
}

function createHistoryWindow() {
    const historyWindow = new BrowserWindow({
        width: 300,
        height: 400,
        title: "Histórico",
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    historyWindow.loadFile("historico.html")

    historyWindow.webContents.once("dom-ready", () => {
        historyWindow.webContents.send("dados-historico", historicoOperacoes)
    })
}

ipcMain.on("abrir-historico", () => {
    console.log("Evento abrir-historico recebido");
    createHistoryWindow();
})

ipcMain.on("add-historico", (_e, valor) => {
    console.log("Evento add-historico recebido", valor);
    historicoOperacoes.push(valor)
})

app.whenReady().then(createWindow)