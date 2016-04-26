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
	$("#registerContainer").hide();
	$("#logout").hide();
	$("#logoutText").hide();
	//End of Initialization processes

	//Function executed when clicking on "Sign up" to register a new account
	$("#register").click(function () {
		$("#registerContainer").show();
	});

	//Function executed when submitting a register form
	$("#registerSubmitButton").click(function () {
		$("*").css("pointer-events", "none");
		$("*").remove(".error");
		//submit to createUser.php
		$.post("createUser.php", {
			email : document.getElementById("registerEmail").value,
			username : document.getElementById("registerUsername").value,
			password : document.getElementById("registerPassword").value,
			passwordConfirm : document.getElementById("registerPasswordConfirm").value
		}, function (dataR) {
			//test if the user was successfully created
			if (!("trueR".localeCompare(dataR))) {
				$.post("loginUser.php", {
					username : document.getElementById("registerUsername").value,
					password : document.getElementById("registerPassword").value
				}, function (dataL) {
					//test if the user was successfully logged in
					if (!("trueL".localeCompare(dataL))) {
						$("#registerContainer").hide();
						document.getElementById("registerEmail").value = "";
						document.getElementById("registerUsername").value = "";
						document.getElementById("registerPassword").value = "";
						document.getElementById("registerPasswordConfirm").value = "";
						$("#log").removeClass("in");
						$("#log").addClass("out");
						$("*").css("pointer-events", "auto");
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
						
						//if user not logged in correctly, empty form inputs and output error message
					} else {
						document.getElementById("registerEmail").value = "";
						document.getElementById("registerUsername").value = "";
						document.getElementById("registerPassword").value = "";
						document.getElementById("registerPasswordConfirm").value = "";
						$("#registerErrorBox").append("<p class='error'>" + dataL + "<p>")
						$("*").css("pointer-events", "auto");
					}
				})
				//if user not created correctly, empty forum inputs and output error message
			} else {
				document.getElementById("registerEmail").value = "";
				document.getElementById("registerUsername").value = "";
				document.getElementById("registerPassword").value = "";
				document.getElementById("registerPasswordConfirm").value = "";
				$("#registerErrorBox").append("<p class='error'>" + dataR + "<p>")
				$("*").css("pointer-events", "auto");
			}
		})
	});

});
