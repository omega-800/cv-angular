// Displays selected age Verification Method
function selectAgeVerification(select){
	// Get the selected option
	var selectedOptionValue = $(select).val();

  	// Add the 'hidden' class to all forms that don't match the selected option value
  	$('.age-verification > div').not('.' + selectedOptionValue).addClass('hidden');

  	// Remove the 'hidden' class from the form that matches the selected option value
  	$('.age-verification > div.' + selectedOptionValue).removeClass('hidden');
}

