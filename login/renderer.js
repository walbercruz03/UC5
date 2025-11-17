window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('novoCadastro').addEventListener('click', (e) => {
        e.preventDefault();
        window.api.criarJanela();
    });
});