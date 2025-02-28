document.addEventListener("DOMContentLoaded", () => {
    handleRoute();
    window.onpopstate = handleRoute; // Lida com botão voltar/avançar do navegador
});

// Definição das rotas
const routes = {
    "/": `
        <section class="hero">
            <h1>🏠 Bem-vindo à Home!</h1>
            <p>Explore as funcionalidades do nosso site.</p>
            <button onclick="navigateTo(event, '/login')">Acessar Agora</button>
        </section>
    `,
    "/login": `
        <h1>🔑 Login</h1>
        <form onsubmit="return login(event)">
            <input type="email" id="email" placeholder="Email" required><br>
            <input type="password" id="password" placeholder="Senha" required><br>
            <button type="submit">Entrar</button>
        </form>
        <p id="loginMessage"></p>
        <button onclick="navigateTo(event, '/')">Voltar</button>
    `,
    "/dashboard": `
        <h1>📊 Dashboard</h1>
        <p>Área restrita para usuários logados.</p>
        <button onclick="logout()">Sair</button>
    `,
};

// Função para carregar a rota correta
function handleRoute() {
    const path = window.location.pathname;
    const app = document.getElementById("app");

    if (!app) {
        console.error("Erro: Elemento #app não encontrado!");
        return;
    }

    console.log(`Navegando para: ${path}`);

    if (path === "/dashboard" && !localStorage.getItem("user")) {
        navigateTo(null, "/login"); // Protege o Dashboard
        return;
    }

    if (routes[path]) {
        app.innerHTML = routes[path];
    } else {
        navigateTo(null, "/"); // Se a rota não existir, volta para Home
    }
}

// Função para navegação sem recarregar a página
function navigateTo(event, route) {
    if (event) event.preventDefault();
    window.history.pushState({}, "", route);
    handleRoute();
}

// Simulação de login
function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@email.com" && password === "1234") {
        localStorage.setItem("user", email);
        navigateTo(null, "/dashboard");
    } else {
        document.getElementById("loginMessage").textContent = "Email ou senha inválidos.";
        document.getElementById("loginMessage").style.color = "red";
    }
}

// Logout
function logout() {
    localStorage.removeItem("user");
    navigateTo(null, "/");
}
