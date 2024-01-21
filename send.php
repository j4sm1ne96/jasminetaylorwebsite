<?php

if (isset($_POST['submit'])) {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    $mailTo = "jasmine.taylor@jasminentaylor.co.uk";
    $headers = "From: ". $email;
    $txt = "You have received a message from: ". $name .".\n\n".$message; 

    mail($mailTo, $phone, $txt, $headers);
    header("Location: contact.php?mailsend");
}