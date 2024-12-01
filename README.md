
# Informe de Análisis del Proyecto Smart-Projector-web

Tecnologías Implementadas:


HTML5
CSS3
JavaScript
Bibliotecas externas: Remixicon, Swiper, ScrollReveal

Enfoque del Proyecto:
El proyecto está enfocado en crear una landing page para promocionar y vender un proyector inteligente llamado HY300 Smart Projector. La página está diseñada para mostrar las características del producto, facilitar la compra y permitir la interacción con los clientes.


Estructura y Funcionalidades:


a. Diseño Responsivo:


La página utiliza CSS para adaptarse a diferentes tamaños de pantalla.
Se implementa un menú de navegación que se convierte en un menú hamburguesa en dispositivos móviles.

b. Presentación del Producto:


La sección de encabezado (header) muestra una imagen del producto y sus características principales.
La sección de producto (product) detalla las especificaciones técnicas y beneficios del proyector.

c. Galería de Imágenes:


Se utiliza el slider Swiper para mostrar diferentes modelos o vistas del producto.
Las imágenes son interactivas y se pueden ampliar en un modal al hacer clic.

d. Interacción con el Usuario:


Botones para "Ofertar", "Agregar al Carrito" y "Hacer Preguntas" que abren modales personalizados.
Los modales permiten al usuario interactuar directamente con un vendedor a través de WhatsApp.

e. Animaciones y Efectos:


Se utiliza ScrollReveal para añadir animaciones al hacer scroll en la página.

Características Destacadas del Código:


a. Modularidad:


El código está separado en archivos HTML, CSS y JavaScript, lo que facilita su mantenimiento.

b. Uso de Variables CSS:


Se definen variables CSS para colores y fuentes, permitiendo una fácil personalización del tema.

c. Implementación de Modales:


Se crean modales personalizados para diferentes acciones del usuario, mejorando la experiencia de compra.

d. Integración con WhatsApp:


Los botones de acción están vinculados directamente con un número de WhatsApp para facilitar la comunicación con el vendedor.

En conclusión, el proyecto Smart-Projector-web es una landing page bien estructurada y diseñada para promocionar el proyector HY300. Utiliza tecnologías modernas de desarrollo web para crear una experiencia de usuario atractiva y funcional, con un enfoque claro en la presentación del producto y la facilitación del proceso de compra.











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
list($jwt) = sscanf($authHeader, 'Bearer %s
