import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("api", {
    // NOVO ARQUIVO
    onNovoArquivo: (callback) => ipcRenderer.on("novo-arquivo", () => callback()),

    // ARQUIVO ABERTO
    onArquivoAberto: (callback) => ipcRenderer.on("arquivo-aberto", (event, data) => {
        callback(data);
    }),

    // SALVAR ARQUIVO
    salvarArquivo: (dados) => ipcRenderer.invoke("salvar-arquivo", dados),

    // SALVAR PELO MENU OU CTRL+S
    onMenuSalvar: (callback) => ipcRenderer.on("menu-salvar", () => callback()),
    salvarTarefa: (dados) => ipcRenderer.invoke("salvar-tarefa", dados),
    carregarTarefas: () => ipcRenderer.invoke("carregar-tarefas"),
});