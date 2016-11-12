  <?php
  $fehler = "";
  $name = $_POST['name'];
  $mail = $_POST['email'];
  $ort = $_POST['ort'];
  $tel = $_POST['tel'];
  $secur = $_POST['secur'];
  $text = $_POST['text'];
  
  if (empty($name)) {
    $fehler .= "<li>der Absendername fehlt</li>" ;
  }
  if (empty($mail)) {
    $fehler .= "<li>die Mailadresse fehlt</li>" ;
  }
  if (empty($text)) {
    $fehler .= "<li>keine Nachricht eingetragen</li>" ;
  }
  if (empty($secur) || ($secur != '3')) {
    $fehler .= "<li>Security-Frage falsch oder nicht eingetragen</li>" ;
  }  
  
  
  if (empty($fehler)) {
    if (get_magic_quotes_gpc()) {
      $text = stripslashes($text);
    }
    $return = chr(13).chr(10);
    $an = "info@lorenz-fenster.de" ;
    $betreff = "Kontaktformular Nachricht von ".$mail;
    $von = "From: Kontaktformular <info@lorenz-fenster.de>" ;
    $datum = "Datum: ".date("j.n.Y").$return;
    $zeit = "Zeit:  ".date("H:i").$return;
    $abs     = "Von:          ".$name." <".$mail.">".$return;
    $str_ort = "Ort:          <".$ort.">".$return;
    $str_tel = "Telefon:      <".$tel.">".$return;
    $str_add_text = "Erinnerung an Anja/Mathilde Lorenz: Bitte nicht automatisch antworten, sondern Email-Empfänger manuell selektieren. Gruß Axel".$return;
    $trennen = "-----------------------------------------------".$return;
    $nachricht = $datum.$zeit.$abs.$str_ort.$str_tel.$str_add_text.$trennen.$text;
    $nachricht2 = $datum.$zeit.$abs.$str_ort.$str_tel.$trennen.$text;
	mail($an,$betreff,$nachricht,$von);
  }
  ?>
  <html>
  <head>
    <title>Kontakt-Formular</title>
  </head>
  <body>
  <?php
  if (empty($fehler)) {
    $return = chr(13).chr(10);
    $nachricht2 = strip_tags($nachricht2);
    $nachricht2 = htmlentities($nachricht2);
    $nachricht2 = str_replace($return,"<br>",$nachricht2);
    echo "<p>Ihre Nachricht wurde versendet.</p>" ;
    echo "<p>$nachricht2</p>" ;
  } else {
    echo "<p>Ihre Nachricht wurde nicht gesendet, weil</p>" ;
    echo "<ul>$fehler</ul>" ;
  }
  ?>
  </body>
  </html>