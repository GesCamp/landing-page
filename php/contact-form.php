<?php
/**
 * Plugin Name: CF7 Postulation Extension
 * Description: Extiende Contact Form 7 para manejar un formulario de postulación mediante un endpoint REST API.
 * Version: 1.0
 * Author: Omar Olate Salas omarolate.96@gmail.com
 */






// Evitar el acceso directo
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Registrar el endpoint REST API
function register_postulation_endpoint() {
    register_rest_route('postulation/v1', '/submit/', array(
        'methods' => 'POST',
        'callback' => 'handle_postulation_submission',
        'permission_callback' => '__return_true', // Cambiar si es necesario validar permisos
    ));
}
add_action('rest_api_init', 'register_postulation_endpoint');

// Callback para manejar el envío del formulario
function handle_postulation_submission(WP_REST_Request $request) {
    // Recibir los datos del formulario
    $name = sanitize_text_field($request->get_param('name'));
    $email = sanitize_email($request->get_param('email'));

    // Validar los datos
    if ( empty($name) || empty($email) || !is_email($email) ) {
        return new WP_REST_Response('Campos requeridos son inválidos', 400);
    }

    // Procesar los datos, por ejemplo, enviando un correo
    $to = 'admin@tu-dominio.com'; // Cambia esto a tu correo
    $subject = 'Nueva Postulación';
    $message = "Nombre: $name\nCorreo: $email";
    $headers = array('Content-Type: text/plain; charset=UTF-8');

    // Enviar el correo
    wp_mail($to, $subject, $message, $headers);

    // Devolver respuesta exitosa
    return new WP_REST_Response('Postulación recibida correctamente', 200);
}
