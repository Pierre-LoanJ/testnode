
$(document).ready(function() {
   $('li').click(function(e) {
   	e.preventDefault();

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

	$('.changeProfilePic').click(function(e) {
		e.preventDefault();
		$('#photoUploader').modal('toggle');
		$('#photoUploader').modal('show');
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