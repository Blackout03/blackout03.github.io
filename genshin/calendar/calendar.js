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

function createCharacterImage(character, characterName) {
	const characterImageLink =
		createLink(['item-link'],
			`https://genshin-impact.fandom.com/wiki/${characterName}`);
	const characterImage =
		createImage(['character-image', character.star === 5 && character.starType ? 'special-star-image' : character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
			`https://homdgcat.wiki/homdgcat-res/Avatar/UI_AvatarIcon_${characterName}.png`,
			`${character.name} avatar`,
			character.name)
	characterImageLink.appendChild(characterImage)
	return characterImageLink;
}

// Function to fetch character data from JSON files
Promise.all([
	fetch('../character_data.json').then(response => response.json()),
	fetch('../image_mapping_data.json').then(response => response.json())
])
	.then(([characterData, imageMappingData]) => {
		console.log(characterData);
		let data = characterData.characters;
		// Organize characters by birthday
		const birthdayMap = {};
		data.forEach(character => {
			const birthday = character.birthday; // format: mm-dd
			if (!birthdayMap[birthday]) {
				birthdayMap[birthday] = [];
			}
			birthdayMap[birthday].push(character);
		});

		// Helper function to get image ID from imageMappingData.json or fallback to itemName
		function getImageId(itemName) {
			return imageMappingData[itemName] || itemName;
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
						const characterImageName = getImageId(character.name);
						const img = createCharacterImage(character, characterImageName);
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
