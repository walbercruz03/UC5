import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {

    // ABRIR
    abrirArquivo: () => ipcRenderer.invoke("abrir-arquivo"),

    // SALVAR (normal)
    salvarArquivo: (conteudo) => ipcRenderer.invoke("salvar-arquivo", conteudo),

    // SALVAR COMO
    salvarComo: (conteudo) => ipcRenderer.invoke("salvar-como", conteudo),

    // NOVO
    novoArquivo: () => ipcRenderer.invoke("novo-arquivo"),

    // ENVIO de eventos (Menu → Renderer)
    receber: (canal, func) => {
        ipcRenderer.on(canal, (event, dados) => func(dados));
    },

    // ENVIAR eventos simples (Renderer → Main)
    enviar: (canal, dados) => {
        ipcRenderer.send(canal, dados);
    }
});