$(document).ready(function(){
	/* NEW GAME is pressed */
	$("#new-game").click(function() {
		$("#new-game").hide();
		$("#easy-game").show();
		$("#easy-game").css("display","block");
		$("#hard-game").show();
		$("#hard-game").css("display","block");
	});
	/* EASY GAME is pressed */
	$("#easy-game").click(function() {
		$("#easy-game").hide();
		$("#hard-game").hide();
		$("#easy-instructions").show();
		$("#easy-instructions").css("display","block");
	});
	/* HARD GAME is pressed */
	$("#hard-game").click(function() {
		$("#easy-game").hide();
		$("#hard-game").hide();
		$("#hard-instructions").show();
		$("#hard-instructions").css("display","block");
	});
});