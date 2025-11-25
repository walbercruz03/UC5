import { app, BrowserWindow, nativeTheme, ipcMain, Menu, dialog, Notification } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow
let cadastroWindow


//  CAMINHO DO ARQUIVO usuarios.json
const caminhoUsuarios = path.join(__dirname, "usuarios.json")

// Se o arquivo não existir, cria um vazio
if (!fs.existsSync(caminhoUsuarios)) {
    fs.writeFileSync(caminhoUsuarios, JSON.stringify([]))
}

// Função para carregar os usuários
function carregarUsuarios() {
    return JSON.parse(fs.readFileSync(caminhoUsuarios, "utf8"))
}

// Função para salvar os usuários
function salvarUsuarios(usuarios) {
    fs.writeFileSync(caminhoUsuarios, JSON.stringify(usuarios, null, 2))
}

// Carrega usuários ao iniciar
let usuarios = carregarUsuarios()


//  JANELA DE LOGIN

function createLoginWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        }
    })
    mainWindow.loadFile("index.html")
}


//  JANELA DE CADASTRO

function createCadastroWindow() {
    cadastroWindow = new BrowserWindow({
        width: 400,
        height: 500,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        }
    })
    cadastroWindow.loadFile('index2.html')
}

// ---------------------------------------
app.whenReady().then(createLoginWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


//  ABRIR JANELA DE CADASTRO

ipcMain.on('abrir-cadastro', () => {
    createCadastroWindow()
})


//  LOGIN SUCESSO — APENAS POPUP

ipcMain.on('login-sucesso', () => {
    dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Login',
        message: 'Login realizado com sucesso!'
    })
})


//  CADASTRO — AGORA SALVA NO JSON

ipcMain.on('cadastro-usuario', (event, usuario) => {
    usuarios.push(usuario)
    salvarUsuarios(usuarios)

    console.log("Usuário cadastrado:", usuarios)

    dialog.showMessageBox(cadastroWindow, {
        type: 'info',
        title: 'Cadastro',
        message: 'Usuário cadastrado com sucesso!'
    })
})


//  LOGIN — AGORA USA O ARQUIVO JSON

ipcMain.handle('login', (event, { usuario, senha }) => {
    // Atualiza dados lendo do arquivo
    usuarios = carregarUsuarios()

    return usuarios.some(u =>
        u.usuario === usuario && u.senha === senha
    )
})