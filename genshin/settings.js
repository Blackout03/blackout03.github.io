// Toggle the settings menu when the button is clicked
document.getElementById('settings-btn').addEventListener('click', function() {
	const settingsMenu = document.getElementById('settings-menu');
	settingsMenu.classList.toggle('open');
});

// Load saved settings from localStorage
window.onload = function() {
	const savedTraveler = localStorage.getItem('traveler') || 'female'; // Default to 'female' if no saved setting
	document.getElementById('traveler-select').value = savedTraveler;
	updateTraveler(savedTraveler);
	const savedLayout = localStorage.getItem('layout') || 'column'; // Default to 'column' if no saved setting
	document.getElementById('layoutToggle').checked = savedLayout === 'row';
};

// Update the traveler when the user selects a new option
document.getElementById('traveler-select').addEventListener('change', function() {
	const selectedTraveler = this.value;
	localStorage.setItem('traveler', selectedTraveler);
	updateTraveler(selectedTraveler);

	// Reload the page after changing the traveler setting
	location.reload();
});

// Function to update the traveler display
function updateTraveler(traveler) {
	// You can add your logic here to switch the traveler on your website
	console.log(`Traveler set to: ${traveler}`); // Example output, replace with actual implementation
}




const layoutToggle = document.getElementById('layoutToggle');

// Save layout preference and apply it
layoutToggle.addEventListener('change', () => {
	const layout = layoutToggle.checked ? 'row' : 'column';
	localStorage.setItem('layout', layout);
	document.querySelectorAll('.materials').forEach(material => material.style.flexDirection = layout)
	document.querySelectorAll('.materials').forEach(material => material.style.paddingLeft = layout === 'row' ? '0' : '1em');
	document.querySelectorAll('.character').forEach(character => character.style.width = layout === 'row' ? '44rem' : '24rem');
});