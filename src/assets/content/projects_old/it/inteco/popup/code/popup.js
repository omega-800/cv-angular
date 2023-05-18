window.addEventListener('DOMContentLoaded', (event) => {
    displayAgePopup();
});

function displayAgePopup(){
	if (localStorage.getItem("ageConfirmed") === null){
		$("#confirmAge").css("display", "block");
		$("#confirmAgeSmall").css("display", "block");
	}
}

function setAgeConfirmation(){
	$("#confirmAge").css("display", "none");
	$("#confirmAgeSmall").css("display", "none");
	localStorage.setItem('ageConfirmed', 'confirmed');
}