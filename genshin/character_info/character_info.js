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

// Function to create an image element for a character
function createCharacterImage(character, characterName) {
	const characterImageLink =
		createLink(['item-link'],
			`https://genshin-impact.fandom.com/wiki/${getCharacterName(character.name, character.element)}`);
	const characterImage =
		createImage(['character-image', character.star === 5 && character.starType ? 'special-star-image' : character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
			`https://homdgcat.wiki/homdgcat-res/Avatar/UI_AvatarIcon_${characterName}.png`,
			`${character.name} avatar`,
			character.name)
	characterImageLink.appendChild(characterImage)
	return characterImageLink;
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

// Function to create an image element with a number overlay
function createNumberedItemImageTitle(classNames = [], src = '', alt = '', title = '', number = '') {
	const wrapperDiv = createDiv(['item-wrapper']);

	// Create the image element
	const image = createImage(classNames, src, alt, title)

	// Create the number overlay
	const numberDiv = createDiv(['item-number'], number);

	// Append the image and number to the wrapper
	wrapperDiv.appendChild(image);
	wrapperDiv.appendChild(numberDiv);

	return wrapperDiv;
}

// Function to create an image element with a number overlay
function createNumberedItemImage(classNames = [], src = '', alt = '', number = '') {
	return createNumberedItemImageTitle(classNames, src, alt, alt, number)
}

// Function to fetch character data from JSON file
Promise.all([
	fetch('../character_data.json').then(response => response.json()),
	fetch('../image_data.json').then(response => response.json())
])
	.then(([characterData, imageData]) => {
		const charactersContainer = document.getElementById('charactersContainer');
		const urlParams = new URLSearchParams(window.location.search);
		const includeUpcomingCharacters = urlParams.has('includeUpcoming'); // Check if '?upcoming' is in the URL

		// Helper function to get image ID from imageData.json or fallback to itemName
		function getImageId(itemName) {
			return imageData[itemName] || itemName;
		}

		characterData.characters
			.filter(character => {
				// If '?upcoming' is present, include all characters
				if (includeUpcomingCharacters) return true;
				// Otherwise, exclude characters with an upcoming banner
				return !character.reruns.some(rerun => rerun.banner === 'upcoming');
			})
			.forEach(character => {
				// Only display characters with materials
				if (character.materials && character.materials.length > 0) {
					// Create a div for the character
					const characterDiv = document.createElement('div');
					characterDiv.classList.add('character');

					// Create a div for the character details (name, weapon, element)
					const detailsDiv = document.createElement('div');
					detailsDiv.classList.add('details');

					const characterImageName = getImageId(character.name);

					// Append character image
					const characterImage = createCharacterImage(character, characterImageName);
					detailsDiv.appendChild(characterImage);

					// Create a div for the character details (name, weapon, element)
					const detailsRightDiv = document.createElement('div');
					detailsRightDiv.classList.add('details-right');

					// Create character name element
					const characterNameLink =
						createLink(['item-link'],
							`https://genshin-impact.fandom.com/wiki/${getCharacterName(character.name, character.element)}`);
					const characterName = createElement('h2', '', character.name, '', getCharacterName(character.name, character.element));
					characterNameLink.appendChild(characterName);
					detailsRightDiv.appendChild(characterNameLink);

					// Create a div for weapon and element icons
					const iconsDiv = document.createElement('div');
					iconsDiv.classList.add('icons');

					// Append weapon image
					const weaponImage = createWeaponImage(character.weapon);
					iconsDiv.appendChild(weaponImage);

					// Append element image
					const elementImage = createElementImage(character.element);
					iconsDiv.appendChild(elementImage);

					// Append the icons to details div
					detailsRightDiv.appendChild(iconsDiv);

					// Append details right to details div
					detailsDiv.appendChild(detailsRightDiv);

					// Append details to character div
					characterDiv.appendChild(detailsDiv);

					// Create materials div
					const materialsDiv = document.createElement('div');
					materialsDiv.classList.add('materials');

					// Append materials details
					character.materials.forEach(material => {
						// Create a list for materials
						const materialList = document.createElement('ul');

						// Display Enemy Drops materials with image if they exist
						if (material.enemyDrop) {
							const enemyDrop = material.enemyDrop[0];
							const enemyDropItem = document.createElement('li');

							let enemyImage, dropImage1, dropImage2, dropImage3;

							if (material.enemyDrop2) {
								enemyImage =
									createImage(['enemy-image'],
										`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(enemyDrop.enemyName)}.png`,
										enemyDrop.enemyName);
								dropImage1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName1)}.png`,
										enemyDrop.itemName1,
										18);
								dropImage2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName2)}.png`,
										enemyDrop.itemName2,
										30);
								dropImage3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName3)}.png`,
										enemyDrop.itemName3,
										36);
							} else {
								enemyImage =
									createImage(['enemy-image'],
										`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(enemyDrop.enemyName)}.png`,
										enemyDrop.enemyName);
								dropImage1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName1)}.png`,
										enemyDrop.itemName1,
										36);
								dropImage2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName2)}.png`,
										enemyDrop.itemName2,
										96);
								dropImage3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName3)}.png`,
										enemyDrop.itemName3,
										129);
							}

							const enemyImageLink =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${enemyDrop.enemyName}`);
							const dropImage1Link =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName1}`);
							const dropImage2Link =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName2}`);
							const dropImage3Link =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName3}`);

							enemyImageLink.appendChild(enemyImage);
							dropImage1Link.appendChild(dropImage1);
							dropImage2Link.appendChild(dropImage2);
							dropImage3Link.appendChild(dropImage3);
							enemyDropItem.appendChild(enemyImageLink);
							enemyDropItem.appendChild(dropImage1Link);
							enemyDropItem.appendChild(dropImage2Link);
							enemyDropItem.appendChild(dropImage3Link);
							const enemyDropItemText =
								createDiv(['item-text', 'enemy-drop-text'], '',
									`<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${enemyDrop.enemyName}"><bold>${enemyDrop.enemyName}</bold>:</a><br>
										${enemyDrop.shortItemName}`);
							enemyDropItem.appendChild(enemyDropItemText);
							materialList.appendChild(enemyDropItem);
						}

						// Display Enemy Drops materials with image if they exist
						if (material.enemyDrop2) {
							const enemyDrop = material.enemyDrop2[0];
							const enemyDropItem = document.createElement('li');

							if (character.name === "Traveler" && character.element === "Geo") {
								const enemyImage =
									createImage(['enemy-image'],
										`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(enemyDrop.enemyName)}.png`,
										enemyDrop.enemyName);
								const dropImage1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName1)}.png`,
										enemyDrop.itemName1,
										6);
								const dropImage2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName2)}.png`,
										enemyDrop.itemName2,
										22);
								const dropImage3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName3)}.png`,
										enemyDrop.itemName3,
										31);
								const enemy2Image =
									createImage(['enemy-image'],
										`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(enemyDrop.enemy2Name)}.png`,
										enemyDrop.enemy2Name);
								const drop2Image1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.item2Name1)}.png`,
										enemyDrop.item2Name1,
										12);
								const drop2Image2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.item2Name2)}.png`,
										enemyDrop.item2Name2,
										44);
								const drop2Image3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.item2Name3)}.png`,
										enemyDrop.item2Name3,
										62);

								const enemyImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.enemyName}`);
								const dropImage1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName1}`);
								const dropImage2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName2}`);
								const dropImage3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName3}`);
								const enemy2ImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.enemy2Name}`);
								const drop2Image1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.item2Name1}`);
								const drop2Image2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.item2Name2}`);
								const drop2Image3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.item2Name3}`);

								const row1 = createSpan('row1');
								const row2 = createSpan('row2');
								const div = createDiv(['geo-traveler-enemy-drop']);
								enemyImageLink.appendChild(enemyImage);
								dropImage1Link.appendChild(dropImage1);
								dropImage2Link.appendChild(dropImage2);
								dropImage3Link.appendChild(dropImage3);
								enemy2ImageLink.appendChild(enemy2Image);
								drop2Image1Link.appendChild(drop2Image1);
								drop2Image2Link.appendChild(drop2Image2);
								drop2Image3Link.appendChild(drop2Image3);
								row1.appendChild(enemyImageLink);
								row1.appendChild(dropImage1Link);
								row1.appendChild(dropImage2Link);
								row1.appendChild(dropImage3Link);
								row1.appendChild(enemy2ImageLink);
								row1.appendChild(drop2Image1Link);
								row1.appendChild(drop2Image2Link);
								row1.appendChild(drop2Image3Link);
								div.appendChild(row1);
								div.appendChild(row2);
								enemyDropItem.appendChild(div);
								const enemyDropItemText =
									createDiv(['item-text', 'enemy-drop-text'], '',
										`<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${enemyDrop.enemyName}"><bold>${enemyDrop.enemyName}</bold>:</a><br>
										${enemyDrop.shortItemName}<br>
										<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${enemyDrop.enemy2Name}"><bold>${enemyDrop.enemy2Name}</bold>:</a><br>
										${enemyDrop.shortItem2Name}`);
								enemyDropItem.appendChild(enemyDropItemText);
							} else {
								const enemyImage =
									createImage(['enemy-image'],
										`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(enemyDrop.enemyName)}.png`,
										enemyDrop.enemyName);
								const dropImage1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName1)}.png`,
										enemyDrop.itemName1,
										18);
								const dropImage2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName2)}.png`,
										enemyDrop.itemName2,
										66);
								const dropImage3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop.itemName3)}.png`,
										enemyDrop.itemName3,
										93);

								const enemyImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.enemyName}`);
								const dropImage1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName1}`);
								const dropImage2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName2}`);
								const dropImage3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${enemyDrop.itemName3}`);

								enemyImageLink.appendChild(enemyImage);
								dropImage1Link.appendChild(dropImage1);
								dropImage2Link.appendChild(dropImage2);
								dropImage3Link.appendChild(dropImage3);
								enemyDropItem.appendChild(enemyImageLink);
								enemyDropItem.appendChild(dropImage1Link);
								enemyDropItem.appendChild(dropImage2Link);
								enemyDropItem.appendChild(dropImage3Link);
								const enemyDropItemText =
									createDiv(['item-text', 'enemy-drop-text'], '',
										`<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${enemyDrop.enemyName}"><bold>${enemyDrop.enemyName}</bold>:</a><br>
										${enemyDrop.shortItemName}`);
								enemyDropItem.appendChild(enemyDropItemText);
							}

							materialList.appendChild(enemyDropItem);
						}

						// Display Normal Boss materials with image if they exist
						if (material.normalBoss) {
							const normalBoss = material.normalBoss[0];
							const normalBossItem = document.createElement('li');

							const normalBossImage =
								createImage(['enemy-image'],
									`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(normalBoss.bossName)}.png`,
									normalBoss.bossName);
							const itemImage =
								createNumberedItemImage('item-image',
									`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(normalBoss.itemName)}.png`,
									normalBoss.itemName,
									46);

							const normalBossImageLink =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${normalBoss.bossName}`);
							const itemImageLink =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${normalBoss.itemName}`);

							normalBossImageLink.appendChild(normalBossImage);
							itemImageLink.appendChild(itemImage);
							normalBossItem.appendChild(normalBossImageLink);
							normalBossItem.appendChild(itemImageLink);
							const normalBossItemText =
								createDiv(['item-text', 'normal-boss-text'], '',
									`<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${normalBoss.bossName}"><bold>${normalBoss.bossName.replace('Algorithm of Semi-Intransient Matrix of Overseer Network', 'ASIMON').replace('Secret Source Automaton', 'Secret Source')}</bold>:</a><br>
										<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${normalBoss.itemName}">${normalBoss.itemName.replace('Artificed Spare Clockwork Component', 'Clockwork Component')}</a>`);
							normalBossItem.appendChild(normalBossItemText);
							materialList.appendChild(normalBossItem);
						}

						// Display Weekly Boss materials with image if they exist
						if (material.weeklyBoss) {
							const weeklyBoss = material.weeklyBoss[0];
							const weeklyBossItem = document.createElement('li');

							if (character.name === "Traveler" && character.element === "Geo") {
								const weeklyBossImage =
									createImage(['enemy-image'],
										`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(weeklyBoss.bossName)}.png`,
										weeklyBoss.bossName);
								const itemImage =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(weeklyBoss.itemName)}.png`,
										weeklyBoss.itemName,
										6);
								const weeklyBoss2Image =
									createImage(['enemy-image'],
										`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(weeklyBoss.boss2Name)}.png`,
										weeklyBoss.boss2Name);
								const item2Image =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(weeklyBoss.item2Name)}.png`,
										weeklyBoss.item2Name,
										18);

								const weeklyBossImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${weeklyBoss.bossName}`);
								const itemImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${weeklyBoss.itemName}`);
								const weeklyBoss2ImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${weeklyBoss.boss2Name}`);
								const item2ImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${weeklyBoss.item2Name}`);

								const row1 = createSpan('row1');
								const row2 = createSpan('row2');
								const div = createDiv(['geo-traveler-weekly-boss']);
								weeklyBossImageLink.appendChild(weeklyBossImage);
								itemImageLink.appendChild(itemImage);
								weeklyBoss2ImageLink.appendChild(weeklyBoss2Image);
								item2ImageLink.appendChild(item2Image);
								row1.appendChild(weeklyBossImageLink);
								row1.appendChild(itemImageLink);
								row2.appendChild(weeklyBoss2ImageLink);
								row2.appendChild(item2ImageLink);
								div.appendChild(row1);
								div.appendChild(row2);
								weeklyBossItem.appendChild(div);
								const weeklyBossItemText =
									createDiv(['item-text', 'weekly-boss-text'], '',
										`<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${weeklyBoss.bossName}"><bold>${weeklyBoss.bossName.replace(' (Weekly Boss)', '').replace(' Dvalin', '')}</bold>:</a><br>
										<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${weeklyBoss.itemName}">${weeklyBoss.itemName}</a><br>
										<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${weeklyBoss.boss2Name}"><bold>${weeklyBoss.boss2Name.replace(' (Weekly Boss)', '').replace(' Dvalin', '')}</bold>:</a><br>
										<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${weeklyBoss.item2Name}">${weeklyBoss.item2Name}</a>`);
								weeklyBossItem.appendChild(weeklyBossItemText);
							} else if (character.name === "Traveler" && character.element === "Pyro") {
								const itemImage =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(weeklyBoss.itemName)}.png`,
										weeklyBoss.itemName,
										12);

								const itemImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${weeklyBoss.itemName}`);

								const row1 = createSpan('row1');
								const row2 = createSpan('row2');
								const div = createDiv(['pyro-traveler-weekly-boss']);
								itemImageLink.appendChild(itemImage);
								div.appendChild(itemImageLink);
								weeklyBossItem.appendChild(div);
								const weeklyBossItemText =
									createDiv(['item-text', 'weekly-boss-text'], '',
										`<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${weeklyBoss.itemName}">${weeklyBoss.itemName}</a>`);
								weeklyBossItem.appendChild(weeklyBossItemText);
							} else {
								const weeklyBossImage =
									createImage(['enemy-image'],
										`https://homdgcat.wiki/homdgcat-res/monster/${getImageId(weeklyBoss.bossName)}.png`,
										weeklyBoss.bossName);
								const itemImage =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(weeklyBoss.itemName)}.png`,
										weeklyBoss.itemName,
										18);

								const weeklyBossImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${weeklyBoss.bossName}`);
								const itemImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${weeklyBoss.itemName}`);

								weeklyBossImageLink.appendChild(weeklyBossImage);
								itemImageLink.appendChild(itemImage);
								weeklyBossItem.appendChild(weeklyBossImageLink);
								weeklyBossItem.appendChild(itemImageLink);
								const weeklyBossItemText =
									createDiv(['item-text', 'weekly-boss-text'], '',
										`<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${weeklyBoss.bossName}"><bold>${weeklyBoss.bossName.replace(' (Weekly Boss)', '').replace(' Dvalin', '')}</bold>:</a><br>
										<a class="item-link" href="https://genshin-impact.fandom.com/wiki/${weeklyBoss.itemName}">${weeklyBoss.itemName}</a>`);
								weeklyBossItem.appendChild(weeklyBossItemText);
							}

							materialList.appendChild(weeklyBossItem);
						}

						// Display Talent Books materials with image if they exist
						if (material.talentBooks) {
							const talentBooks = material.talentBooks[0];
							const talentBooksItem = document.createElement('li');

							const teachingsImage =
								createNumberedItemImage('item-image',
									`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.teachingsName)}.png`,
									talentBooks.teachingsName,
									9);
							const guideImage =
								createNumberedItemImage('item-image',
									`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guideName)}.png`,
									talentBooks.guideName,
									63);
							const philosophiesImage =
								createNumberedItemImage('item-image',
									`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophiesName)}.png`,
									talentBooks.philosophiesName,
									114);

							const teachingsImageLink =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${talentBooks.teachingsName}`);
							const guideImageLink =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${talentBooks.guideName}`);
							const philosophiesImageLink =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophiesName}`);

							teachingsImageLink.appendChild(teachingsImage);
							guideImageLink.appendChild(guideImage);
							philosophiesImageLink.appendChild(philosophiesImage);
							talentBooksItem.appendChild(teachingsImageLink);
							talentBooksItem.appendChild(guideImageLink);
							talentBooksItem.appendChild(philosophiesImageLink);
							const talentBooksItemLink =
								createLink(['item-link'],
									'https://genshin-impact.fandom.com/wiki/' + talentBooks.shortItemName + '_Books');
							const talentBooksItemText =
								createDiv(['item-text', 'talent-books-text'], '',
									`<bold>Talent Books</bold>: ${talentBooks.shortItemName}`);
							talentBooksItemLink.appendChild(talentBooksItemText);
							talentBooksItem.appendChild(talentBooksItemLink);
							materialList.appendChild(talentBooksItem);
						}

						// Display Talent Books for Traveler materials with image if they exist
						if (material.travelerTalentBooks) {
							const talentBooks = material.travelerTalentBooks[0];
							const talentBooksItem = document.createElement('li');

							if (character.element === "Geo") {
								const teachingsImage =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.teachingsName)}.png`,
										talentBooks.teachingsName,
										3);
								const guideImage1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guideName1)}.png`,
										talentBooks.guideName1,
										11);
								const guideImage2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guideName2)}.png`,
										talentBooks.guideName2,
										4);
								const guideImage3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guideName3)}.png`,
										talentBooks.guideName3,
										6);
								const philosophiesImage1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophiesName1)}.png`,
										talentBooks.philosophiesName1,
										20);
								const philosophiesImage2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophiesName2)}.png`,
										talentBooks.philosophiesName2,
										6);
								const philosophiesImage3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophiesName3)}.png`,
										talentBooks.philosophiesName3,
										12);
								const teachings2Image =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.teachings2Name)}.png`,
										talentBooks.teachings2Name,
										6);
								const guide2Image1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guide2Name1)}.png`,
										talentBooks.guide2Name1,
										22);
								const guide2Image2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guide2Name2)}.png`,
										talentBooks.guide2Name2,
										8);
								const guide2Image3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guide2Name3)}.png`,
										talentBooks.guide2Name3,
										12);
								const philosophies2Image1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophies2Name1)}.png`,
										talentBooks.philosophies2Name1,
										40);
								const philosophies2Image2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophies2Name2)}.png`,
										talentBooks.philosophies2Name2,
										12);
								const philosophies2Image3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophies2Name3)}.png`,
										talentBooks.philosophies2Name3,
										24);

								const teachingsImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.teachingsName}`);
								const guideImage1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guideName1}`);
								const guideImage2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guideName2}`);
								const guideImage3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guideName3}`);
								const philosophiesImage1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophiesName1}`);
								const philosophiesImage2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophiesName2}`);
								const philosophiesImage3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophiesName3}`);
								const teachings2ImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.teachings2Name}`);
								const guide2Image1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guide2Name1}`);
								const guide2Image2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guide2Name2}`);
								const guide2Image3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guide2Name3}`);
								const philosophies2Image1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophies2Name1}`);
								const philosophies2Image2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophies2Name2}`);
								const philosophies2Image3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophies2Name3}`);

								const row1 = createSpan('row1');
								const row2 = createSpan('row2');
								const div = createDiv(['geo-traveler-talent-books']);
								teachingsImageLink.appendChild(teachingsImage);
								guideImage1Link.appendChild(guideImage1);
								guideImage2Link.appendChild(guideImage2);
								guideImage3Link.appendChild(guideImage3);
								philosophiesImage1Link.appendChild(philosophiesImage1);
								philosophiesImage2Link.appendChild(philosophiesImage2);
								philosophiesImage3Link.appendChild(philosophiesImage3);
								teachings2ImageLink.appendChild(teachings2Image);
								guide2Image1Link.appendChild(guide2Image1);
								guide2Image2Link.appendChild(guide2Image2);
								guide2Image3Link.appendChild(guide2Image3);
								philosophies2Image1Link.appendChild(philosophies2Image1);
								philosophies2Image2Link.appendChild(philosophies2Image2);
								philosophies2Image3Link.appendChild(philosophies2Image3);
								row1.appendChild(teachingsImageLink);
								row1.appendChild(guideImage1Link);
								row1.appendChild(guideImage2Link);
								row1.appendChild(guideImage3Link);
								row1.appendChild(philosophiesImage1Link);
								row1.appendChild(philosophiesImage2Link);
								row1.appendChild(philosophiesImage3Link);
								row2.appendChild(teachings2ImageLink);
								row2.appendChild(guide2Image1Link);
								row2.appendChild(guide2Image2Link);
								row2.appendChild(guide2Image3Link);
								row2.appendChild(philosophies2Image1Link);
								row2.appendChild(philosophies2Image2Link);
								row2.appendChild(philosophies2Image3Link);
								div.appendChild(row1);
								div.appendChild(row2);
								talentBooksItem.appendChild(div);
							} else {
								const teachingsImage =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.teachingsName)}.png`,
										talentBooks.teachingsName,
										9);
								const guideImage1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guideName1)}.png`,
										talentBooks.guideName1,
										33);
								const guideImage2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guideName2)}.png`,
										talentBooks.guideName2,
										12);
								const guideImage3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.guideName3)}.png`,
										talentBooks.guideName3,
										18);
								const philosophiesImage1 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophiesName1)}.png`,
										talentBooks.philosophiesName1,
										60);
								const philosophiesImage2 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophiesName2)}.png`,
										talentBooks.philosophiesName2,
										18);
								const philosophiesImage3 =
									createNumberedItemImage('item-image',
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talentBooks.philosophiesName3)}.png`,
										talentBooks.philosophiesName3,
										36);

								const teachingsImageLink =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.teachingsName}`);
								const guideImage1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guideName1}`);
								const guideImage2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guideName2}`);
								const guideImage3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.guideName3}`);
								const philosophiesImage1Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophiesName1}`);
								const philosophiesImage2Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophiesName2}`);
								const philosophiesImage3Link =
									createLink(['item-link'],
										`https://genshin-impact.fandom.com/wiki/${talentBooks.philosophiesName3}`);

								teachingsImageLink.appendChild(teachingsImage);
								guideImage1Link.appendChild(guideImage1);
								guideImage2Link.appendChild(guideImage2);
								guideImage3Link.appendChild(guideImage3);
								philosophiesImage1Link.appendChild(philosophiesImage1);
								philosophiesImage2Link.appendChild(philosophiesImage2);
								philosophiesImage3Link.appendChild(philosophiesImage3);
								talentBooksItem.appendChild(teachingsImageLink);
								talentBooksItem.appendChild(guideImage1Link);
								talentBooksItem.appendChild(guideImage2Link);
								talentBooksItem.appendChild(guideImage3Link);
								talentBooksItem.appendChild(philosophiesImage1Link);
								talentBooksItem.appendChild(philosophiesImage2Link);
								talentBooksItem.appendChild(philosophiesImage3Link);
							}

							const talentBooksItemText =
								createDiv(['item-text', 'talent-books-text'], '',
									`<bold>Talent Books</bold>`);
							talentBooksItem.appendChild(talentBooksItemText);
							materialList.appendChild(talentBooksItem);
						}

						// Display Local Specialty with image if it exists
						if (material.localSpecialty) {
							const localSpecialty = material.localSpecialty[0];
							const localSpecialtyItem = document.createElement('li');

							const localSpecialtyImage =
								createNumberedItemImage('item-image',
									`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(localSpecialty.itemName)}.png`,
									localSpecialty.itemName,
									168);

							const localSpecialtyImageLink =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${localSpecialty.itemName}`);

							localSpecialtyImageLink.appendChild(localSpecialtyImage);
							localSpecialtyItem.appendChild(localSpecialtyImageLink);
							const localSpecialtyItemLink =
								createLink(['item-link'],
									`https://genshin-impact.fandom.com/wiki/${localSpecialty.itemName}`);
							const localSpecialtyItemText =
								createDiv(['item-text', 'local-specialty-text'], '',
									`<bold>Local Specialty</bold>: ${localSpecialty.itemName}`);
							localSpecialtyItemLink.appendChild(localSpecialtyItemText);
							localSpecialtyItem.appendChild(localSpecialtyItemLink);
							materialList.appendChild(localSpecialtyItem);
						}

						// Append material list to materials div
						materialsDiv.appendChild(materialList);
					});

					// Append materials div to character div
					characterDiv.appendChild(materialsDiv);

					// Append character div to container
					charactersContainer.appendChild(characterDiv);
				}
			});
	})
	.catch(error => console.error('Error fetching character data:', error));
