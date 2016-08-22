<?php
	error_reporting(E_ALL); 
	ini_set('display_errors','1');
	//$httpClientIP = (!empty($_SERVER['HTTP_CLIENT_IP'])) ? $_SERVER['HTTP_CLIENT_IP'] : "NR";
	//$httpXForwardedFor = (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : "NR";
	//$remoteAddress = (!empty($_SERVER['REMOTE_ADDR'])) ? $_SERVER['REMOTE_ADDR'] : "NR";
	//$date = getdate()["mon"] . "/" . getdate()["mday"] . "/" . getdate()["year"] . "-" . getdate()["hours"] . ":" . getdate()["minutes"] . ":" . getdate()["seconds"];
	$email = $_POST["email"];
	$username = $_POST["username"];
	$password = $_POST["password"];
	$passwordConfirm = $_POST["passwordConfirm"];
	if(strcmp($password, $passwordConfirm) != 0){
		die("Your password and confirmation password do not match.")
	}
	$passwordHash = password_hash($password, PASSWORD_DEFAULT, array("cost" => 14));
	//$httpClientIPHash = password_hash($httpClientIP, PASSWORD_DEFAULT, array("cost" => 14));
	//$httpXForwardedForHash = password_hash($httpXForwardedFor, PASSWORD_DEFAULT, array("cost" => 14));
	//$remoteAddressHash = password_hash($remoteAddress, PASSWORD_DEFAULT, array("cost" => 14));
	
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		die("Invalid Email Address!");
	}
	if(strlen($username) < 3){
		die("Invalid Username! Usernames Must be at Least 3 Characters Long.");
	}
	if(strlen($password) < 5){
		die("Invalid Password! Passwords Must be at Least 5 Characters Long.");
	}
	
	if(strcmp($password, $passwordConfirm) != 0){
		die("Passwords Don't Match");
	}
	if (!file_exists("users/" . $email . "/")) {
		mkdir("users/" . $email . "/", 0777, true);
	}else{
		die("User Already Exists!");
	}
	
	$file = "users/" . $email. "/" . $email . ".user";
	$fileData = "users/" . $email. "/" . $email . ".data";
	//$fileLogginIn = "users/" . $email. "/" . "off.log";
	
	$writing = @fopen($file, "x") or die("Error. Try Again! createUser");
	fclose(fopen("main.data", "w+"));
	//$temp = @fopen($fileLogginIn, "x");
	//fclose($temp);
	if($writing){
		fputs($writing, 
			//"httpClientIP=" . $httpClientIPHash . "_httpXForwardedFor=" . $httpXForwardedForHash . "_remoteAddress=" . $remoteAddressHash . "_" .
			"email=" . $email ."_username=" . $username . "_password=" . $passwordHash . "_data={}"
		);
	}
	fclose($writing);
	// might as well not overwrite the file if we didn't replace anything*/
	echo("trueR");
	exit();
?>
