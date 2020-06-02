<?php
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $visitor_email = $_POST['email'];
  $visitor_option = $_POST['formSelect'];
  $message = $_POST['messageBody'];
?>


<?php
	$email_from = 'contact@dublin-360.com';

	$email_subject = "Form Submit D360:  $visitor_option";

	$email_body = "You have received a new message from the user: $firstName $lastName.\n".
                            "Here is the message:\n $message\n ";
?>

<?php

  $to = "info@dublin-360.com";

  $headers = "From: $email_from  \r\n" .
            "Reply-To: $visitor_email \r\n" .
            "X-Mailer: PHP/" . phpversion();

function IsInjected($str)
{
    $injections = array('(\n+)',
           '(\r+)',
           '(\t+)',
           '(%0A+)',
           '(%0D+)',
           '(%08+)',
           '(%09+)'
           );
               
    $inject = join('|', $injections);
    $inject = "/$inject/i";
    
    if(preg_match($inject,$str))
    {
      return true;
    }
    else
    {
      return false;
    }
}

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}
else{
    mail($to,$email_subject,$email_body,$headers);
    echo "Message Sent";
    }
 ?>

<?php header("Location: https://www.dublin-360.com/contact.html"); ?>