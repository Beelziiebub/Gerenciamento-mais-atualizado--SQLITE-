document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const logoutButton = document.getElementById("logout");
    const message = document.getElementById("message");

    const loginDiv = document.getElementById("login");
    const dashboardDiv = document.getElementById("dashboard");
    const registerDiv = document.getElementById("registerContainer");
    const resetDiv = document.getElementById("resetContainer");
    const homeDiv = document.getElementById("home");
    const retornarHomeDiv = document.getElementById("retornarHome");

    // Verifica se já está logado
    const token = localStorage.getItem("token");
    if (token) {
        showDashboard();
    }

    // Alternar visibilidade da senha
    function togglePasswordVisibility(inputId, toggleId) {
        const input = document.getElementById(inputId);
        const toggle = document.getElementById(toggleId);

        if (input && toggle) {
            toggle.addEventListener("click", function () {
                if (input.type === "password") {
                    input.type = "text";
                    toggle.textContent = "Ocultar";
                } else {
                    input.type = "password";
                    toggle.textContent = "Mostrar";
                }
            });
        }
    }

    // Aplicar a função de alternar visibilidade para os campos de senha
    togglePasswordVisibility("registerPassword", "toggleRegisterPassword");
    togglePasswordVisibility("confirmPassword", "toggleConfirmPassword");

    // LOGIN com AJAX
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Envia os dados via AJAX para o backend PHP
            fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    localStorage.setItem('token', email); // Salva o token
                    showDashboard(); // Exibe a dashboard
                } else {
                    message.textContent = data.message; // Exibe a mensagem de erro
                    message.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Erro no login:', error);
                message.textContent = 'Ocorreu um erro. Tente novamente.';
                message.style.color = 'red';
            });
        });
    }

    // LOGOUT
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("token");
            showLogin();
        });
    }

    // MOSTRAR HOME
    window.showHome = function () {
        if (loginDiv) loginDiv.style.display = "none";
        if (dashboardDiv) dashboardDiv.style.display = "none";
        if (registerDiv) registerDiv.style.display = "none";
        if (resetDiv) resetDiv.style.display = "none";
        if (homeDiv) homeDiv.style.display = "block";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "none";
    };

    // MOSTRAR LOGIN
    window.showLogin = function () {
        if (loginDiv) loginDiv.style.display = "block";
        if (dashboardDiv) dashboardDiv.style.display = "none";
        if (registerDiv) registerDiv.style.display = "none";
        if (resetDiv) resetDiv.style.display = "none";
        if (homeDiv) homeDiv.style.display = "none";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "block";
    };

    // MOSTRAR DASHBOARD
    function showDashboard() {
        if (loginDiv) loginDiv.style.display = "none";
        if (dashboardDiv) dashboardDiv.style.display = "block";
        if (registerDiv) registerDiv.style.display = "none";
        if (resetDiv) resetDiv.style.display = "none";
        if (homeDiv) homeDiv.style.display = "none";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "block";
    }

    // MOSTRAR CADASTRO
    window.showRegister = function () {
        if (loginDiv) loginDiv.style.display = "none";
        if (dashboardDiv) dashboardDiv.style.display = "none";
        if (registerDiv) registerDiv.style.display = "block";
        if (resetDiv) resetDiv.style.display = "none";
        if (homeDiv) homeDiv.style.display = "none";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "block";
        if (document.getElementById("registerMessage")) {
            document.getElementById("registerMessage").textContent = "";
        }
    };

    // MOSTRAR REDEFINIR SENHA
    window.showReset = function () {
        if (loginDiv) loginDiv.style.display = "none";
        if (dashboardDiv) dashboardDiv.style.display = "none";
        if (registerDiv) registerDiv.style.display = "none";
        if (resetDiv) resetDiv.style.display = "block";
        if (homeDiv) homeDiv.style.display = "none";
        if (retornarHomeDiv) retornarHomeDiv.style.display = "block";
        if (document.getElementById("resetMessage")) {
            document.getElementById("resetMessage").textContent = "";
        }
    };

    // FUNÇÃO PARA VOLTAR AO HOME
    window.retornarHome = function () {
        showHome();
    };

    // FUNÇÃO DE REDEFINIÇÃO DE SENHA com AJAX
    window.resetPassword = function () {
        const email = document.getElementById("resetEmail").value;

        // Envia a requisição para verificar o email via AJAX
        fetch('resetPassword.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${encodeURIComponent(email)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById("resetMessage").textContent = "Verifique seu email para redefinir a senha.";
                document.getElementById("resetMessage").style.color = "green";
            } else {
                document.getElementById("resetMessage").textContent = "Email não encontrado.";
                document.getElementById("resetMessage").style.color = "red";
            }
        })
        .catch(error => {
            console.error('Erro ao redefinir a senha:', error);
            document.getElementById("resetMessage").textContent = 'Ocorreu um erro. Tente novamente.';
            document.getElementById("resetMessage").style.color = 'red';
        });
    };

    // FUNÇÃO DE CADASTRO (Registra usuários no localStorage) com AJAX
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const termsCheckbox = document.getElementById("termsCheckbox");

            if (!termsCheckbox.checked) {
                document.getElementById("registerMessage").textContent = "Você deve aceitar os termos e condições.";
                document.getElementById("registerMessage").style.color = "red";
                return;
            }

            if (password !== confirmPassword) {
                document.getElementById("registerMessage").textContent = "As senhas não coincidem.";
                document.getElementById("registerMessage").style.color = "red";
                return;
            }

            // Envia os dados de cadastro via AJAX
            fetch('register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    document.getElementById("registerMessage").textContent = "Cadastro realizado com sucesso!";
                    document.getElementById("registerMessage").style.color = "green";
                    registerForm.reset(); // Limpa o formulário após o cadastro
                } else {
                    document.getElementById("registerMessage").textContent = data.message;
                    document.getElementById("registerMessage").style.color = "red";
                }
            })
            .catch(error => {
                console.error('Erro no cadastro:', error);
                document.getElementById("registerMessage").textContent = 'Ocorreu um erro. Tente novamente.';
                document.getElementById("registerMessage").style.color = 'red';
            });
        });
    }
});
