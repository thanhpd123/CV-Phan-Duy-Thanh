<?php
class PHP_Email_Form {
  public $to = '';
  public $from_name = '';
  public $from_email = '';
  public $subject = '';
  public $smtp = array();
  public $ajax = false;
  private $messages = array();

  public function add_message($message, $label, $priority = 0) {
    $this->messages[] = array(
      'message' => $message,
      'label' => $label,
      'priority' => $priority
    );
  }

  public function send() {
    $email_content = "";
    foreach ($this->messages as $entry) {
      $email_content .= $entry['label'] . ": " . $entry['message'] . "\n";
    }

    $headers = 'From: ' . $this->from_name . ' <' . $this->from_email . '>' . "\r\n" .
               'Reply-To: ' . $this->from_email . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (!empty($this->smtp)) {
      // SMTP configuration (if needed)
      // You can use PHPMailer or any other library to send emails via SMTP
    }

    if (mail($this->to, $this->subject, $email_content, $headers)) {
      return 'OK';
    } else {
      return 'Error: Unable to send email.';
    }
  }
}
?>