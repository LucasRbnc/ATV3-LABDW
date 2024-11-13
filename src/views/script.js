const apiUrl = "http://localhost:3030/expenses"; // Altere a URL caso o servidor esteja em outra porta ou domínio

// Função para buscar o total das despesas
async function fetchTotalExpenses() {
    try {
        const response = await fetch(`${apiUrl}/total`);
        const data = await response.json();
        document.getElementById("total-expenses").textContent = data.totalAmount.toFixed(2);
    } catch (error) {
        console.error("Erro ao buscar total das despesas:", error);
    }
}

// Função para buscar e exibir a lista de despesas
async function fetchExpenses() {
    try {
        const response = await fetch(apiUrl);
        const expenses = await response.json();

        const expenseList = document.getElementById("expense-list");
        expenseList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${expense.description} - R$ ${expense.amount.toFixed(2)} - ${new Date(expense.date).toLocaleDateString("pt-BR")}</span>
                <div class="actions">
                    <button class="edit" onclick="editExpense('${expense._id}')">Editar</button>
                    <button class="delete" onclick="deleteExpense('${expense._id}')">Excluir</button>
                </div>
            `;
            expenseList.appendChild(li);
        });

        fetchTotalExpenses();
    } catch (error) {
        console.error("Erro ao buscar despesas:", error);
    }
}

// Função para cadastrar uma nova despesa
document.getElementById("expense-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    const expenseDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(expenseDate.getTime()) || expenseDate > today) {
        alert('Por favor, insira uma data válida que não seja futura.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description, amount, date })
        });

        if (response.ok) {
            fetchExpenses();
            document.getElementById("expense-form").reset();
        } else {
            alert("Erro ao adicionar despesa.");
        }
    } catch (error) {
        console.error("Erro ao adicionar despesa:", error);
    }
});

// Função para deletar uma despesa
async function deleteExpense(id) {
    try {
        await fetch(`${apiUrl}/delete/${id}`, {
            method: "DELETE"
        });
        
        // Atualiza a lista e o total
        fetchExpenses();
        fetchTotalExpenses();
    } catch (error) {
        console.error("Erro ao deletar despesa:", error);
    }
}

// Event listeners para carregar os dados iniciais e calcular o total ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    fetchExpenses();
    fetchTotalExpenses();
});
