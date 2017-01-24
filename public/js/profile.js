
$(document).ready(function() {
   $('li').click(function() {

   	var oldLongClass = $('.active')[0].className;
   	var oldShortClass = oldLongClass.replace('active', '').trim()
   	var clkClass = $(this).attr('class');
   	var lnkCntBloc = clkClass.substring('active').trim() + '-bloc';

   	//affiche le bloc lié cliqué et cache l'ancien
	$('.' + oldShortClass + '-bloc').css('display', 'none');
	$('.' + lnkCntBloc).css('display', 'block');

	// gère la nav - remove classes from all and add class to the one we clicked
      $('li').removeClass('active');
      $(this).addClass('active');
   });

	$('.changeProfilePic').click(function() {
		$('#prizePopup').modal('toggle');
		$('#prizePopup').modal('show');
		//$('#prizePopup').modal('hide');
	});


});








	/*$.ajax({
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
		});*/
	
/*
$('#_signInButton').click( function(e) {
	e.preventDefault();
	$.ajax({
			type: "GET",
			url: "/login"
		}).done(function(response) {});
	//$('#signInForm').css('display','inline'); //si le login est sur la meme page
});
*/


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