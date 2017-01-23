
$(document).ready(function() {
/*$('.profile-usermenu .settings').click( function(e) {
	e.preventDefault();
	$('.col-sm-6').html($(".settings-bloc"));
	$( ".settings-bloc" ).css("display", "flex");
	});

$('.profile-usermenu .overview').click( function(e) {
	e.preventDefault();
	$('.col-sm-6').html($(".well"));
	$( ".settings-bloc" ).css("display", "none");
	$( ".well" ).css("display", "flex");
	});
*/

//$(function() {
   $('li').click(function() {

   	var oldEntireClass = $('.active')[0].className;
   	//var indexOfActive = oldEntireClass.indexOf('active');
   	var oldShortClass = oldEntireClass.replace('active', '').trim()
   	var classLabel = $(this).attr('class');
   	var contentLabel = classLabel.substring('active').trim() + '-bloc';

	var oldContent = $('.col-sm-6').html();
	$('.col-sm-6').html($('.' + contentLabel));
	$('.col-sm-6').append(oldContent);
	$('.' + oldShortClass + '-bloc').css('display', 'none');
	$('.' + contentLabel).css('display', 'flex');
   	      // remove classes from all
      $('li').removeClass('active');
      // add class to the one we clicked
      $(this).addClass('active');
   });
//});


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