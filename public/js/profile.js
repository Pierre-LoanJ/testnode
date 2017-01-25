
$(document).ready(function() {
   $('li').click(function(e) {
   	e.preventDefault();

   	var oldLongClass = $('.active')[0].className;
   	var oldShortClass = oldLongClass.replace('active', '').trim();
   	var clkClass = $(this).attr('class');

   	if (oldLongClass != clkClass) {
	   	var lnkCntBloc = clkClass.substring('active').trim() + '-bloc';

	   	//affiche le bloc lié cliqué et cache l'ancien
		$('.' + oldShortClass + '-bloc').css('display', 'none');
		$('.' + lnkCntBloc).css('display', 'block');

		// gère la nav - remove classes from all and add class to the one we clicked
	    $('li').removeClass('active');
	    $(this).addClass('active');
   	}

   });

	$('.changeProfilePic').click(function(e) {
		e.preventDefault();
		$('#photoUploader').modal('toggle');
		$('#photoUploader').modal('show');
	});
});