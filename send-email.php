<?php
header('Content-Type: application/json');

$config = [
    'host' => 'smtp.example.com',
    'port' => 587,
    'username' => 'your-email@example.com',
    'password' => 'your-password',
    'from_email' => 'noreply@bellariavacanze.it',
    'from_name' => 'Bellaria Vacanze',
    'to_email' => 'info@bellariavacanze.it'
];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Metodo non consentito']);
    exit;
}

$nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$messaggio = filter_input(INPUT_POST, 'messaggio', FILTER_SANITIZE_STRING);

if (!$nome || !$email || !$messaggio) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Tutti i campi sono obbligatori']);
    exit;
}

require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';
require_once 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    $mail = new PHPMailer(true);
    
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $config['port'];
    
    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email']);
    $mail->addReplyTo($email, $nome);
    
    $mail->isHTML(true);
    $mail->Subject = 'Nuovo messaggio dal sito Bellaria Vacanze';
    $mail->Body = "
        <h2>Nuovo messaggio dal sito</h2>
        <p><strong>Nome:</strong> {$nome}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Messaggio:</strong></p>
        <p>" . nl2br($messaggio) . "</p>
    ";
    $mail->AltBody = "Nome: {$nome}\nEmail: {$email}\nMessaggio: {$messaggio}";
    
    $mail->send();
    
    echo json_encode(['success' => true, 'message' => 'Email inviata con successo']);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => "Errore invio email: {$mail->ErrorInfo}"]);
}
