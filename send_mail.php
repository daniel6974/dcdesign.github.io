<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// CONFIGURACIÓN SMTP
$mail = new PHPMailer(true);

try {
    // Servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'danielcarrizo74@gmail.com'; 
    $mail->Password   = 'baeiuifpjukabnpj'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Remitente
    $mail->setFrom('danielcarrizo74@gmail.com', 'DC GRAPHIC & WEB DESIGN');

    // Destinatario
    $mail->addAddress('danielcarrizo74@gmail.com');

    // Datos del formulario
    $nombre   = $_POST['nombre'] ?? '';
    $email    = $_POST['email'] ?? '';
    $servicio = $_POST['servicio'] ?? '';
    $mensaje  = $_POST['mensaje'] ?? '';

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Nuevo mensaje desde el formulario de contacto';
    $mail->Body    = "
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> $nombre</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Servicio de interés:</strong> $servicio</p>
        <p><strong>Mensaje:</strong><br>$mensaje</p>
    ";

    // Enviar
    $mail->send();

    // Redirigir con alerta
    header("Location: index.html?enviado=1");
    exit;

} catch (Exception $e) {
    echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
}
?>