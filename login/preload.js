const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    criarJanela: () => ipcRenderer.send('abrir-cadastro'),
    cadastrarUsuario: (usuario) => ipcRenderer.send('cadastro-usuario', usuario),
    login: (usuario, senha) => ipcRenderer.invoke('login', {usuario, senha})
});