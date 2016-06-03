$(document).ready(function(){
	/* NEW GAME is pressed */
	$("#new-game").click(function() {
		$("#new-game").hide();
		$("#load-game").hide();
		$("#easy-game").show();
		$("#easy-game").css("display","block");
		$("#hard-game").show();
		$("#hard-game").css("display","block");
	});
});