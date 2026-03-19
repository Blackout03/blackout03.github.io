let userId = localStorage.getItem('uid') || '';

const apiUrl = userId
	? `https://stardb.gg/api/gi/wishes/${userId}`
	: null;

if (!apiUrl) {
	document.getElementById("characters-container").innerHTML = '<p>Please enter a UID in settings to view data.</p>';
	document.getElementById("weapons-container").innerHTML = '<p>Please enter a UID in settings to view data.</p>';
	throw new Error('No UID provided.');
}
const imageMappingDataUrl = "https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/image_mapping_data.json";

let imageMappingData = {
	Characters: {},
	Weapons: {}
};

// Fetch the image data mapping
fetch(imageMappingDataUrl)
	.then(response => response.json())
	.then(data => {
		imageMappingData = data;
	})
	.catch(error => {
		console.error("Failed to load image data:", error);
	});

// Utility lookup
function getImageId(itemName, type) {

	if (type === "character") {
		return imageMappingData.Characters?.[itemName] || itemName;
	}

	if (type === "weapon") {

		const weaponCategories = imageMappingData.Weapons || {};

		for (const category in weaponCategories) {
			if (weaponCategories[category][itemName]) {
				return weaponCategories[category][itemName];
			}
		}

	}

	return itemName;
}

function createImage(classes, src, alt, title) {
	const img = document.createElement("img");
	img.classList.add(...classes);
	img.src = src;
	img.alt = alt;
	img.title = title;
	return img;
}

function createLink(classes, href) {
	const a = document.createElement("a");
	a.classList.add(...classes);
	a.href = href;
	a.target = "_blank";
	return a;
}

function createCharacterImage(character, characterName) {

	const characterImageLink = createLink(
		["item-link"],
		`https://genshin-impact.fandom.com/wiki/${character.name}`
	);

	const characterImage = createImage(
		[
			"character-image",
			character.rarity === 5 && character.special
				? "special-star-image"
				: character.rarity === 5
					? "five-star-image"
					: "four-star-image"
		],
		`https://whiteineffa.gitlab.io/gi/Images/Avatar/UI_AvatarIcon_${characterName}.png`,
		`${character.name} avatar`,
		character.name
	);

	characterImageLink.appendChild(characterImage);

	return characterImageLink;
}

function createWeaponImage(weapon, weaponName) {

	const weaponImageLink = createLink(
		["item-link"],
		`https://genshin-impact.fandom.com/wiki/${weapon.name}`
	);

	const switchImage = (imageElement) => {

		let isAwakened = false;

		setInterval(() => {

			const baseImageUrl = `https://whiteineffa.gitlab.io/gi/Images/Weapon/UI_EquipIcon_${weaponName}.png`;
			const awakenedImageUrl = `https://whiteineffa.gitlab.io/gi/Images/Weapon/UI_EquipIcon_${weaponName}_Awaken.png`;

			imageElement.src = isAwakened ? baseImageUrl : awakenedImageUrl;

			isAwakened = !isAwakened;

		}, 2000);

	};

	const weaponImage = createImage(
		[
			"weapon-image",
			weapon.rarity === 5
				? "five-star-weapon-image"
				: weapon.rarity === 4
					? "four-star-weapon-image"
					: weapon.rarity === 3
						? "three-star-weapon-image"
						: "unknown-star-weapon-image"
		],
		`https://whiteineffa.gitlab.io/gi/Images/Weapon/UI_EquipIcon_${weaponName}.png`,
		`${weapon.name} icon`,
		weapon.name
	);

	switchImage(weaponImage);

	weaponImageLink.appendChild(weaponImage);

	return weaponImageLink;
}

