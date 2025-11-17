import {app, BrowserWindow, nativeTheme, ipcMain, Menu,dialog, Notification} from 'electron'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow
let cadastroWindow

function createLoginWindow(){
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences:{
            preload: path.join(__dirname,'preload.js'),
            contextIsolation: true,
            
        }
    })
    mainWindow.loadFile("index.html")
}

function createCadastroWindow(){
    cadastroWindow = new BrowserWindow({
        width: 400,
        height: 500,
        parent: mainWindow,
        modal: true,
        webPreferences:{
            preload: path.join(__dirname,'preload.js'),
            contextIsolation: true,
}
    })
    cadastroWindow.loadFile('index2.html')
}
app.whenReady().then(createLoginWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
    })

    ipcMain.on('abrir-cadastro', () => {
        createCadastroWindow()
    })

    ipcMain.on('login-sucesso', () => {
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Login',
            message: 'Login realizado com sucesso!'
        })
    })

    let usuarios = []

    ipcMain.on('cadastro-usuario', (event, usuario) => {
        usuarios.push(usuario)
        console.log('Usuário cadastrado:', usuarios)
       dialog.showMessageBox(cadastroWindow, {
    type: 'info',
    title: 'Cadastro',
    message: 'Usuário cadastrado com sucesso!'
})
    })

        ipcMain.handle('login', (event, {usuario,senha}) => {
            return usuarios.some(u => u.usuario === usuario && u.senha === senha)
        })