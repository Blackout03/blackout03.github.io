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

// Function to create an image element for the character's weapon type
function createWeaponImage(weapon) {
	const weaponIcons = {
		"Bow": "Skill_A_02",
		"Catalyst": "Skill_A_Catalyst_MD",
		"Claymore": "Skill_A_04",
		"Polearm": "Skill_A_03",
		"Sword": "Skill_A_01"
	};
	const weaponImageLink =
		createLink(['item-link'],
			`https://genshin-impact.fandom.com/wiki/${weapon}`);
	const weaponImage =
		createImage('weapon-image',
			`https://homdgcat.wiki/homdgcat-res/AvatarSkill/${weaponIcons[weapon]}.png`,
			weapon);
	weaponImageLink.appendChild(weaponImage)
	return weaponImageLink;
}

// Function to create an image element for the character's element type
function createElementImage(element) {
	const elementIcons = {
		"Anemo": "Wind",
		"Cryo": "Ice",
		"Dendro": "Grass",
		"Electro": "Elec",
		"Geo": "Rock",
		"Hydro": "Water",
		"Pyro": "Fire"
	};
	const elementImageLink =
		createLink(['item-link'],
			`https://genshin-impact.fandom.com/wiki/${element}`);
	const elementImage =
		createImage('element-image',
			`https://homdgcat.wiki/homdgcat-res/Csxylic/${elementIcons[element]}.png`,
			element);
	elementImageLink.appendChild(elementImage)
	return elementImageLink;
}

// Combined event listener for both dropdowns
function checkJsonData() {
	Promise.all([
		fetch('../character_data.json').then(response => response.json()),
		fetch('../image_mapping_data.json').then(response => response.json())
	])
		.then(([characterData, imageMappingData]) => {
			const urlParams = new URLSearchParams(window.location.search);
			const includeUpcomingCharacters = urlParams.has('includeUpcoming'); // Check if '?upcoming' is in the URL

			// Helper function to get image ID from imageMappingData.json or fallback to itemName
			function getImageId(itemName, imageMappingData) {
				return imageMappingData[itemName] || itemName;
			}

			// Function to create an image element for a character
			function createCharacterImage(character) {
				const characterName = getImageId(character.name, imageMappingData);
				const characterImageLink =
					createLink(['item-link'],
						`https://genshin-impact.fandom.com/wiki/${getCharacterName(character.name, character.element)}`);
				const characterImage =
					createImage(['character-image', character.star === 5 && character.starType ? 'special-star-image' : character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
						`https://homdgcat.wiki/homdgcat-res/Avatar/UI_AvatarIcon_${characterName}.png`,
						`${character.name} avatar`,
						`${getCharacterName(character.name, character.element)}`);
				characterImageLink.appendChild(characterImage);
				return characterImageLink;
			}

			const table = document.getElementById('character-table');
			const weaponTypes = ["Sword", "Claymore", "Polearm", "Bow", "Catalyst"];
			const elements = ["Anemo", "Cryo", "Dendro", "Electro", "Geo", "Hydro", "Pyro"];

			// Create table header (Elements as top row)
			const headerRow = table.querySelector('thead tr');
			const headerCell = createElement('th');
			headerRow.appendChild(headerCell);

			elements.forEach(element => {
				const th = createElement('th');
				const elementImage = createElementImage(element);
				th.appendChild(elementImage);
				headerRow.appendChild(th);
			});

			// Create rows for weapons (left column)
			const tbody = table.querySelector('tbody');
			weaponTypes.forEach(weapon => {
				const row = createElement('tr');
				const weaponHeader = createElement('th');
				const weaponImage = createWeaponImage(weapon);
				weaponHeader.appendChild(weaponImage);
				row.appendChild(weaponHeader);

				// Add empty cells for each element
				elements.forEach(() => {
					row.appendChild(createElement('td'));
				});
				tbody.appendChild(row);
			});

			// Sort and group characters by star type and star rating
			const sortedCharacters = characterData.characters
				.filter(character => {
					// If '?upcoming' is present, include all characters
					if (includeUpcomingCharacters) return true;
					// Otherwise, exclude characters with an upcoming banner
					return !character.reruns.some(rerun => rerun.banner === 'upcoming');
				})
				.sort((a, b) => {
					// Sort by star rating first (5 stars, then 4 stars)
					if (a.star === 5 && b.star !== 5) return -1;
					if (a.star !== 5 && b.star === 5) return 1;
					// Then sort by star type (special-star) if both are 5-star
					if (a.star === 5 && b.star === 5) {
						if (a.starType && !b.starType) return -1;
						if (!a.starType && b.starType) return 1;
					}
					// Sort 4-stars after 5-stars
					if (a.star === 4 && b.star === 4) return 0;
					return a.star - b.star;
				});

			// Sort characters by their first banner date
			sortedCharacters
				.forEach(character => {
					const row = tbody.querySelector(`tr:has(th img[alt*="${character.weapon}"])`);
					if (row) {
						const cell = row.querySelector(`td:nth-child(${elements.indexOf(character.element) + 2})`);
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
