let historicoOperacoes= []

function adicionar(valor) {
    document.getElementById('calcular').value += valor;
}
function limpar() {
    document.getElementById('calcular').value = '';
}
function calcular() {
    const campo = document.getElementById('calcular');
    try {
        // Aceita tanto 'x' quanto '*' para multiplicação
        const expressao = campo.value.replace(/x/g, '*').replace(/,/g, '.');
        // Permite números, operadores e espaços
        if (!/^[0-9+\-*/.() ]+$/.test(expressao)) throw new Error('Expressão inválida');
        const resultado = eval(expressao);
        campo.value = resultado;
        const registro = `${campo.value} = ${resultado}`;
        historicoOperacoes.push(registro);
        window.api.addHistorico(registro);
    } catch {
        campo.value = 'Erro';
    }
}
function historico() {
    window.api.abrirHistorico();
}