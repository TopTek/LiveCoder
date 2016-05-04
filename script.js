$(document).ready(function () {

	/*$('#clickme').click(function() {
	$('#book').animate({
	opacity: 0, // animate slideUp
	marginLeft: '-200px'
	}, 'slow', 'linear', function() {
	$(this).remove();
	});
	});*/

	session = {};
	session.data = {};
	session.user = "";
	//Initialization processes
	resetViewport();
	$("#logout").hide();
	$("#logoutText").hide();
	//End of Initialization processes

	//Function executed when clicking on "Sign up" to register a new account
	$("#register").click(function () {
		resetViewport();
		$("#registerContainer").show();
	});
	
	$("#log").click(function(){
		resetViewport();
		if($("#loginText").is(":visible")){
			resetViewport();
			$("#loginContainer").show();
		}else{
			resetViewport();
			$("#logoutContainer").show();
		}
	});
	
	function resetViewport(){
		$("#registerContainer").hide();
		resetRegister();
		$("#loginContainer").hide();
		$("#logoutContainer").hide();
	}
	
	$("#loginSubmitButton").click(function(){
		$("*").css("pointer-events", "none");
		$("*").remove(".error");
		var Email = document.getElementById("loginEmail").value;
		var Pass = document.getElementById("loginPassword").value;
		$.post("loginUser.php", {
					username : Username,
					password : Pass
				}, function (dataL) {
					//test if the user was successfully logged in
					if (!("trueL".localeCompare(dataL))) {
						resetViewport();
						resetLogin();
						$("#loginText").fadeOut(function(){
							$("#logoutText").fadeIn();
						});
						$("#register").animate({
							width : "toggle",
							paddingRight : "toggle",
							paddingLeft : "toggle",
							opacity : "toggle",
							boarderRadius : "toggle"
						});
						session.user = document.getElementById("registerUsername").value;
						//if user not logged in correctly, empty form inputs and output error message
					} else {
						resetLogin();
						reportError("login", dataL);
					}
				})
		
	})
	
	function resetLogin(){
		document.getElementById("loginEmail").value = "";
		document.getElementById("loginPassword").value = "";
		$("*").remove(".error");
		$("*").css("pointer-events", "auto");
	}
	
	function resetRegister(){
		document.getElementById("registerEmail").value = "";
		document.getElementById("registerUsername").value = "";
		document.getElementById("registerPassword").value = "";
		document.getElementById("registerPasswordConfirm").value = "";
		$("*").remove(".error");
		$("*").css("pointer-events", "auto");
	}
	
	function reportError(location, err){
		if("" != err){
			$("#" + location + "ErrorBox").append("<p class='error'>" + err + "<p>");
		}
	}

	//Function executed when submitting a register form
	$("#registerSubmitButton").click(function () {
		$("*").css("pointer-events", "none");
		$("*").remove(".error");
		var Email = document.getElementById("registerEmail").value;
		var Username = document.getElementById("registerUsername").value;
		var Pass = document.getElementById("registerPassword").value;
		var PassConfirm = document.getElementById("registerPasswordConfirm").value;
		//verify inputs
		var re = /\S+@\S+\.\S+/;
		if(!(re.test(Email))){
			resetRegister();
			reportError("register", "Invalid Email Address!");
			return;
		}
		if(Username.length < 3){
			resetRegister();
			reportError("register", "Invalid Username! Usernames Must be at Least 3 Characters Long.");
			return;
		}
		if(Pass.length < 5){
			resetRegister();
			reportError("register", "Invalid Password! Passwords Must be at Least 5 Characters Long.");
			return;
		}
		if(Pass != PassConfirm){
			resetRegister();
			reportError("register", "Passwords Don't Match!");
			return;
		}
		//submit to createUser.php
		$.post("createUser.php", {
			email : Email,
			username : Username,
			password : Pass,
			passwordConfirm : PassConfirm
		}, function (dataR) {
			//test if the user was successfully created
			if (!("trueR".localeCompare(dataR))) {
				$.post("loginUser.php", {
					username : Username,
					password : Pass
				}, function (dataL) {
					//test if the user was successfully logged in
					if (!("trueL".localeCompare(dataL))) {
						resetViewport();
						resetRegister();
						$("#loginText").fadeOut(function(){
							$("#logoutText").fadeIn();
						});
						$("#register").animate({
							width : "toggle",
							paddingRight : "toggle",
							paddingLeft : "toggle",
							opacity : "toggle",
							boarderRadius : "toggle"
						});
						session.user = document.getElementById("registerUsername").value;
						//if user not logged in correctly, empty form inputs and output error message
					} else {
						resetRegister();
						reportError("register", dataL);
					}
				})
				//if user not created correctly, empty forum inputs and output error message
			} else {
				resetRegister();
				reportError("register", dataR);
			}
		})
	});
	
	//Function executed when clicking on the menuBox.
	$("#menuBox").toggle(function(){
		$("#barTop").toggleClass("rotateDown45").animate({marginRight: "-6px"});
		$("#barMiddle").toggleClass("fade");
		$("#barBottom").toggleClass("rotateUp45").animate({marginRight: "-6px"});
	}, function(){
		$("#barTop").toggleClass("rotateDown45").animate({marginRight: "5px"});
		$("#barMiddle").toggleClass("fade");
		$("#barBottom").toggleClass("rotateUp45").animate({marginRight: "5px"});
	});
});
