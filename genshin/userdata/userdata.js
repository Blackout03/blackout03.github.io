// Get the user ID from the URL query parameter
const queryParams = new URLSearchParams(window.location.search);
const userId = queryParams.get("uid");

if (!userId) {
	document.getElementById("data-container").innerHTML = "<p>User ID not provided.</p>";
} else {
	const apiUrl = `https://stardb.gg/api/gi/wishes/${userId}`;
	const imageMappingDataUrl = '../image_mapping_data.json'; // JSON file mapping character names to their corresponding image IDs.

	let imageMappingData = {};

// Fetch the image data mapping
	fetch(imageMappingDataUrl)
		.then(response => response.json())
		.then(data => {
			imageMappingData = data;
		})
		.catch(error => {
			console.error('Failed to load image data:', error);
		});

// Utility functions
	function getImageId(itemName) {
		return imageMappingData[itemName] || itemName;
	}

	function createImage(classes, src, alt, title) {
		const img = document.createElement('img');
		img.classList.add(...classes);
		img.src = src;
		img.alt = alt;
		img.title = title;
		return img;
	}

	function createLink(classes, href) {
		const a = document.createElement('a');
		a.classList.add(...classes);
		a.href = href;
		a.target = '_blank';
		return a;
	}

	function createCharacterImage(character, characterName) {
		const characterImageLink = createLink(['item-link'], `https://genshin-impact.fandom.com/wiki/${character.name}`);
		const characterImage = createImage(
			[
				'character-image',
				character.rarity === 5 && character.special ? 'special-star-image' : character.rarity === 5 ? 'five-star-image' : 'four-star-image',
			],
			`https://api.hakush.in/gi/UI/UI_AvatarIcon_${characterName}.webp`,
			`${character.name} avatar`,
			character.name
		);
		characterImageLink.appendChild(characterImage);
		return characterImageLink;
	}

	function createWeaponImage(weapon, weaponName) {
		const weaponImageLink = createLink(
			['item-link'],
			`https://genshin-impact.fandom.com/wiki/${weapon.name}`
		);

		// Function to switch the weapon image source every 2 seconds
		const switchImage = (imageElement) => {
			let isAwakened = false; // State to track which image is being displayed

			setInterval(() => {
				const baseImageUrl = `https://homdgcat.wiki/homdgcat-res/Weapon/UI_EquipIcon_${weaponName}.png`;
				const awakenedImageUrl = `https://homdgcat.wiki/homdgcat-res/Weapon/UI_EquipIcon_${weaponName}_Awaken.png`;

				// Swap between the regular and awakened images
				imageElement.src = isAwakened ? baseImageUrl : awakenedImageUrl;
				isAwakened = !isAwakened; // Toggle between the two images
			}, 2000); // 2 seconds interval
		};

		const weaponImage = createImage(
			[
				'weapon-image',
				weapon.rarity === 5 ? 'five-star-image' : weapon.rarity === 4 ? 'four-star-image' : weapon.rarity === 3 ? 'three-star-image' : 'unknown-star-image',
			],
			`https://homdgcat.wiki/homdgcat-res/Weapon/UI_EquipIcon_${weaponName}.png`,
			`${weapon.name} icon`,
			weapon.name
		);

		// Call the switchImage function to handle the image swapping
		switchImage(weaponImage);

		weaponImageLink.appendChild(weaponImage);
		return weaponImageLink;
	}

	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			const characterCounts = {};
			const weaponCounts = {};

			for (const category in data) {
				if (Array.isArray(data[category])) {
					data[category].forEach(entry => {
						if (entry.type === 'character') {
							characterCounts[entry.name] = (characterCounts[entry.name] || 0) + 1;
						} else if (entry.type === 'weapon') {
							weaponCounts[entry.name] = (weaponCounts[entry.name] || 0) + 1;
						}
					});
				}
			}

			// Display characters
			const charactersContainer = document.getElementById('characters-container');
			const charactersList = document.createElement('ul');
			Object.entries(characterCounts).forEach(([name, count]) => {
				const characterImageName = getImageId(name);
				const listItem = document.createElement('li');
				listItem.appendChild(createCharacterImage({ name, rarity: 4 }, characterImageName)); // Adjust `rarity` dynamically if available
				listItem.appendChild(document.createTextNode(` ${name}: ${count}`));
				charactersList.appendChild(listItem);
			});
			charactersContainer.innerHTML = '';
			charactersContainer.appendChild(charactersList);

			// Display weapons
			const weaponsContainer = document.getElementById('weapons-container');
			const weaponsList = document.createElement('ul');
			Object.entries(weaponCounts).forEach(([name, count]) => {
				const weaponImageName = getImageId(name);
				const listItem = document.createElement('li');
				listItem.appendChild(createWeaponImage({ name, rarity: 4 }, weaponImageName)); // Adjust `rarity` dynamically if available
				listItem.appendChild(document.createTextNode(` ${name}: ${count}`));
				weaponsList.appendChild(listItem);
			});
			weaponsContainer.innerHTML = '';
			weaponsContainer.appendChild(weaponsList);
		})
		.catch(error => {
			document.getElementById('characters-container').innerHTML = `<p>Error: ${error.message}</p>`;
			document.getElementById('weapons-container').innerHTML = `<p>Error: ${error.message}</p>`;
		});
}
