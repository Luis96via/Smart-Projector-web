# Headphones_17-04-24
Learn step-by-step how to create a stunning Headphone Product Landing Page with HTML, CSS, and JavaScript!


html


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro e Inicio de Sesión</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="auth-container">
        <div id="login-form">
            <h2>Iniciar Sesión</h2>
            <input type="text" id="login-email" placeholder="Email">
            <input type="password" id="login-password" placeholder="Contraseña">
            <button onclick="login()">Iniciar Sesión</button>
        </div>
        <div id="register-form">
            <h2>Registrarse</h2>
            <input type="text" id="register-email" placeholder="Email">
            <input type="password" id="register-password" placeholder="Contraseña">
            <button onclick="register()">Registrarse</button>
        </div>
    </div>
    <script src="scripts.js"></script>
</body>
</html>
#### CSS (styles.css)
css


body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

#auth-container {
    background: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#auth-container div {
    margin-bottom: 20px;
}

input {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
#### JavaScript (scripts.js)
javascript


function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Inicio de sesión exitoso');
            // Redirigir a la página de ingreso de dinero
            window.location.href = 'deposit.html';
        } else {
            alert('Error en el inicio de sesión: ' + data.message);
        }
    });
}

function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    fetch('api/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registro exitoso');
            // Redirigir a la página de inicio de sesión
            window.location.href = 'index.html';
        } else {
            alert('Error en el registro: ' + data.message);
        }
    });
}
#### Backend (PHP) 
 
**Conexión a la base de datos (db.php)**
php


<?php
$host = 'localhost';
$db = 'nombre_de_tu_base_de_datos';
$user = 'tu_usuario';
$pass = 'tu_contraseña';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error al conectar a la base de datos: " . $e->getMessage());
}
?>
**Registro (register.php)**
php


<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

try {
    $stmt = $pdo->prepare("INSERT INTO usuarios (email, password) VALUES (?, ?)");
    $stmt->execute([$email, $password]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
**Inicio de sesión (login.php)**
php


<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

try {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Generar token JWT
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode(['user_id' => $user['id'], 'email' => $user['email']]);
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'tu_clave_secreta', true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

        echo json_encode(['success' => true, 'token' => $jwt]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
### Paso 2: Ingreso de Dinero 
 
#### Frontend (deposit.html)
html


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ingreso de Dinero</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="deposit-container">
        <h2>Ingreso de Dinero</h2>
        <input type="number" id="amount" placeholder="Cantidad">
        <select id="payment-method">
            <option value="credit_card">Tarjeta de Crédito</option>
            <option value="bank_transfer">Transferencia Bancaria</option>
        </select>
        <button onclick="deposit()">Depositar</button>
    </div>
    <script src="scripts.js"></script>
</body>
</html>
#### JavaScript (scripts.js)
javascript


function deposit() {
    const amount = document.getElementById('amount').value;
    const paymentMethod = document.getElementById('payment-method').value;

    fetch('api/deposit.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ amount, paymentMethod })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Depósito exitoso');
            // Redirigir a la página de selección de cantidad a enviar
            window.location.href = 'send.html';
        } else {
            alert('Error en el depósito: ' + data.message);
        }
    });
}
#### Backend (deposit.php)
php


<?php
require 'db.php';
require 'jwt.php';

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
list($jwt) = sscanf($authHeader, 'Bearer %s');

if ($jwt) {
    $decoded = decodeJWT($jwt, 'tu_clave_secreta');
    if ($decoded) {
        $data = json_decode(file_get_contents('php://input'), true);
        $amount = $data['amount'];
        $paymentMethod = $data['paymentMethod'];
        $userId = $decoded['user_id'];

        try {
            $stmt = $pdo->prepare("INSERT INTO depositos (user_id, amount, payment_method) VALUES (?, ?, ?)");
            $stmt->execute([$userId, $amount, $paymentMethod]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Token inválido']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Autenticación requerida']);
}
?>
**Funciones JWT (jwt.php)**
php


<?php
function decodeJWT($jwt, $key) {
    list($header, $payload, $signature) = explode('.', $jwt);
    $header = json_decode(base64_decode($header), true);
    $payload = json_decode(base64_decode($payload), true);
    $signature = base64_decode(str_replace(['-', '_'], ['+', '/'], $signature));

    $validSignature = hash_hmac('sha256', "$header.$payload", $key, true);

    if ($signature === $validSignature) {
        return $payload;
    }

    return null;
}
?>
### Paso 3: Selección de Cantidad a Enviar 
 
#### Frontend (send.html)
html


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enviar Dinero</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="send-container">
        <h2>Enviar Dinero</h2>
        <input type="number" id="send-amount" placeholder="Cantidad">
        <input type="text" id="recipient-email" placeholder="Email del destinatario">
        <button onclick="sendMoney()">Enviar</button>
    </div>
    <script src="scripts.js"></script>
</body>
</html>
#### JavaScript (scripts.js)
javascript


function sendMoney() {
    const amount = document.getElementById('send-amount').value;
    const recipientEmail = document.getElementById('recipient-email').value;

    fetch('api/send.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ amount, recipientEmail })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Dinero enviado exitosamente');
            // Redirigir a la página de confirmación de recepción
            window.location.href = 'confirm.html';
        } else {
            alert('Error al enviar dinero: ' + data.message);
        }
    });
}
#### Backend (send.php)
php


