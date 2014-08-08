<?php

if( !isset($_POST) )
  die( 'Quit hacking!' );

$valid = true;
$errors = array();

//
// Submission data
//
$ipaddress = $_SERVER['REMOTE_ADDR'];
$useragent = $_SERVER['HTTP_USER_AGENT'];
$date = date('m/d/Y');
$time = date('H:i:s');

//
// Form data
//
$name    = $_POST['name'];
$email   = $_POST['email'];
$budget  = $_POST['budget'];
$start   = $_POST['start'];
$message = $_POST['message'];

//
// Validation
//
if( empty($name) ) {
  $valid = false;
  $errors[] = 'You have not entered a name';
}

if( empty($email) ) {
  $valid = false;
  $errors[] = 'You have not entered an email address';
} elseif( !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
  $valid = false;
  $errors[] = 'You have not entered a valid email address';
}

if( empty($message) ) {
  $valid = false;
  $errors[] = 'You have not entered a message';
}

if( $valid ) {
  $headers = "From: hire.webninja.io <noreply@hire.webninja.io>\r\n" .
             "Content-type: text/html; charset=UTF-8\r\n";

  $emailbody = <<<EOM
<p>You have recieved a new message from the enquiries form on your website.</p>
<p><strong>Name: </strong>{$name}</p>
<p><strong>Email Address: </strong>{$email}</p>
<p><strong>Budget: </strong>{$budget}</p>
<p><strong>Start date: </strong>{$start}</p>
<p><strong>Message: </strong>{$message}</p>
<div style='border: 1px solid grey'>
  This message was sent from the IP Address: {$ipaddress} on {$date} at {$time}<br>
  User agent: {$useragent}
</div>
EOM;

  mail( 'specious@gmail.com', 'Web enquiry', $emailbody, $headers );
}

//
// If not requested via AJAX, redirect back
//
if( empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest' )
  header('location: ' . $_SERVER['HTTP_REFERER']);
?>