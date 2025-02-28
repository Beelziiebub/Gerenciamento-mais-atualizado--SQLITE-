<?php header('Content-Type:application/json');

// Simular a verificação de usuários no banco.

function getUserByEmail($email) {
    // Aqui você pode realizar uma busca no banco de dados 
    $users = [
        'usuario@dominio.com' => senha123 // UM USUÁRIO ALEATÓRIO SALVO.
    ];

    if (array_key_exists($email, $users)) {
        return $users [$email];
    }

    return null;
}

// REGISTRAR UM USUÁRIO NOVO

function registerUser($email, $password){
    // Salvar no banco
    $users = [
        'usuario@dominio.com'=>'senha123' 
    ];

    if (array_key_exists($email, $users)) {
        // SE O USUÁRIO JÁ EXISTIR
        return false; 
    }

    // Simular Cadastro 
    
  $users[$email] = $password;

  return true;

}

// Função para enviar email de redefinição de senha (simulado)
function sendPasswordResetEmail($email) {
    // Aqui você pode integrar com um sistema de envio de e-mails
    // Para fins de demonstração, vamos simular o envio
    return true;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){

    //VERIFICAR UMA AÇÃO 

    $action = isset($_POST['action']) ? $_POST['action']: '';

    swich ($action) {
        case 'login':

            //PROCESSA LOGIN

            $email = isset($_POST['email']) ? $_POST['email']: '';
            $password = isset($_POST['password']) ? $_POST['password']: '';

            $userPassword = getUserByEmail($email);

            if ($userPassword && $userPassword === $password) {

                // LOGIN

                echo json_encode(['status' => 'sucess','message' => 'Credenciais inválidas']);
            }

            break;

            case 'register':

                // Processar o cadastro

                $email = isset($_POST['email']) ? $_POST['email']: '';
                $password = isset($_POST['password']) ? $_POST[password]: '';
                $confirmPassword = isset($_POST['confirmPassword']) ? $_POST[confirmPassword]:


                $termsAccepted = isset($_POST['confirmmPassword']) ? $_POST['termmsAccepted']: false;

                // VERIFICADOR DE USUÁRIOS 

                if (getUserByEmail($email)) {

                    // VERIFICAR UM USUÁRIO EXISTENTE

                    echo json_encode(['status' => 'error','message' => 'Você deve aceitar os termos de usuário!']);
                    } elseif($passwword !== $confirmPassword) {
                    
                        // ERRO NA SENHA

                        echo json_enconde(['status' => 'error','message' => 'Senha incorreta!']);

                    } else { 

                        // CADASTRO REALIZADO COM SUCESSO!

                        if(registerUser($email,$password)) {
                            echo json_encode(['status' => 'sucess','message' => 'Cadastro realizado com sucesso!']);

                        } else {
                            echo json_encode(['status' => 'error','message' => 'Erro ao cadastrar, tente novamente!']);
                        }
                    }

                    break;

                    case 'resetPassword':

                        // Processa a redefinição de senha

                        $email = isset($_POST['email']) ? $_POST['email']: '';

                        // VERIFICAR EMAIL CADASTRADO

                        if (getUserByEmail($email)) {

                              // Envia as instruções para redefinir a senha (simulado)
                if (sendPasswordResetEmail($email)) {
                    echo json_encode(['status' => 'success', 'message' => 'Instruções enviadas para o email']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Erro ao enviar instruções para redefinir a senha']);
                }
            } else {
                // Email não encontrado
                echo json_encode(['status' => 'error', 'message' => 'Email não encontrado']);
            }
            break;

        default:
            // Caso a ação não seja reconhecida
            echo json_encode(['status' => 'error', 'message' => 'Ação inválida']);
            break;
    }
} else {
    // Se não for um método POST
    echo json_encode(['status' => 'error', 'message' => 'Método inválido']);
}
?>




