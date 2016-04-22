$(document).ready(function(){

	/*$('#clickme').click(function() {
		$('#book').animate({
			opacity: 0, // animate slideUp
			marginLeft: '-200px'
			}, 'slow', 'linear', function() {
			$(this).remove();
		});
	});*/
	
	//Initialization processes
	$("#registerContainer").hide();
	//End of Initialization processes
	
	//Function exectued when clicking on "Sign up" to register a new account
	$("#register").click(function(){
		$("#registerContainer").show();
	});
	
	//Function executed when submitting a register form
	$("#registerSubmitButton").click(function(){
		if(document.getElementById("registerPassword").value == document.getElementById("registerPasswordConfirm").value){
				$("#registerSubmitButton").css("pointer-events", "none");
				$.post("createUser.php", {
					email: document.getElementById("registerEmail").value,
					username: document.getElementById("registerUsername").value,
					password: document.getElementById("registerPassword").value
				}, function(dataR){
					console.log(dataR);
					if(!("trueR".localeCompare(dataR))){
						$.post("loginUser.php", {
							username: document.getElementById("registerUsername").value,
							password: document.getElementById("registerPassword").value
						}, function(dataL){
							console.log(dataL);
							if(!("trueL".localeCompare(dataL))){
								console.log("success");
								$("#registerSubmitButton").css("pointer-events", "auto");
							}
						})
					}
				})
			}else{
				
			}
	});
});