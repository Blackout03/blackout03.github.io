// Toggle the settings menu when the button is clicked
document.getElementById('settings-btn').addEventListener('click', function() {
	const settingsMenu = document.getElementById('settings-menu');
	settingsMenu.classList.toggle('open');
});

// Load saved settings from localStorage
window.onload = function() {
	const savedTrailblazer = localStorage.getItem('trailblazer') || 'female'; // Default to 'female' if no saved setting
	document.getElementById('trailblazer-select').value = savedTrailblazer;
	updateTrailblazer(savedTrailblazer);
	const includeUpcoming = localStorage.getItem('includeUpcoming') || 'false'; // Default to 'false' if no saved setting
	document.getElementById('includeUpcomingToggle').checked = includeUpcoming === 'true';
};

// Update the trailblazer when the user selects a new option
document.getElementById('trailblazer-select').addEventListener('change', function() {
	const selectedTrailblazer = this.value;
	localStorage.setItem('trailblazer', selectedTrailblazer);
	updateTrailblazer(selectedTrailblazer);

	// Reload the page after changing the trailblazer setting
	location.reload();
});

// Function to update the trailblazer display
function updateTrailblazer(trailblazer) {
	// You can add your logic here to switch the traveler on your website
	console.log(`Trailblazer set to: ${trailblazer}`); // Example output, replace with actual implementation
}

// Function to update the includeUpcoming display
function updateIncludeUpcoming(includeUpcoming) {
	// You can add your logic here to switch the traveler on your website
	console.log(`includeUpcoming set to: ${includeUpcoming}`); // Example output, replace with actual implementation
}




const includeUpcomingToggle = document.getElementById('includeUpcomingToggle');

// Save layout preference and apply it
includeUpcomingToggle.addEventListener('change', () => {
	const includeUpcoming = includeUpcomingToggle.checked ? 'true' : 'false';
	localStorage.setItem('includeUpcoming', includeUpcoming);
	updateIncludeUpcoming(includeUpcoming);

	// Reload the page after changing the includeUpcoming setting
	location.reload();
});