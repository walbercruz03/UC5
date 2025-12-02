const editor = document.getElementById("texto");
const caminhoSpan = document.getElementById("caminho");

let caminhoAtual = null;

// NOVO
window.api.onNovoArquivo(() => {
    editor.value = "";
    caminhoAtual = null;
    caminhoSpan.textContent = "Novo arquivo";
});

// ABRIR
window.api.onArquivoAberto((resp) => {
    editor.value = resp.conteudo;
    caminhoAtual = resp.caminho;
    caminhoSpan.textContent = resp.caminho;
});

// BOTÃO SALVAR
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

// SALVAR MENU
window.api.onMenuSalvar(() => {
    document.getElementById("salvar").click();
});

document.getElementById("salvar").addEventListener("click", async () => {
    const texto = document.getElementById("tarefas").value.trim();
    const data = document.getElementById("dataTarefa").value;

    if (!texto || !data) {
        alert("Preencha o texto e a data.");
        return;
    }

    const resp = await window.api.salvarTarefa({
        texto,
        data
    });

    if (resp.sucesso) {
        alert("Tarefa salva e lembrete ativado!");
        document.getElementById("tarefas").value = "";
        document.getElementById("dataTarefa").value = "";
    }
});
document.getElementById("historico").addEventListener("click", async () => {
    const tarefas = await window.api.carregarTarefas();

    let lista = "HISTÓRICO DE TAREFAS:\n\n";

    tarefas.forEach(t => {
        lista += `📅 ${t.data}\n${t.tarefa}\nCriado: ${t.criadoEm}\n\n`;
    });

    alert(lista);
});