<?php
	error_reporting(E_ALL);
	ini_set('display_errors','1');
	$httpClientIP = (!empty($_SERVER['HTTP_CLIENT_IP'])) ? $_SERVER['HTTP_CLIENT_IP'] : "NR";
	$httpXForwardedFor = (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : "NR";
	$remoteAddress = (!empty($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : "NR";
	$date = getdate()["mon"] . "/" . getdate()["mday"] . "/" . getdate()["year"] . "-" . getdate()["hours"] . ":" . getdate()["minutes"] . ":" . getdate()["seconds"];
	$email = $_POST["email"];
	$password = $_POST["password"];
	$file = "users/" . $email. "/" . $email . ".user";
	//$fileLoggedOff = "users/" . $email. "/" . "off.log";
	//$fileLoggedOn = "users/" . $email. "/" . "on.log";
	$progress = 0;
	
	/*if (!file_exists($fileLoggedOff)) {
		die("User is not Logged Off!");
	}*/
	$fileContents = file_get_contents($file);
	$fileContents = explode("_", $fileContents);
	@$stringContents = [];
	
	for($i = 0; $i < count($fileContents); $i++){
		$stringContents[] = explode("=", $fileContents[$i]);
		if(strcmp($stringContents[$i][0], "email") == 0){
			if(strcmp($stringContents[$i][1], $email) == 0){
				$progress++;
			}
		}
		if(strcmp($stringContents[$i][0], "password") == 0){
			if(password_verify($password, $stringContents[$i][1])){
				$progress++;
			}
		}
	}
	if($progress != 2){
		die("Password or Username is Incorrect!");
	}
	$tempFile = trim("users/" . $email . "/" . $httpClientIP . $httpXForwardedFor . $remoteAddress . ".log");
	$tempFile = str_replace(":","-",$tempFile);
	$temp = fopen($tempFile, "w");
	fclose($temp);
	//rename($fileLoggedOff, $fileLoggedOn);
	
	// might as well not overwrite the file if we didn't replace anything*/
	echo("trueL");
	exit();
?>