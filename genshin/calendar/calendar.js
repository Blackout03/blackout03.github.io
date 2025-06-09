const daysInMonth = [
	31,  // January
	29,  // February
	31,  // March
	30,  // April
	31,  // May
	30,  // June
	31,  // July
	31,  // August
	30,  // September
	31,  // October
	30,  // November
	31   // December
];

// Function to fetch character data from JSON files
Promise.all([
	fetch('https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/character_data.json').then(response => response.json()),
	fetch('https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/image_mapping_data.json').then(response => response.json())
])
	.then(([characterData, imageMappingData]) => {
		const includeUpcomingCharacters = localStorage.getItem('includeUpcoming') === 'true'; // Check if it's the string 'true'
		const userBirthday = localStorage.getItem('birthday'); // User's Birthday.


		let data = characterData.characters;
		// Organize characters by birthday
		const birthdayMap = {};
		data
			.filter(character => {
				// If '?upcoming' is present, include all characters
				if (includeUpcomingCharacters) return true;
				// Only include characters that do not have an upcoming banner and have a version field in reruns
				return character.reruns.some(rerun => rerun.version) &&
					!character.reruns.some(rerun => rerun.banner === 'upcoming');
			})
			.forEach(character => {
				const birthday = character.birthday; // format: mm-dd
				if (!birthdayMap[birthday]) {
					birthdayMap[birthday] = [];
				}
				birthdayMap[birthday].push(character);
			});

		// Helper function to get image ID from imageMappingData.json or fallback to itemName
		function getImageId(itemName) {
			if (itemName === "Traveler") {
				// Get the traveler setting from localStorage, defaulting to 'female' if not set
				const traveler = localStorage.getItem('traveler') || 'female';
				// Return the appropriate image name based on the traveler setting
				return traveler === 'female' ? 'PlayerGirl' : 'PlayerBoy';
			}

			// Fallback to the image mapping data for other items
			return imageMappingData.Characters[itemName] || itemName;
		}

		function createCharacterImage(character) {
			const characterName = getImageId(character.name, imageMappingData);
			const characterImageLink =
				createLink(['item-link'],
					`https://genshin-impact.fandom.com/wiki/${character.name}`);
			const characterImage =
				createImage(['character-image', character.star === 5 && character.starType ? 'special-star-image' : character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
					`https://api.hakush.in/gi/UI/UI_AvatarIcon_${characterName}.webp`,
					`${character.name} avatar`,
					character.name)
			characterImageLink.appendChild(characterImage)
			return characterImageLink;
		}

		if (userBirthday) {
			if (!birthdayMap[userBirthday]) {
				birthdayMap[userBirthday] = [];
			}
			birthdayMap[userBirthday].push({
				name: 'Traveler',
				star: 5
			});
		}

		// Create calendar structure
		const calendarDiv = document.getElementById('calendar');
		for (let month = 1; month <= 12; month++) {
			const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });
			const monthDiv = document.createElement('div');
			monthDiv.classList.add('month');
			const monthHeader = document.createElement('h2');
			monthHeader.textContent = monthName;
			monthDiv.appendChild(monthHeader);

			// Create a container for the day elements
			const daysContainer = document.createElement('div');
			daysContainer.classList.add('days-container'); // Add class for styling

			for (let day = 1; day <= daysInMonth[month - 1]; day++) {
				const dateString = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
				const dayDiv = document.createElement('div');
				dayDiv.classList.add('day');
				dayDiv.textContent = day;
				const characterContainer = document.createElement('div');
				characterContainer.classList.add('character-container');

				if (birthdayMap[dateString]) {

					birthdayMap[dateString].forEach(character => {
						const img = createCharacterImage(character);
						characterContainer.appendChild(img);
					});
				}

				dayDiv.appendChild(characterContainer);
				daysContainer.appendChild(dayDiv);
			}

			monthDiv.appendChild(daysContainer)
			calendarDiv.appendChild(monthDiv);
		}
	})
	.catch(error => console.error('Error fetching character data:', error));
