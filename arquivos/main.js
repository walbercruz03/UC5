import { BrowserWindow, app, Menu, dialog, ipcMain } from "electron";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let janela = null;

// ------------------------------------------
// CRIAR JANELA PRINCIPAL
// ------------------------------------------
const criarJanela = () => {
    janela = new BrowserWindow({
        title: "Bloco de Notas",
        height: 600,
        width: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false
        }
    });

    janela.loadFile(path.join(__dirname, 'index.html'));
};


// ------------------------------------------
// ARQUIVOS
// ------------------------------------------
function escreverArquivo() {
    try {
        fs.writeFileSync(path.join(__dirname, 'arquivo.txt'), 'Escrevendo', 'utf-8');
    } catch (err) {
        console.error('Erro ao escrever:', err);
    }
}

async function lerArquivo(){
    let {canceled, filePaths} = await dialog.showOpenDialog({
        title: 'Abrir caminhoArquivo',
        defaultPath: 'caminhoArquivo.txt',
        filters: [{name: 'Texto', extensions: ['txt', 'doc']}],
        properties: ['openFile']
    })
    if(canceled){
        return
    }
    caminhoArquivo = filePaths[0]
    try {
        let conteudo = fs.readFileSync(caminhoArquivo, 'utf-8')
        return conteudo
    } catch (err) {
        console.error(err)
    }  
}
// ------------------------------------------
// INICIAR APP
// ------------------------------------------
app.whenReady().then(() => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    criarJanela();
});

// FUNÇÕES DE ARQUIVO


function limparEditor() {
    janela.webContents.send("limpar-editor");
}

function criarJanelaSobre() {
    // abre janela sobre futuramente
    console.log("Abrir janela Sobre");
}

let caminhoArquivo = null;

// ----------------------------
// ABRIR ARQUIVO
// ----------------------------
ipcMain.handle("abrir-arquivo", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        title: "Abrir arquivo",
        filters: [{ name: "Texto", extensions: ["txt"] }],
        properties: ["openFile"]
    });

    if (canceled) return { cancelado: true };

    caminhoArquivo = filePaths[0];

    const conteudo = fs.readFileSync(caminhoArquivo, "utf-8");

    return { cancelado: false, conteudo, caminho: caminhoArquivo };
});

// ----------------------------
// SALVAR (sobrescrever existente)
// ----------------------------
ipcMain.handle("salvar-arquivo", async (event, texto) => {
    try {
        if (!caminhoArquivo) {
            // se não existe arquivo aberto, vira "salvar como"
            const retorno = await salvarComo(texto);
            return retorno;
        }

        fs.writeFileSync(caminhoArquivo, texto, "utf-8");
        return { ok: true, caminho: caminhoArquivo };

    } catch (err) {
        return { ok: false, erro: err.message };
    }
});

// ----------------------------
// SALVAR COMO
// ----------------------------
ipcMain.handle("salvar-como", async (event, texto) => {
    return await salvarComo(texto);
});

async function salvarComo(texto) {
    const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Salvar como",
        defaultPath: "novo_arquivo.txt",
        filters: [{ name: "Texto", extensions: ["txt"] }]
    });

    if (canceled || !filePath) return { ok: false };

    caminhoArquivo = filePath;

    fs.writeFileSync(caminhoArquivo, texto, "utf-8");

    return { ok: true, caminho: caminhoArquivo };
}

// ----------------------------
// NOVO ARQUIVO
// ----------------------------
ipcMain.handle("novo-arquivo", () => {
    caminhoArquivo = null; // esvazia o arquivo atual
    return { ok: true };
});

// ------------------------------------------
// MENU
// ------------------------------------------
const template = [
    {
        label: "Arquivo",
        submenu: [
            { label: "Novo", accelerator: "Ctrl+N", click: () => janela.webContents.send("menu-novo") },
            { label: "Abrir", accelerator: "Ctrl+O", click: () => janela.webContents.send("menu-abrir") },
            { label: "Salvar", accelerator: "Ctrl+S", click: () => janela.webContents.send("menu-salvar") },
            { label: "Salvar Como", accelerator: "Ctrl+Shift+S", click: () => janela.webContents.send("menu-salvar-como") },
            { type: "separator" },
            { label: "Sair", role: "quit" }
        ]
    },

    {
        label: "Editar",
        submenu: [
            { label: "Desfazer", role: "undo", accelerator: "Ctrl+Z" },
            { label: "Refazer", role: "redo", accelerator: "Ctrl+Y" },
            { type: "separator" },
            { label: "Copiar", role: "copy", accelerator: "Ctrl+C" },
            { label: "Colar", role: "paste", accelerator: "Ctrl+V" },
            { label: "Recortar", role: "cut", accelerator: "Ctrl+X" },
            { label: "Limpar Tudo", click: () => limparEditor() },
            { label: "Selecionar Tudo", role: "selectAll", accelerator: "Ctrl+A" }
        ]
    },

    {
        label: "Exibir",
        submenu: [
            {
                label: "Zoom +",
                accelerator: "Ctrl+=",
                click: (menuItem, browserWindow) => {
                    const z = browserWindow.webContents.getZoomFactor();
                    browserWindow.webContents.setZoomFactor(z + 0.1);
                }
            },
            {
                label: "Zoom -",
                accelerator: "Ctrl+-",
                click: (menuItem, browserWindow) => {
                    const z = browserWindow.webContents.getZoomFactor();
                    browserWindow.webContents.setZoomFactor(z - 0.1);
                }
            },
            {
                label: "Reset Zoom",
                accelerator: "Ctrl+0",
                click: (menuItem, browserWindow) => {
                    browserWindow.webContents.setZoomFactor(1);
                }
            },
            { type: "separator" },
            { label: "Tela Cheia", role: "togglefullscreen" }
        ]
    },

    {
        label: "Sobre",
        click: () => criarJanelaSobre()
    }
];