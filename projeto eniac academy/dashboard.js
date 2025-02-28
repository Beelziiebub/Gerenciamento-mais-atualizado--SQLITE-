document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const logoutButton = document.getElementById("Logout"); // Corrigido o ID
    const dashboardContainer = document.querySelector(".dashboard-container");

    // ✅ Verifica se o usuário está autenticado
    function checkAuth() {
        fetch("dashboard.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na requisição");
                }
                return response.json();
            })
            .then(data => {
                if (!data.success) {
                    alert("Você precisa estar logado para acessar o Dashboard!");
                    window.location.href = "login.html";
                } else {
                    renderUsers(data.users);
                }
            })
            .catch(error => {
                console.error("Erro na verificação de autenticação:", error);
                alert("Erro ao verificar autenticação. Tente novamente.");
            });
    }

    // ✅ Renderiza usuários na tela
    function renderUsers(users) {
        if (!userList) return;
        userList.innerHTML = ""; // Limpa a lista
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.id} - ${user.name} (${user.email})`;
            userList.appendChild(li);
        });
    }

    // ✅ Logout - remove sessão e redireciona
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            fetch("dashboard.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "logout=true"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na requisição");
                }
                return response.json();
            })
            .then(() => {
                alert("Você saiu da conta.");
                window.location.href = "login.html";
            })
            .catch(error => {
                console.error("Erro ao fazer logout:", error);
                alert("Erro ao fazer logout. Tente novamente.");
            });
        });
    }

    // ✅ Ativar modo escuro
    const toggleDarkMode = () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    };

    // ✅ Botão para alternar modo escuro
    const darkModeButton = document.createElement("button");
    darkModeButton.textContent = "Modo Escuro 🌙";
    darkModeButton.style.marginBottom = "10px";
    darkModeButton.addEventListener("click", toggleDarkMode);

    // ✅ Adiciona o botão antes da lista de usuários
    if (dashboardContainer && userList) {
        dashboardContainer.insertBefore(darkModeButton, userList);
    }

    // ✅ Mantém o modo escuro ativado se o usuário já usou antes
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // ✅ Verifica autenticação e busca usuários
    checkAuth();
});