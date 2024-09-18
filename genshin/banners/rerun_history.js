// Function to convert character name to snake_case
function toSnakeCase(name) {
	return name.toLowerCase().replace(/ /g, '_');
}

// Function to calculate the difference in months and days since the last rerun
function calculateMonthsAndDaysSince(endDate) {
	const now = new Date();
	const lastRerunEnd = new Date(endDate);

	let years = now.getFullYear() - lastRerunEnd.getFullYear();
	let months = now.getMonth() - lastRerunEnd.getMonth();
	let days = now.getDate() - lastRerunEnd.getDate();

	// Adjust if the current day of the month is before the rerun end day
	if (days < 0) {
		months -= 1;
		days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Get days in the previous month
	}

	// Adjust if the current month is before the rerun end month
	if (months < 0) {
		years -= 1;
		months += 12;
	}

	// Add the year difference to months (since each year adds 12 months)
	months += years * 12;

	// Return the time in months and days
	return { months, days };
}

// Function to calculate days since the last rerun
function calculateDaysSince(endDate) {
	const now = new Date();
	const lastRerunEnd = new Date(endDate);
	const timeDifference = now - lastRerunEnd;
	const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	return daysSince;
}

// Function to display character rerun information
function displayRerunInfo(rerunData) {
	const characterList = document.getElementById('character-list');
	rerunData.characters.forEach(character => {
		// Check if the reruns array is empty
		if (character.reruns.length === 0) {
			console.warn(`No reruns available for character: ${character.name}`);
			return; // Skip this character if there are no reruns
		}

		const lastRerun = character.reruns[character.reruns.length - 1];
		const daysSinceLastRerun = calculateDaysSince(lastRerun.endDate);
		const timeSinceLastRerun = calculateMonthsAndDaysSince(lastRerun.endDate);
		const snakeCaseName = toSnakeCase(character.name);

		// Create character card
		const characterCard = document.createElement('div');
		characterCard.classList.add('character-card');

		// Character image
		const imgElement = document.createElement('img');
		imgElement.src = `https://game-cdn.appsample.com/gim/avatars/${snakeCaseName}.png`;
		imgElement.alt = `${character.name} avatar`;
		imgElement.classList.add('character-image');

		// Create the character details container
		const characterDetails = document.createElement('div');
		characterDetails.classList.add('character-details');

		// Character name
		const nameElement = document.createElement('div');
		nameElement.classList.add('character-name');
		nameElement.textContent = character.name;

		// Rerun info
		const rerunInfoElement = document.createElement('div');
		rerunInfoElement.classList.add('rerun-info');
		rerunInfoElement.textContent = `Last Rerun: ${lastRerun.endDate} (Version ${lastRerun.version})`;

		// Wish type display
		const wishTypeElement = document.createElement('div');
		wishTypeElement.classList.add('wish-type');
		console.log(lastRerun.wishType)
		console.log(lastRerun.wishType === "chronicled")
		wishTypeElement.textContent = lastRerun.wishType === "chronicled" ? "Chronicled Wish" : "Event Wish";

		// Time since last rerun (in months and days)
		const timeSinceElement = document.createElement('div');
		timeSinceElement.classList.add('time-since');
		timeSinceElement.textContent = `Time since last rerun: ${timeSinceLastRerun.months} months, ${timeSinceLastRerun.days} days`;

		// Days since last rerun
		const daysSinceElement = document.createElement('div');
		daysSinceElement.classList.add('days-since');
		daysSinceElement.textContent = `Days since last rerun: ${daysSinceLastRerun} days`;

		// Append other info to card
		characterDetails.appendChild(nameElement);
		characterDetails.appendChild(rerunInfoElement);
		characterDetails.appendChild(wishTypeElement); // Append wish type at the bottom
		characterDetails.appendChild(timeSinceElement);
		characterDetails.appendChild(daysSinceElement);

		// Append image and name to card
		characterCard.appendChild(imgElement);
		characterCard.appendChild(characterDetails);

		// Append card to character list
		characterList.appendChild(characterCard);
	});
}

// Fetch JSON data from external file and display the rerun info
fetch('rerun_data.json')
	.then(response => response.json())
	.then(data => {
		displayRerunInfo(data);
	})
	.catch(error => console.error('Error fetching rerun data:', error));