<?php
require 'db.php';
require 'jwt.php';

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
list($jwt) = sscanf($authHeader, 'Bearer %s');

if ($jwt) {
    $decoded = decodeJWT($jwt, 'tu_clave_secreta');
    if ($decoded) {
        $data = json_decode(file_get_contents('php://input'), true);
        $amount = $data['amount'];
        $recipientEmail = $data['recipientEmail'];
        $userId = $decoded['user_id'];

        try {
            $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
            $stmt->execute([$recipientEmail]);
            $recipient = $stmt->fetch();

            if ($recipient) {
                $recipientId = $recipient['id'];
                $stmt = $pdo->prepare("INSERT INTO transacciones (sender_id, recipient_id, amount) VALUES (?, ?, ?)");
                $stmt->execute([$userId, $recipientId, $amount]);
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Destinatario no encontrado']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Token inválido']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Autenticación requerida']);
}
?>
### Paso 4: Notificación al Vendedor 
 
#### Backend (notification.php)
php


<?php
require 'db.php';

function notifySeller($transactionId) {
    global $pdo;
    try {
        $stmt = $pdo->prepare("SELECT email FROM usuarios WHERE id = (SELECT recipient_id FROM transacciones WHERE id = ?)");
        $stmt->execute([$transactionId]);
        $recipientEmail = $stmt->fetchColumn();

        if ($recipientEmail) {
            // Enviar notificación por email (puedes usar una librería como PHPMailer)
            mail($recipientEmail, "Pago recibido", "Has recibido un pago. Por favor, prepara el envío del producto.");
        }
    } catch (PDOException $e) {
        // Manejar error
    }
}
?>
### Paso 5: Envío del Producto 
 
#### Backend (shipment.php)
php


<?php
require 'db.php';
require 'jwt.php';

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
list($jwt) = sscanf($authHeader, 'Bearer %s');

if ($jwt) {
    $decoded = decodeJWT($jwt, 'tu_clave_secreta');
    if ($decoded) {
        $data = json_decode(file_get_contents('php://input'), true);
        $transactionId = $data['transactionId'];
        $trackingNumber = $data['trackingNumber'];

        try {
            $stmt = $pdo->prepare("UPDATE transacciones SET tracking_number = ? WHERE id = ?");
            $stmt->execute([$trackingNumber, $transactionId]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Token inválido']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Autenticación requerida']);
}
?>
### Paso 6: Confirmación de Recepción 
 
#### Backend (confirm.php)
php


<?php
require 'db.php';
require 'jwt.php';

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
list($jwt) = sscanf($authHeader, 'Bearer %s');

if ($jwt) {
    $decoded = decodeJWT($jwt, 'tu_clave_secreta');
    if ($decoded) {
        $data = json_decode(file_get_contents('php://input'), true);
        $transactionId = $data['transactionId'];

        try {
            $stmt = $pdo->prepare("UPDATE transacciones SET status = 'completed' WHERE id = ?");
            $stmt->execute([$transactionId]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Token inválido']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Autenticación requerida']);
}
?>
### Paso 7: Resolución de Problemas 
 
#### Backend (dispute.php)
php


<?php
require 'db.php';
require 'jwt.php';

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
list($jwt) = sscanf($authHeader, 'Bearer %s');

if ($jwt) {
    $decoded = decodeJWT($jwt, 'tu_clave_secreta');
    if ($decoded) {
        $data = json_decode(file_get_contents('php://input'), true);
        $transactionId = $data['transactionId'];
        $evidence = $data['evidence'];

        try {
            $stmt = $pdo->prepare("INSERT INTO disputas (transaction_id, evidence) VALUES (?, ?)");
            $stmt->execute([$transactionId, $evidence]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Token inválido']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Autenticación requerida']);
}
?>
### Paso 8: Proceso de Resolución de Disputas 
 
#### Backend (resolve.php)
php


<?php
require 'db.php';
require 'jwt.php';

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];
list($jwt) = sscanf($authHeader, 'Bearer %s');

if ($jwt) {
    $decoded = decodeJWT($jwt, 'tu_clave_secreta');
    if ($decoded) {
        $data = json_decode(file_get_contents('php://input'), true);
        $transactionId = $data['transactionId'];
        $resolution = $data['resolution'];

        try {
            $stmt = $pdo->prepare("UPDATE disputas SET resolution = ? WHERE transaction_id = ?");
            $stmt->execute([$resolution, $transactionId]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false,







-------------------------------



prompt y diagrama de flujo:


ayudame a planificar como podria ser el diagrama de flujo nivel Universidad de Harvard de una web que sirva solo y con el unico servicio de que personas puedan hacer pagos por un producto (no importa que producto sea eso lo acordo el vendedor y el comprador afuera de la web) donde la persona a pagar ingrege dinero facilmente a al web y se vea reflejado el saldo en la interce y cuando vaya a hacer un pago seleccione la cantidad de dinero que desea enviar al otro usuario y luego de eso  hasta que la persona no reciba el producto no se libere el dinero,   y que sea aprueba de que  personas quieras estafar como que si reciben el producto y luego digan que no lo recibieron haciendo que la otra persona no se le libere su dinero y que la otra persona retire su dinero y se lleve el producto y su dinero  que era para pagarle al otro, o que hasta que los dos involucrados no manifiesten que todo esta bien no pueda nadie liberar dinero y otras medidas de seguridad e implementa otras medidas fuertes de seguridad 
y que si todo sale bien la web se cobre por transaccion 1 dolar, asi que si el monto que la otra persona espera recibir es de 10$ el que va a pagar tiene que destinar 11 $ y son esa candidad la que se va a congelar hasta que todo este correcto
Answer : 


Share icon
Para planificar un diagrama de flujo a nivel Universidad de Harvard para una web que permita a las personas hacer pagos por un producto con medidas de seguridad rigurosas, aquí tienes una guía detallada. Este diagrama de flujo asegurará que el dinero no se libere hasta que ambas partes confirmen la recepción y satisfacción del producto, minimizando así el riesgo de fraude. Además, se incluirá una tarifa de transacción de 1 dólar. 
 
### Paso 1: Registro e Inicio de Sesión 
 
1. **Inicio** 
   - Usuario visita la página de inicio. 
   - [Decisión] ¿Usuario registrado? 
     - **Sí**: Usuario inicia sesión. 
     - **No**: Usuario se registra. 
 
### Paso 2: Ingreso de Dinero 
 
1. **Ingreso de Dinero** 
   - Usuario accede a la sección de ingreso de dinero. 
   - Usuario selecciona el método de pago (tarjeta de crédito, transferencia bancaria, etc.). 
   - Usuario ingresa los detalles de pago y la cantidad de dinero a ingresar. 
   - [Decisión] ¿Detalles de pago correctos? 
     - **Sí**: Proceder al siguiente paso. 
     - **No**: Mostrar mensaje de error y solicitar corrección. 
   - Sistema verifica el pago y refleja el saldo en la cuenta del usuario. 
 
### Paso 3: Selección de Cantidad a Enviar 
 
1. **Selección de Cantidad a Enviar** 
   - Usuario selecciona la cantidad de dinero que desea enviar a otro usuario (monto total = monto a pagar + tarifa de 1 dólar). 
   - Usuario ingresa los detalles del destinatario (usuario receptor). 
   - Sistema retiene el monto en una cuenta de depósito en garantía (escrow). 
 
### Paso 4: Notificación al Vendedor 
 
1. **Notificación al Vendedor** 
   - Usuario receptor (vendedor) recibe notificación del pago retenido. 
   - Usuario receptor prepara el envío del producto. 
 
### Paso 5: Envío del Producto 
 
1. **Envío del Producto** 
   - Usuario receptor envía el producto. 
   - Usuario receptor proporciona número de seguimiento. 
 
### Paso 6: Confirmación de Recepción 
 
1. **Confirmación de Recepción** 
   - Usuario pagador (comprador) recibe el producto. 
   - [Decisión] ¿Producto recibido correctamente? 
     - **Sí**: Usuario pagador confirma recepción. 
     - **No**: Usuario pagador reporta un problema. 
 
### Paso 7: Resolución de Problemas 
 
1. **Resolución de Problemas** 
   - [Decisión] ¿Problema reportado? 
     - **Sí**: Iniciar proceso de resolución de disputas. 
     - **No**: Liberar fondos al vendedor. 
 
### Paso 8: Proceso de Resolución de Disputas 
 
1. **Resolución de Disputas** 
   - Ambas partes presentan pruebas (por ejemplo, fotos, comunicaciones). 
   - Moderador revisa el caso. 
   - [Decisión] ¿Resolución alcanzada? 
     - **Sí**: Fondos liberados según resolución. 
     - **No**: Escalar el caso a un nivel superior (si es necesario). 
 
### Paso 9: Liberación de Fondos 
 
1. **Liberación de Fondos** 
   - [Decisión] ¿Ambas partes confirmaron la transacción? 
     - **Sí**: Fondos liberados al vendedor menos la tarifa de 1 dólar. 
     - **No**: Mantener fondos retenidos hasta resolución. 
 
### Paso 10: Finalización 
 
1. **Finalización** 
   - Transacción completada. 
   - Registro de la transacción en el sistema. 
   - Enviar notificaciones a ambas partes. 
 
### Medidas de Seguridad Adicionales 
 
1. **Verificación de Identidad:** 
   - Verificación de documentos de identidad de ambas partes. 
   - Autenticación de dos factores (2FA) para inicio de sesión y confirmación de transacciones. 
 
2. **Sistema de Seguimiento:** 
   - Uso de servicios de mensajería con seguimiento para garantizar la entrega del producto. 
 
3. **Escrow:** 
   - Uso de una cuenta de depósito en garantía para retener los fondos hasta que ambas partes confirmen la transacción. 
 
4. **Reputación y Comentarios:** 
   - Sistema de calificaciones y comentarios para vendedores y compradores. 
 
5. **Moderación de Disputas:** 
   - Equipo de moderadores para resolver disputas de manera justa y eficiente. 
 
6. **Pruebas de Entrega:** 
   - Requiere una confirmación de entrega con firma digital o fotografía del producto entregado. 
 
7. **Notificaciones y Alertas:** 
   - Enviar notificaciones y alertas en tiempo real a ambas partes sobre el estado de la transacción. 
 
### Diagrama de Flujo 
 
Para visualizar este proceso, puedes utilizar herramientas como Microsoft Visio, Lucidchart, o cualquier software de diagramación de flujo. A continuación, se presenta una descripción textual del diagrama de flujo:


Inicio -> [¿Usuario registrado?] -> (Sí) -> Inicio de sesión -> Ingreso de Dinero -> [¿Detalles de pago correctos?] -> (Sí) -> Verificación de Pago -> Reflejo de Saldo -> Selección de Cantidad a Enviar -> Notificación al Vendedor -> Envío del Producto -> Confirmación de Recepción -> [¿Producto recibido correctamente?] -> (Sí) -> Liberación de Fondos -> Finalización
                                                                                                                    \                                                                                     / 
                                                                                                                     -> (No) -> Resolución de Problemas -> [¿Resolución alcanzada?] -> (Sí) -> Liberación de Fondos -> Finalización
Este esquema debería ayudarte a crear una plataforma robusta y segura para transacciones en línea, minimizando el riesgo de fraude y asegurando que ambas partes estén satisfechas con la transacción.
