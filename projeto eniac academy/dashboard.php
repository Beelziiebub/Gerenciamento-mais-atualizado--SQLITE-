<?php
session_start();

// Conectar ao banco de dados (ajuste as credenciais)
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "dashboard_db";
$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro ao conectar ao banco de dados."]));
}

//  **Verifica autenticação**
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php"); // Redireciona para login se não estiver autenticado
    exit;
}

//  **Busca usuários no banco de dados (AJAX)**
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["users"])) {
    $sql = "SELECT id, name, email FROM users";
    $result = $conn->query($sql);
    $users = [];

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode(["success" => true, "users" => $users]);
    exit;
}

// 🚀 **Logout (destrói a sessão)**
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["logout"])) {
    session_destroy();
    header("Location: login.php");
    exit;
}
?>


