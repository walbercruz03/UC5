import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    salvarArquivo: (texto) => ipcRenderer.send("salvar-arquivo", texto),
    abrirArquivo: () => ipcRenderer.invoke("abrir-arquivo", )
});