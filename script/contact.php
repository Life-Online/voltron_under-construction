<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

require('recaptcha-master/src/autoload.php');
$recaptchaSecret = '***';

function pr($value)
{
	echo "<pre>";
	print_r($value);
	echo "</pre>";
}

try {
	if (!empty($_POST)) {

		/* validate the ReCaptcha, if something is wrong, we throw an Exception,
			i.e. code stops executing and goes to catch() block */
		if (!isset($_POST['g-recaptcha-response'])) {
			$dzRes['status'] = 0;
			$dzRes['msg'] = 'ReCaptcha is not set.';
			echo json_encode($dzRes);
			exit;
		}

		/* do not forget to enter your secret key from https://www.google.com/recaptcha/admin */
		$recaptcha = new \ReCaptcha\ReCaptcha($recaptchaSecret, new \ReCaptcha\RequestMethod\CurlPost());

		/* we validate the ReCaptcha field together with the user's IP address */
		$response = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

		if (!$response->isSuccess()) {
			$dzRes['status'] = 0;
			$dzRes['msg'] = 'ReCaptcha was not validated.';
			echo json_encode($dzRes);
			exit;
		}


		#### Contact Form Script ####
		if ($_POST['dzToDo'] == 'Contact') {
			$dzName = trim(strip_tags($_POST['dzName']));
			$dzEmail = trim(strip_tags($_POST['dzEmail']));
			$dzMessage = strip_tags($_POST['dzMessage']);
			$dzRes = [];
			if (!filter_var($dzEmail, FILTER_VALIDATE_EMAIL)) {
				$dzRes['status'] = 0;
				$dzRes['msg'] = 'Wrong Email Format';
			}
			$dzMailSubject = 'Website Contact Form: Someone is trying to contact you';
			$dzMailMessage	= 	"
								A person want to contact you: <br><br>
								Name: $dzName<br/>
								Email: $dzEmail<br/>
								Message: $dzMessage<br/>
								";

			$dzOtherField = "";
			if (!empty($_POST['dzOther'])) {
				$dzOther = $_POST['dzOther'];
				$message = "";
				foreach ($dzOther as $key => $value) {
					$fieldName = ucfirst(str_replace('_', ' ', $key));
					$fieldValue = ucfirst(str_replace('_', ' ', $value));
					$dzOtherField .= $fieldName . " : " . $fieldValue . "<br>";
				}
			}
			$dzMailMessage .= $dzOtherField;

			try {
				$mail->Host       = 'smtp.office365.com';
				$mail->SMTPAuth   = true;
				$mail->Username   = 'hello@voltron.africa';
				$mail->Password   = '***';
				$mail->SMTPSecure = 'PHPMailer::ENCRYPTION_STARTTLS';
				$mail->Port       = 587;

				//Recipients
				$mail->setFrom('hello@voltron.africa', 'Voltron Capital');
				$mail->addAddress('joshuaivie.me@gmail.com', 'Josh');
				$mail->addAddress('jivie@bluechiptech.biz', 'Josh');

				//Content
				$mail->isHTML(true);
				$mail->Subject = $dzMailSubject;
				$mail->Body    = $dzMailMessage;

				if (!$mail->send()) {
					$dzRes['status'] = 0;
					$dzRes['msg'] = 'Some problem in sending mail, please try again later.';
					echo json_encode($dzRes);
					exit;
				} else {
					$dzRes['status'] = 1;
					$dzRes['msg'] = 'We have received your message successfully. Thank you for contacting us for Contact.';
					echo json_encode($dzRes);
					exit;
				}
			} catch (\Exception $e) {
				$dzRes['msg'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
				echo json_encode($dzRes);
				exit;
			}
			exit;
		}
		#### Contact Form Script End ####
	}
} catch (\Exception $e) {
	$dzRes['status'] = 0;
	$dzRes['msg'] = $e->getMessage() . 'Some problem in sending mail, please try again later.';
	echo json_encode($dzRes);
	exit;
}
