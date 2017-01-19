
	//$('div').on('click', function(e) {
   	$('.mydiv').click( function(e) {
		e.preventDefault();
	$.ajax({
			type: "POST",
			url: "saveTask",
			data: {
				method: 'task',
				action: 'save',
				form: ""
			}

		}).done(function(response) {
				//pour mettre à jour le li, on ne peut plus faire $(this) car $ fait référence à ajax ici
console.log("retour: " + response.codeRetour);
			$('.mydiv').append("<p>" + response.data[0].username + "<p>");
		});
	});

$('#signInButton').click( function(e) {
	e.preventDefault();
	$('#signInForm').css('display','inline');
});

/*$('.submitSignInForm').click( function(e) {
	e.preventDefault();
	var $user = $('')
		$.ajax({
			type: "POST",
			url: "login",
			data: {
				user: user,
				psw: psw
			}
		}).done(function(response) {});
});
*/