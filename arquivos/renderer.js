
// SALVAR
const editor = document.getElementById("texto");
const caminhoSpan = document.getElementById("caminho");

// NOVO
window.api.novoArquivo().then(() => {
    editor.value = "";
    caminhoSpan.textContent = "Novo arquivo";
});

// ABRIR
function abrirArquivo() {
    window.api.abrirArquivo().then((resp) => {
        if (resp.cancelado) return;

        editor.value = resp.conteudo;
        caminhoSpan.textContent = resp.caminho;
    });
}

// SALVAR
function salvarArquivo() {
    const txt = editor.value;

    window.api.salvarArquivo(txt).then((resp) => {
        if (resp.ok) {
            caminhoSpan.textContent = resp.caminho;
        }
    });
}

// SALVAR COMO
function salvarComo() {
    const txt = editor.value;

    window.api.salvarComo(txt).then((resp) => {
        if (resp.ok) {
            caminhoSpan.textContent = resp.caminho;
        }
    });
}

window.api.receber("menu-novo", () => {
    window.api.novoArquivo().then(() => {
        editor.value = "";
        caminhoSpan.textContent = "Novo arquivo";
    });
});

// MENU → ABRIR
window.api.receber("menu-abrir", () => {
    abrirArquivo();
});

// MENU → SALVAR
window.api.receber("menu-salvar", () => {
    salvarArquivo();
});

// MENU → SALVAR COMO
window.api.receber("menu-salvar-como", () => {
    salvarComo();
});