$(document).ready(function () {

	/*$('#clickme').click(function() {
	$('#book').animate({
	opacity: 0, // animate slideUp
	marginLeft: '-200px'
	}, 'slow', 'linear', function() {
	$(this).remove();
	});
	});*/
	
	// Created JQuery Functions
	
	// This functions puts an element at the very right part of its parents.
	// This means that elements will start from the top right rather than top left
	$.fn.absoluteRight = function(){
		this.css("position","fixed");
		this.css("left", this.parent().width() - this.width() + "px");
		this.css("top", "50px");
		return this;
	}
	
	// End Of JQuery Functions
	screen = {};
	screen.page = "";
	
	session = {};
	session.data = {};
	session.user = "";
	//Initialization processes
	resetViewport();
	screen.page = "home";
	$("#logout").hide();
	$("#logoutText").hide();
	$("#menu").absoluteRight();
	$("#menu").hide();
	$("#usernameSpace").hide();
	//End of Initialization processes
	
	// Function which resents elements on risize
	$(window).bind("resize",function(){
		$("#menu").absoluteRight();
	})
	
	var keys = [];
	
	//tells you the keyCode of the key that is being pressed
	$(document).keydown(function(e){
		//alert(e.keyCode);
		keys[e.keyCode] = true;
		handleKeyDown(e);
	})

	//tells you the keyCode of the key that is being unpressed
	$(document).keyup(function(e){
		keys[e.keyCode] = false;
		handleKeyUp(e);
	})
	
	/* Key Codes
		Up Arrow		38
		Down Arrow		40
		Left Arrow		37
		Right Arrow		39

		A 				65
		B 				66
		C 				67
		D 				68
		S 				83
		W 				87
		
		Space			32
		Control			17
		Enter			16
		*/
	
	function handleKeyDown(e){
		keyNumb = e.keyCode;
		if(keyNumb == 13){
			if(screen.page == "login"){
				login();
			}
			if(screen.page == "register"){
				register();
			}
		}
	}
	
	function handleKeyUp(e){
		keyNumb = e.keyCode;
	}

	//Function executed when clicking on "Sign up" to register a new account
	$("#register").click(function () {
		resetViewport();
		screen.page = "register";
		$("#registerContainer").show();
	});
	
	$("#log").click(function(){
		if($("#loginText").is(":visible")){
			resetViewport();
			screen.page = "login";
			$("#loginContainer").show();
		}else{
			resetViewport();
			screen.page = "logout";
			$("#logoutContainer").show();
		}
	});
	
	function resetViewport(){
		$("#registerContainer").hide();
		resetRegister();
		$("#loginContainer").hide();
		$("#logoutContainer").hide();
	}
	
	$("#menuBox").click(function(){
		$("#menu").slideToggle();
	});
	
	//after someone logs in, loads the data atributed to the email.
	function loadSession(Email){
		$.post("loadUserData.php", {
			email: Email
		}, function(data){
			console.log(data);
			/*
			session.user = Username;
			$("#usernameSpace").text(Username);
			$("#usernameSpace").fadeIn();
			session.user = document.getElementById("registerUsername").value;
			*/
		})
	}
	
	function getUsername(Email){
		$.post("getUsername.php", {
			email: Email
		}, function(data){
			console.log(data);
			/*
			session.user = Username;
			$("#usernameSpace").text(Username);
			$("#usernameSpace").fadeIn();
			session.user = document.getElementById("registerUsername").value;
			*/
		})
	}
	
	function login(){
		$("*").css("pointer-events", "none");
		$("*").remove(".error");
		var Email = document.getElementById("loginEmail").value;
		var Pass = document.getElementById("loginPassword").value;
		$.post("loginUser.php", {
			email : Email,
			password : Pass
		}, function (dataL) {
			//test if the user was successfully logged in
			if (!("trueL".localeCompare(dataL))) {
				resetViewport();
				screen.page = "home"
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
				loadSession(Email);
				//if user not logged in correctly, empty form inputs and output error message
			} else {
				resetLogin();
				reportError("login", dataL);
			}
		})
	}
	
	$("#loginSubmitButton").click(function(){
		login();
	});
	
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
	
	function register(){
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
					email : Email,
					password : Pass
				}, function (dataL) {
					//test if the user was successfully logged in
					if (!("trueL".localeCompare(dataL))) {
						resetViewport();
						screen.page = "home"
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
						loadSession(Email);
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
	}

	//Function executed when submitting a register form
	$("#registerSubmitButton").click(function () {
		register();
	});
	
	function getUsername(Username){
		$.post("getUsername.php", {
			username: Username
		}, function(dataU) {
			
		})
	}
	
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
