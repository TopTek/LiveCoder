<?php
	error_reporting(E_ALL);
	ini_set('display_errors','1');
	$httpClientIP = (!empty($_SERVER['HTTP_CLIENT_IP'])) ? $_SERVER['HTTP_CLIENT_IP'] : "NR";
	$httpXForwardedFor = (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : "NR";
	$remoteAddress = (!empty($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : "NR";
	$date = getdate()["mon"] . "/" . getdate()["mday"] . "/" . getdate()["year"] . "-" . getdate()["hours"] . ":" . getdate()["minutes"] . ":" . getdate()["seconds"];
	$email = $_POST["email"];
	$file = "users/" . $email. "/" . $email . ".user";
	$tempFile = trim("users/" . $email . "/" . $httpClientIP . $httpXForwardedFor . $remoteAddress . ".log");
	$tempFile = str_replace(":","-",$tempFile);
	//$fileLoggedOff = "users/" . $email. "/" . "off.log";
	//$fileLoggedOn = "users/" . $email. "/" . "on.log";
	
	if (!file_exists($tempFile)) {
		die("User is not Logged In!");
	}
	$fileContents = file_get_contents($file);
	$fileContents = explode("_", $fileContents);
	@$stringContents = [];
	$dataString = "";
	
	for($i = 0; $i < count($fileContents); $i++){
		$stringContents[] = explode("=", $fileContents[$i]);
		if(strcmp($stringContents[$i][0], "username") == 0){
			$dataString = $stringContents[$i][1];
		}
	}
	//rename($fileLoggedOff, $fileLoggedOn);
	
	// might as well not overwrite the file if we didn't replace anything*/
	echo($dataString);
	exit();
?>