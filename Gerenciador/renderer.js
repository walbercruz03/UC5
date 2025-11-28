const editor = document.getElementById("texto");
const caminhoSpan = document.getElementById("caminho");

let caminhoAtual = null;

// -----------------------------
// NOVO ARQUIVO
// -----------------------------
window.api.onNovoArquivo(() => {
    editor.value = "";
    caminhoAtual = null;
    caminhoSpan.textContent = "Novo arquivo";
});

// -----------------------------
// ARQUIVO ABERTO PELO MENU
// -----------------------------
window.api.onArquivoAberto((resp) => {
    editor.value = resp.conteudo;
    caminhoAtual = resp.caminho;
    caminhoSpan.textContent = resp.caminho;
});

// -----------------------------
// BOTÃO SALVAR
// -----------------------------
document.getElementById("salvar").addEventListener("click", async () => {
    const resp = await window.api.salvarArquivo({
        caminho: caminhoAtual,
        conteudo: editor.value
    });

    if (resp.sucesso) {
        caminhoAtual = resp.caminho;
        caminhoSpan.textContent = resp.caminho;
        alert("Arquivo salvo!");
    }
});

// SALVAR quando clicar em "Salvar" no menu
window.api.onMenuSalvar = () => {
    document.getElementById("salvar").click();