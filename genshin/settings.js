// Toggle the settings menu when the button is clicked
document.getElementById('settings-btn').addEventListener('click', function() {
	const settingsMenu = document.getElementById('settings-menu');
	settingsMenu.classList.toggle('open');
});

// Load saved settings from localStorage
window.onload = function() {
	const travelerSelect = document.getElementById('traveler-select');
	if (travelerSelect) {
		const savedTraveler = localStorage.getItem('traveler') || 'female'; // Default to 'female' if no saved setting
		travelerSelect.value = savedTraveler;
		updateTraveler(savedTraveler);
	}

	const layoutToggle = document.getElementById('layoutToggle');
	if (layoutToggle) {
		const savedLayout = localStorage.getItem('layout') || 'column'; // Default to 'column' if no saved setting
		layoutToggle.checked = savedLayout === 'row';
	}

	const includeUpcomingToggle = document.getElementById('includeUpcomingToggle');
	if (includeUpcomingToggle) {
		const savedIncludeUpcoming = localStorage.getItem('includeUpcoming') || 'false'; // Default to 'false' if no saved setting
		includeUpcomingToggle.checked = savedIncludeUpcoming === 'true';
	}
};

// Update the traveler when the user selects a new option
const travelerSelect = document.getElementById('traveler-select');
if (travelerSelect) {
	travelerSelect.addEventListener('change', function() {
		const selectedTraveler = this.value;
		localStorage.setItem('traveler', selectedTraveler);
		updateTraveler(selectedTraveler);

		// Reload the page after changing the traveler setting
		location.reload();
	});
}

// Function to update the traveler display
function updateTraveler(traveler) {
	console.log(`Traveler set to: ${traveler}`); // Example output, replace with actual implementation
}



// Save layout preference and apply it
const layoutToggle = document.getElementById('layoutToggle');
if (layoutToggle) {
	layoutToggle.addEventListener('change', () => {
		const layout = layoutToggle.checked ? 'row' : 'column';
		localStorage.setItem('layout', layout);

		document.querySelectorAll('.materials').forEach(material => {
			material.style.flexDirection = layout;
			material.style.paddingLeft = layout === 'row' ? '0' : '1em';
		});

		document.querySelectorAll('.character').forEach(character => {
			character.style.width = layout === 'row' ? '44rem' : '24rem';
		});
	});
}

// Function to update the includeUpcoming display
function updateIncludeUpcoming(includeUpcoming) {
	console.log(`includeUpcoming set to: ${includeUpcoming}`); // Example output, replace with actual implementation
}

// Save includeUpcoming preference and apply it
const includeUpcomingToggle = document.getElementById('includeUpcomingToggle');
if (includeUpcomingToggle) {
	includeUpcomingToggle.addEventListener('change', () => {
		const includeUpcoming = includeUpcomingToggle.checked ? 'true' : 'false';
		localStorage.setItem('includeUpcoming', includeUpcoming);
		updateIncludeUpcoming(includeUpcoming);

		// Reload the page after changing the includeUpcoming setting
		location.reload();
	});
}