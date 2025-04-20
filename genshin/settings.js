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

	const ongoingToggle = document.getElementById('ongoingToggle');
	if (ongoingToggle) {
		const savedIsOngoing = localStorage.getItem('isOngoing') || 'true'; // Default to 'true' if no saved setting
		ongoingToggle.checked = savedIsOngoing === 'true';
	}

	const topLengthInput = document.getElementById('topLengthInput');
	if (topLengthInput) {
		const savedTop = localStorage.getItem('top') || '10'; // Default to '10' if no saved setting
		topLengthInput.value = savedTop;
	}

	const birthdayMonth = document.getElementById('birthdayMonth');
	const birthdayDay = document.getElementById('birthdayDay');

	const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	function updateDayOptions(month, selectedDay = null) {
		const days = daysInMonth[month];
		birthdayDay.innerHTML = '';
		for (let i = 1; i <= days; i++) {
			const option = document.createElement('option');
			const dayStr = i.toString().padStart(2, '0');
			option.value = dayStr;
			option.textContent = dayStr;
			if (selectedDay && i === parseInt(selectedDay)) {
				option.selected = true;
			}
			birthdayDay.appendChild(option);
		}
	}

	if (birthdayMonth && birthdayDay) {
		const savedBirthday = localStorage.getItem('birthday') || '01-01';
		const [savedMonth, savedDay] = savedBirthday.split('-');

		birthdayMonth.value = savedMonth;
		updateDayOptions(parseInt(savedMonth) - 1, savedDay);

		birthdayMonth.addEventListener('change', () => {
			const newMonthIndex = parseInt(birthdayMonth.value) - 1;
			const currentDay = parseInt(birthdayDay.value);
			const maxDay = daysInMonth[newMonthIndex];
			const validDay = Math.min(currentDay, maxDay).toString().padStart(2, '0');

			updateDayOptions(newMonthIndex, validDay);

			const newDate = `${birthdayMonth.value}-${validDay}`;
			localStorage.setItem('birthday', newDate);
			location.reload();
		});

		birthdayDay.addEventListener('change', () => {
			const newDate = `${birthdayMonth.value}-${birthdayDay.value}`;
			localStorage.setItem('birthday', newDate);
			location.reload();
		});
	}
};

// Update the traveler when the user selects a new option
const travelerSelect = document.getElementById('traveler-select');
if (travelerSelect) {
	travelerSelect.addEventListener('change', function() {
		const selectedTraveler = this.value;
		localStorage.setItem('traveler', selectedTraveler);

		// Reload the page after changing the traveler setting
		location.reload();
	});
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

// Save includeUpcoming preference and apply it
const includeUpcomingToggle = document.getElementById('includeUpcomingToggle');
if (includeUpcomingToggle) {
	includeUpcomingToggle.addEventListener('change', () => {
		const includeUpcoming = includeUpcomingToggle.checked ? 'true' : 'false';
		localStorage.setItem('includeUpcoming', includeUpcoming);

		// Reload the page after changing the includeUpcoming setting
		location.reload();
	});
}

//  Save isOngoing preference and apply it
const ongoingToggle = document.getElementById('ongoingToggle');
if (ongoingToggle) {
	ongoingToggle.addEventListener('change', () => {
		localStorage.setItem('isOngoing', ongoingToggle.checked ? 'true' : 'false');
		location.reload();
	});
}

// Save topLength preference and apply it
const topLengthInput = document.getElementById('topLengthInput');
if (topLengthInput) {
	topLengthInput.addEventListener('change', () => {
		localStorage.setItem('top', topLengthInput.value);
		location.reload();
	});
}
