// Function to create an image element for a character
function getCharacterName(characterName, characterElement) {
	if (characterName === "Traveler") {
		let travelerName
		if (characterElement === "Anemo") {
			travelerName = "Traveler (Anemo)"
		} else if (characterElement === "Cryo") {
			travelerName = "Traveler (Cryo)"
		} else if (characterElement === "Dendro") {
			travelerName = "Traveler (Dendro)"
		} else if (characterElement === "Electro") {
			travelerName = "Traveler (Electro)"
		} else if (characterElement === "Geo") {
			travelerName = "Traveler (Geo)"
		} else if (characterElement === "Hydro") {
			travelerName = "Traveler (Hydro)"
		} else if (characterElement === "Pyro") {
			travelerName = "Traveler (Pyro)"
		}
		return travelerName
	}
	return characterName
}

// Function to create an image element for the character's path type
function createPathImage(path) {
	const pathImageLink =
		createLink(['item-link'],
			`https://honkai-star-rail.fandom.com/wiki/${path}`);
	const pathImage =
		createImage('path-image',
			`https://homdgcat.wiki/images/Paths/${path}.png`,
			path);
	pathImageLink.appendChild(pathImage)
	return pathImageLink;
}

// Function to create an image element for the character's type
function createTypeImage(type) {
	const typeIcons = {
		"Fire": "Fire",
		"Ice": "Ice",
		"Imaginary": "Imaginary",
		"Lightning": "Elec",
		"Physical": "Phys",
		"Wind": "Wind",
		"Quantum": "Quantum"
	};
	const typeImageLink =
		createLink(['item-link'],
			`https://honkai-star-rail.fandom.com/wiki/${type}`);
	const typeImage =
		createImage('type-image',
			`https://homdgcat.wiki/images/Element/${typeIcons[type]}.png`,
			type);
	typeImageLink.appendChild(typeImage)
	return typeImageLink;
}

// Combined event listener for both dropdowns
function checkJsonData() {
	Promise.all([
		fetch('../character_data.json').then(response => response.json()),
		fetch('../image_mapping_data.json').then(response => response.json())
	])
		.then(([characterData, imageMappingData]) => {
			// const urlParams = new URLSearchParams(window.location.search);
			// const includeUpcomingCharacters = urlParams.has('includeUpcoming'); // Check if '?upcoming' is in the URL

			// Helper function to get image ID from imageMappingData.json or fallback to itemName
			function getImageId(itemName, imageMappingData) {
				return imageMappingData[itemName] || itemName;
			}

			// Function to create an image element for a character
			function createCharacterImage(character) {
				const characterName = getImageId(character.name, imageMappingData);
				const characterImageLink =
					createLink(['item-link'],
						`https://honkai-star-rail.fandom.com/wiki/${getCharacterName(character.name, character.type)}`);
				const characterImage =
					createImage(['character-image', character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
						`https://homdgcat.wiki/images/avataricon/avatar/${characterName}.png`,
						`${character.name} avatar`,
						`${getCharacterName(character.name, character.type)}`);
				characterImageLink.appendChild(characterImage);
				return characterImageLink;
			}

			const table = document.getElementById('character-table');
			const paths = ["Destruction", "Abundance", "Preservation", "Nihility", "Remembrance", "Erudition", "The Hunt", "Harmony"];
			const types = ["Fire", "Ice", "Imaginary", "Lightning", "Physical", "Quantum", "Wind"];

			// Create table header (types as top row)
			const headerRow = table.querySelector('thead tr');
			const headerCell = createElement('th');
			headerRow.appendChild(headerCell);

			types.forEach(type => {
				const th = createElement('th');
				const typeImage = createTypeImage(type);
				th.appendChild(typeImage);
				headerRow.appendChild(th);
			});

			// Create rows for paths (left column)
			const tbody = table.querySelector('tbody');
			paths.forEach(path => {
				const row = createElement('tr');
				const pathHeader = createElement('th');
				const pathImage = createPathImage(path);
				pathHeader.appendChild(pathImage);
				row.appendChild(pathHeader);

				// Add empty cells for each type
				types.forEach(() => {
					row.appendChild(createElement('td'));
				});
				tbody.appendChild(row);
			});

			// Sort and group characters by star type and star rating
			const sortedCharacters = characterData.characters
				.filter(character => {
					// Get the includeUpcoming setting from localStorage, defaulting to 'false' if not set
					const includeUpcomingCharacters = localStorage.getItem('includeUpcoming') || 'false';

					if (includeUpcomingCharacters === 'false')
						return !character.reruns.some(rerun => rerun.banner === 'upcoming');

					// Otherwise, include characters with an upcoming banner
					return includeUpcomingCharacters;
					
				})
				.sort((a, b) => {
					// Sort by star rating first (5 stars, then 4 stars)
					if (a.star === 5 && b.star !== 5) return -1;
					if (a.star !== 5 && b.star === 5) return 1;
					// Sort 4-stars after 5-stars
					if (a.star === 4 && b.star === 4) return 0;
					return a.star - b.star;
				});

			// Sort characters by their first banner date
			sortedCharacters
				.forEach(character => {
					console.log(character)
					const row = tbody.querySelector(`tr:has(th img[alt*="${character.path}"])`);
					if (row) {
						const cell = row.querySelector(`td:nth-child(${types.indexOf(character.type) + 2})`);
						if (cell) {
							const characterImage = createCharacterImage(character);
							cell.appendChild(characterImage);
						}
					}
				});
		})
		.catch(error => console.error('Error loading JSON data:', error));
}

checkJsonData();
