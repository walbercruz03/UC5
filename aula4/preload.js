import { contextBridge, ipcRenderer } from "electron"

console.log('Preload carregado');
contextBridge.exposeInMainWorld("api", {
    abrirHistorico: () => {
        console.log('Chamando abrirHistorico');
        ipcRenderer.send("abrir-historico");
    },
    addHistorico: (valor) => {
        console.log('Chamando addHistorico', valor);
        ipcRenderer.send("add-historico", valor);
    },
    receberHistorico: (callback) => {
        ipcRenderer.on("dados-historico", (_e, dados) => {
            console.log('Recebendo historico', dados);
            callback(dados);
        });
    }
})