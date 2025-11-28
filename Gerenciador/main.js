import {app, BrowserWindow, Menu, dialog, ipcMain, nativeTheme} from 'electron'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url) 
const __dirname = path.dirname(__filename)

let janela = null 

//  FUNÇÃO PARA CRIAR A JANELA PRINCIPAL
function criarJanela(){
    janela = new BrowserWindow({
        title: "Gerenciador de tarefas",
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    janela.loadFile(path.join(__dirname, 'index.html'))
}

const templateMenu = [
    {
        label: "Arquivo",
        submenu: [
            {
                label: "Novo",
                click: () => {
                    janela.webContents.send("novo-arquivo");
                }
            },
            {
                label: "Abrir",
                click: async () => {
                    const resp = await dialog.showOpenDialog(janela, {
                        filters: [{ name: "Arquivos de texto", extensions: ["txt", "json"] }],
                        properties: ["openFile"]
                    });

                    if (resp.canceled) return;

                    const arquivo = resp.filePaths[0];
                    const conteudo = fs.readFileSync(arquivo, "utf8");

                    janela.webContents.send("arquivo-aberto", {
                        caminho: arquivo,
                        conteudo
                    });
                }
            },
            { type: "separator" },
            { role: "quit", label: "Sair" }
        ]
    }
]

const menu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(menu)

ipcMain.handle("salvar-arquivo", async (event, {caminho,conteudo}) => {
    try{
        if(!caminho){
        const resp = await dialog.showSaveDialog(janela, {
            title: "Salvar arquivo",
            filters: [{ name: "texto", extensions: ["txt", "json"] }]
    })

    if (resp.canceled) {
        return { cancelado: true };
    }
    caminho = resp.filePath;
    }
    fs.writeFileSync(caminho, conteudo, "utf8");
    return { sucesso: true, caminho };
    }catch (err) {
        return { sucesso: false, erro: err.message };
    }                       
})

app.whenReady().then(() => {
    criarJanela();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            criarJanela();
        }
    });
});

// ============================
// QUANDO FECHAR TUDO
// ============================
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});