// Seletores
const form = document.getElementById("finance-form");
const descricaoInput = document.getElementById("descricao");
const categoriaInput = document.getElementById("categoria");
const dataInput = document.getElementById("data");
const valorInput = document.getElementById("valor");
const transacoesList = document.getElementById("transacoes");
const totalReceitas = document.getElementById("total-receitas");
const totalDespesas = document.getElementById("total-despesas");
const saldoFinal = document.getElementById("saldo-final");

// Array para armazenar transações
let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

// Função para atualizar o resumo financeiro
function atualizarResumo() {
    const receitas = transacoes
        .filter(t => t.categoria === "Receita")
        .reduce((acc, t) => acc + t.valor, 0);
    const despesas = transacoes
        .filter(t => t.categoria === "Despesa")
        .reduce((acc, t) => acc + t.valor, 0);
    const saldo = receitas - despesas;

    totalReceitas.textContent = `R$ ${receitas.toFixed(2)}`;
    totalDespesas.textContent = `R$ ${despesas.toFixed(2)}`;
    saldoFinal.textContent = `R$ ${saldo.toFixed(2)}`;
}

// Função para renderizar as transações
function renderizarTransacoes() {
    transacoesList.innerHTML = "";
    transacoes.forEach((transacao, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${transacao.data} - ${transacao.descricao} (${transacao.categoria}): R$ ${transacao.valor.toFixed(2)}
            <div class="actions">
                <button class="edit" onclick="editarTransacao(${index})">Editar</button>
                <button onclick="excluirTransacao(${index})">Excluir</button>
            </div>
        `;
        transacoesList.appendChild(li);
    });
    atualizarResumo();
}

// Função para salvar no LocalStorage
function salvarLocalStorage() {
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

// Função para adicionar uma transação
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const descricao = descricaoInput.value;
    const categoria = categoriaInput.value;
    const data = dataInput.value;
    const valor = parseFloat(valorInput.value);

    transacoes.push({ descricao, categoria, data, valor });
    salvarLocalStorage();
    renderizarTransacoes();
    form.reset();
});

// Função para excluir uma transação
function excluirTransacao(index) {
    transacoes.splice(index, 1);
    salvarLocalStorage();
    renderizarTransacoes();
}

// Função para editar uma transação
function editarTransacao(index) {
    const transacao = transacoes[index];
    descricaoInput.value = transacao.descricao;
    categoriaInput.value = transacao.categoria;
    dataInput.value = transacao.data;
    valorInput.value = transacao.valor;

    excluirTransacao(index);
}

// Inicialização
renderizarTransacoes();