fetch(apiUrl)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		const characters = {};
		const weapons = {};

		// Check if all categories are empty
		const allEmpty = Object.values(data).every(
			categoryArray => Array.isArray(categoryArray) && categoryArray.length === 0
		);

		if (allEmpty) {
			const message = `<p>No wish data found. Please use <a class="item-link" href="https://stardb.gg/en/genshin/wish-tracker" target="_blank">stardb.gg wish tracker</a> to import your wishes.</p>`;
			document.getElementById("characters-container").innerHTML = message;
			document.getElementById("weapons-container").innerHTML = message;
			return; // Stop further processing
		}

		for (const category in data) {

			if (Array.isArray(data[category])) {

				data[category].forEach(entry => {

					// Remove early non-5★ wishes for UID 889565459
					if (userId === "889565459") {

						const cutoffId = BigInt("1706245560000127459");
						const entryId = BigInt(entry.id);

						if (entryId < cutoffId && entry.rarity !== 5) {
							return; // skip entry entirely
						}

					}

					if (entry.type === "character") {

						if (!characters[entry.name]) {
							characters[entry.name] = {
								count: 0,
								rarity: entry.rarity
							};
						}

						characters[entry.name].count++;

					}
					else if (entry.type === "weapon") {

						if (!weapons[entry.name]) {
							weapons[entry.name] = {
								count: 0,
								rarity: entry.rarity
							};
						}

						weapons[entry.name].count++;

					}

				});

			}

		}

		function sortByRarityAndCount(a, b) {

			if (b[1].rarity !== a[1].rarity) {
				return b[1].rarity - a[1].rarity;
			}

			return b[1].count - a[1].count;

		}

		// Display characters
		const charactersContainer = document.getElementById("characters-container");
		const charactersList = document.createElement("ul");

		Object.entries(characters)
			.sort(sortByRarityAndCount)
			.forEach(([name, info]) => {

				const characterImageName = getImageId(name, "character");

				const listItem = document.createElement("li");

				listItem.appendChild(
					createCharacterImage(
						{ name: name, rarity: info.rarity },
						characterImageName
					)
				);

				const nameCountSpan = document.createElement('span');
				nameCountSpan.classList.add('name-count');

				const nameSpan = document.createElement('span');
				nameSpan.classList.add('name');
				nameSpan.textContent = `${name} `;
				nameCountSpan.appendChild(nameSpan);

				const countSpan = document.createElement('span');
				countSpan.classList.add('count');
				countSpan.textContent = `×${info.count}`;
				nameCountSpan.appendChild(countSpan);
				
				listItem.appendChild(nameCountSpan);
				
				charactersList.appendChild(listItem);

			});

		charactersContainer.innerHTML = "";
		charactersContainer.appendChild(charactersList);

		// Display weapons
		const weaponsContainer = document.getElementById("weapons-container");
		const weaponsList = document.createElement("ul");

		Object.entries(weapons)
			.sort(sortByRarityAndCount)
			.forEach(([name, info]) => {

				const weaponImageName = getImageId(name, "weapon");

				const listItem = document.createElement("li");

				listItem.appendChild(
					createWeaponImage(
						{ name: name, rarity: info.rarity },
						weaponImageName
					)
				);

				const nameCountSpan = document.createElement('span');
				nameCountSpan.classList.add('name-count');

				const nameSpan = document.createElement('span');
				nameSpan.classList.add('name');
				nameSpan.textContent = `${name} `;
				nameCountSpan.appendChild(nameSpan);

				const countSpan = document.createElement('span');
				countSpan.classList.add('count');
				countSpan.textContent = `×${info.count}`;
				nameCountSpan.appendChild(countSpan);

				listItem.appendChild(nameCountSpan);
				
				weaponsList.appendChild(listItem);

			});

		weaponsContainer.innerHTML = "";
		weaponsContainer.appendChild(weaponsList);

	})
	.catch(error => {

		document.getElementById("characters-container").innerHTML = `<p>Error: ${error.message}</p>`;
		document.getElementById("weapons-container").innerHTML = `<p>Error: ${error.message}</p>`;

	});