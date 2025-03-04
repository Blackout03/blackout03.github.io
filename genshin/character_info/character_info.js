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
			`https://api.hakush.in/gi/UI/UI_AvatarIcon_${characterName}.webp`,
			`${character.name} avatar`,
			`${getCharacterName(character.name, character.element)}`);
	characterImageLink.appendChild(characterImage);
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
			`https://api.hakush.in/gi/UI/${weaponIcons[weapon]}.webp`,
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
			`https://api.hakush.in/gi/UI/${element}.webp`,
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
	fetch('../image_mapping_data.json').then(response => response.json()),
	fetch('../material_mapping_data.json').then(response => response.json())
])
	.then(([characterData, imageMappingData, materialMappingData]) => {
		const charactersContainer = document.getElementById('charactersContainer');
		const urlParams = new URLSearchParams(window.location.search);
		const includeUpcomingCharacters = urlParams.has('includeUpcoming'); // Check if '?upcoming' is in the URL

		// Helper function to get image ID from imageMappingData.json or fallback to itemName
		function getImageId(itemName) {
			if (itemName === "Traveler") {
				// Get the traveler setting from localStorage, defaulting to 'female' if not set
				const traveler = localStorage.getItem('traveler') || 'female';
				// Return the appropriate image name based on the traveler setting
				return traveler === 'female' ? 'PlayerGirl' : 'PlayerBoy';
			}

			// Fallback to the image mapping data for other items
			return imageMappingData[itemName] || itemName;
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

					// Get the layout setting from localStorage, defaulting to 'column' if not set
					const layout = localStorage.getItem('layout') || 'column';
					if (layout === "row") {
						materialsDiv.style.flexDirection = 'row';
						materialsDiv.style.paddingLeft = '0';
						characterDiv.style.width = '44rem'
					} else if (layout === "column") {
						materialsDiv.style.flexDirection = 'column';
						materialsDiv.style.paddingLeft = '1em';
						characterDiv.style.width = '24rem'
					}

					const ascensionDiv = createDiv('ascension-div');
					const talentsDiv = createDiv('talents-div');

					// Append materials details
					character.materials.forEach(material => {
						// Display Enemy Drops materials with image if they exist
						if (material.ascension) {
							const ascensionHeader = createSpan('materials-main-text', 'Ascension:')
							ascensionDiv.appendChild(ascensionHeader);

							material.ascension.forEach(ascension => {
								const ascensionList = createDiv('ascension-materials');

								if (ascension.enemyDrop) {
									// Fetch the enemy drop data from materialMappingData
									const enemyDropData = materialMappingData[ascension.enemyDrop];

									if (enemyDropData) {
										// Create a div for the enemy drop
										const enemyDropDiv = document.createElement('div');
										const enemyHeader = createSpan('materials-secondary-text', 'Enemy Drop:');
										enemyDropDiv.appendChild(enemyHeader);

										// Create a div for the enemy
										const enemyDiv = document.createElement('div');
										enemyDiv.classList.add('enemy-div');

										// Add enemy image
										const enemyImage = createImage(
											'enemy-image',
											`https://api.hakush.in/gi/UI/${getImageId(enemyDropData.enemyName)}.webp`,
											enemyDropData.enemyName
										);
										const enemyImageLink =
											createLink(['item-link'],
												`https://genshin-impact.fandom.com/wiki/${enemyDropData.enemyName}`);
										enemyImageLink.appendChild(enemyImage);
										enemyDiv.appendChild(enemyImageLink);

										// Create a div for all enemy drops
										const enemyDropsDiv = createDiv('enemy-drops-div');

										// Define base quantities for each star level case
										let quantities = [18, 30, 36]; // 5-star

										// Add each enemy drop
										['itemName1', 'itemName2', 'itemName3'].forEach((key, index) => {
											const dropDiv = document.createElement('span');
											dropDiv.classList.add('drop-div');

											// Add drop image
											const dropImage = createNumberedItemImage(
												'item-image',
												`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDropData[key])}.png`,
												`${enemyDropData[key]} (x${quantities[index]})`,
												quantities[index]
											);
											const dropImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${enemyDropData[key]}`);

											// Add drop name
											const itemName = document.createElement('span');
											itemName.classList.add('item-name');
											itemName.textContent = `${enemyDropData[key]} (x${quantities[index]})`;
											const itemNameLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${enemyDropData[key]}`);

											dropImageLink.appendChild(dropImage);
											dropDiv.appendChild(dropImageLink);
											itemNameLink.appendChild(itemName);
											dropDiv.appendChild(itemNameLink);

											enemyDropsDiv.appendChild(dropDiv);
										});

										const dropItem = document.createElement('li');
										dropItem.appendChild(enemyDiv);
										dropItem.appendChild(enemyDropsDiv);

										enemyDropDiv.appendChild(dropItem);
										ascensionList.appendChild(enemyDropDiv);
									} else {
										console.error(`No data found for enemy drop: ${ascension.enemyDrop}`);
									}
								}

								if (ascension.normalBossDrop) {
									// Fetch the normal boss drop data from materialMappingData
									const normalBossDropData = materialMappingData[ascension.normalBossDrop];

									if (normalBossDropData) {
										// Create a div for the normal boss
										const normalBossDiv = document.createElement('div');
										const enemyHeader = createSpan('materials-secondary-text', 'Normal Boss Drop:');
										normalBossDiv.appendChild(enemyHeader);

										// Create a div for the enemy
										const enemyDiv = document.createElement('div');
										enemyDiv.classList.add('enemy-div');

										// Add enemy image
										const enemyImage = createImage(
											'enemy-image',
											normalBossDropData.bossName === "Coral Defenders" ? `../images/UI_MonsterIcon_Drake_Deepsea_TwinBossFight.webp` : `https://api.hakush.in/gi/UI/${getImageId(normalBossDropData.bossName)}.webp`,
											normalBossDropData.bossName
										);
										const enemyImageLink =
											createLink(['item-link'],
												`https://genshin-impact.fandom.com/wiki/${normalBossDropData.bossName}`);
										enemyImageLink.appendChild(enemyImage);
										enemyDiv.appendChild(enemyImageLink);

										// Create a div for all enemy drops
										const enemyDropsDiv = document.createElement('div');
										enemyDropsDiv.classList.add('enemy-drops-div');

										const dropDiv = document.createElement('span');
										dropDiv.classList.add('drop-div');

										// Add normal boss drop image
										const dropImage = createNumberedItemImage(
											'item-image',
											`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(normalBossDropData.itemName)}.png`,
											`${normalBossDropData.itemName} (x46)`,
											46
										);
										const dropImageLink =
											createLink(['item-link'],
												`https://genshin-impact.fandom.com/wiki/${normalBossDropData.itemName}`);

										// Add normal boss drop name
										const dropName = document.createElement('span');
										dropName.classList.add('item-name');
										dropName.textContent = `${normalBossDropData.itemName.replace('Artificed Spare Clockwork Component', 'Clockwork Component')} (x18)`;
										const dropNameLink =
											createLink(['item-link'],
												`https://genshin-impact.fandom.com/wiki/${normalBossDropData.itemName}`);

										dropImageLink.appendChild(dropImage);
										dropDiv.appendChild(dropImageLink);
										dropNameLink.appendChild(dropName);
										dropDiv.appendChild(dropNameLink);

										enemyDropsDiv.appendChild(dropDiv);

										const dropItem = document.createElement('li');
										dropItem.appendChild(enemyDiv);
										dropItem.appendChild(enemyDropsDiv);

										normalBossDiv.appendChild(dropItem);
										ascensionList.appendChild(normalBossDiv);
									} else {
										console.error(`No data found for normal boss drop: ${ascension.normalBossDrop}`);
									}
								}

								if (ascension.elementalGem) {
									// Fetch the elemental gem data from materialMappingData
									const elementalGemData = materialMappingData[ascension.elementalGem];

									if (elementalGemData) {
										// Create a div for the elemental gem
										const elementalGemDiv = createDiv();
										const gemHeader = createSpan('materials-secondary-text', 'Elemental Gem:');
										elementalGemDiv.appendChild(gemHeader);

										// Create a container for the items
										const gemsContainer = document.createElement('li');

										// Function to create a gem entry
										const createGemEntry = (star, gemName, count) => {
											const gemDiv = document.createElement('div');
											gemDiv.classList.add('gem-entry');

											const gemImage = createNumberedItemImage(
												['item-image', 'gem-image'],
												`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(gemName)}.png`,
												gemName,
												count
											);
											const gemLink = createLink(
												['item-link', 'inline-text'],
												`https://genshin-impact.fandom.com/wiki/${gemName}`
											);

											gemLink.appendChild(gemImage);
											gemDiv.appendChild(gemLink);

											return gemDiv;
										};

										// Add the elemental gem entries for each tier
										const gemEntries = [
											createGemEntry('2star', elementalGemData.star2, 1),
											createGemEntry('3star', elementalGemData.star3, 9),
											createGemEntry('4star', elementalGemData.star4, 9),
											createGemEntry('5star', elementalGemData.star5, 6)
										];

										// Append each gem entry to the gems container
										gemEntries.forEach(gemEntry => {
											if (gemEntry) gemsContainer.appendChild(gemEntry);
										});

										// Add drop name
										const itemName = createSpan(['item-name', 'item-name-gem']);
										itemName.textContent = `${ascension.elementalGem}`;
										const itemNameLink =
											createLink(['item-link'],
												`https://genshin-impact.fandom.com/wiki/${ascension.elementalGem}`);


										itemNameLink.appendChild(itemName);
										gemsContainer.appendChild(itemNameLink);

										elementalGemDiv.appendChild(gemsContainer);
										ascensionList.appendChild(elementalGemDiv);
									} else {
										console.error(`No data found for enemy drop: ${ascension.elementalGem}`);
									}
								}

								if (ascension.localSpecialty) {
									// Create a div for the local specialty
									const localSpecialtyDiv = createDiv();
									const localSpecialtyHeader = createSpan('materials-secondary-text', 'Local Specialty:');
									localSpecialtyDiv.appendChild(localSpecialtyHeader);

									// Create a container for the items
									const localSpecialtyContainer = document.createElement('li');

									const localSpecialtyImage = createNumberedItemImage(
										['item-image', 'gem-image'],
										`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(ascension.localSpecialty)}.png`,
										ascension.localSpecialty,
										168
									);
									const localSpecialtyLink = createLink(
										['item-link'],
										`https://genshin-impact.fandom.com/wiki/${ascension.localSpecialty}`
									);

									localSpecialtyLink.appendChild(localSpecialtyImage);
									localSpecialtyContainer.appendChild(localSpecialtyLink);

									// Add drop name
									const itemName = createSpan(['item-name', 'item-name-local-specialty']);
									itemName.textContent = `${ascension.localSpecialty} (x168)`;
									const itemNameLink =
										createLink(['item-link'],
											`https://genshin-impact.fandom.com/wiki/${ascension.localSpecialty}`);


									itemNameLink.appendChild(itemName);
									localSpecialtyContainer.appendChild(itemNameLink);

									localSpecialtyDiv.appendChild(localSpecialtyContainer);
									ascensionList.appendChild(localSpecialtyDiv);
								}

								ascensionDiv.appendChild(ascensionList)
							});
						}
						if (material.talents) {
							const talentsHeader = createSpan('materials-main-text', 'Talents:')
							talentsDiv.appendChild(talentsHeader);

							material.talents.forEach(talents => {
								const talentsList = document.createElement('div');
								talentsList.classList.add('talent-materials');

								if (talents.enemyDrop) {
									if (character.name === 'Traveler' && character.element === 'Geo') {
										// Fetch the enemy drop data from materialMappingData
										const enemyDropData = materialMappingData[talents.enemyDrop];
										const enemyDrop2Data = materialMappingData[talents.enemyDrop2];

										// Create a div for the enemy drop
										const enemyDropDiv = document.createElement('div');
										const enemyHeader = createSpan('materials-secondary-text', 'Enemy Drop:');
										enemyDropDiv.appendChild(enemyHeader);

										if (enemyDropData) {
											// Create a div for the enemy
											const enemyDiv = document.createElement('div');
											enemyDiv.classList.add('enemy-div');

											// Add enemy image
											const enemyImage = createImage(
												'enemy-image',
												`https://api.hakush.in/gi/UI/${getImageId(enemyDropData.enemyName)}.webp`,
												enemyDropData.enemyName
											);
											const enemyImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${enemyDropData.enemyName}`);
											enemyImageLink.appendChild(enemyImage);
											enemyDiv.appendChild(enemyImageLink);

											// Create a div for all enemy drops
											const enemyDropsDiv = createDiv('enemy-drops-div');

											// Define base quantities for each star level case
											let quantities = [6, 22, 31];

											// Add each enemy drop
											['itemName1', 'itemName2', 'itemName3'].forEach((key, index) => {
												const dropDiv = createSpan('drop-div');

												// Add drop image
												const dropImage = createNumberedItemImage(
													'item-image',
													`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDropData[key])}.png`,
													`${enemyDropData[key]} (x${quantities[index]})`,
													quantities[index]
												);
												const dropImageLink =
													createLink(['item-link'],
														`https://genshin-impact.fandom.com/wiki/${enemyDropData[key]}`);

												// Add drop name
												const itemName = document.createElement('span');
												itemName.classList.add('item-name');
												itemName.textContent = `${enemyDropData[key]} (x${quantities[index]})`;
												const itemNameLink =
													createLink(['item-link'],
														`https://genshin-impact.fandom.com/wiki/${enemyDropData[key]}`);

												dropImageLink.appendChild(dropImage);
												dropDiv.appendChild(dropImageLink);
												itemNameLink.appendChild(itemName);
												dropDiv.appendChild(itemNameLink);

												enemyDropsDiv.appendChild(dropDiv);
											});

											const dropItem = document.createElement('li');
											dropItem.appendChild(enemyDiv);
											dropItem.appendChild(enemyDropsDiv);

											enemyDropDiv.appendChild(dropItem);
										} else {
											console.error(`No data found for enemy drop: ${talent.enemyDrop}`);
										}

										if (enemyDrop2Data) {
											// Create a div for the enemy
											const enemy2Div = document.createElement('div');
											enemy2Div.classList.add('enemy-div');

											// Add enemy image
											const enemy2Image = createImage(
												'enemy-image',
												`https://api.hakush.in/gi/UI/${getImageId(enemyDrop2Data.enemyName)}.webp`,
												enemyDrop2Data.enemyName
											);
											const enemy2ImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${enemyDrop2Data.enemyName}`);
											enemy2ImageLink.appendChild(enemy2Image);
											enemy2Div.appendChild(enemy2ImageLink);

											// Create a div for all enemy drops
											const enemyDrops2Div = createDiv('enemy-drops-div');

											// Define base quantities for each star level case
											let quantities = [12, 44, 62];

											// Add each enemy drop
											['itemName1', 'itemName2', 'itemName3'].forEach((key, index) => {
												const drop2Div = createSpan('drop-div');

												// Add drop image
												const drop2Image = createNumberedItemImage(
													'item-image',
													`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDrop2Data[key])}.png`,
													`${enemyDrop2Data[key]} (x${quantities[index]})`,
													quantities[index]
												);
												const drop2ImageLink =
													createLink(['item-link'],
														`https://genshin-impact.fandom.com/wiki/${enemyDrop2Data[key]}`);

												// Add drop name
												const item2Name = document.createElement('span');
												item2Name.classList.add('item-name');
												item2Name.textContent = `${enemyDrop2Data[key]} (x${quantities[index]})`;
												const item2NameLink =
													createLink(['item-link'],
														`https://genshin-impact.fandom.com/wiki/${enemyDrop2Data[key]}`);

												drop2ImageLink.appendChild(drop2Image);
												drop2Div.appendChild(drop2ImageLink);
												item2NameLink.appendChild(item2Name);
												drop2Div.appendChild(item2NameLink);

												enemyDrops2Div.appendChild(drop2Div);
											});

											const dropItem2 = document.createElement('li');
											dropItem2.appendChild(enemy2Div);
											dropItem2.appendChild(enemyDrops2Div);

											enemyDropDiv.appendChild(dropItem2);
										} else {
											console.error(`No data found for enemy drop: ${talents.enemyDrop2}`);
										}

										talentsList.appendChild(enemyDropDiv);
									} else {
										// Fetch the enemy drop data from materialMappingData
										const enemyDropData = materialMappingData[talents.enemyDrop];

										// Create a div for the enemy drop
										const enemyDropDiv = document.createElement('div');
										const enemyHeader = createSpan('materials-secondary-text', 'Enemy Drop:');
										enemyDropDiv.appendChild(enemyHeader);

										if (enemyDropData) {
											// Create a div for the enemy
											const enemyDiv = document.createElement('div');
											enemyDiv.classList.add('enemy-div');

											// Add enemy image
											const enemyImage = createImage(
												'enemy-image',
												`https://api.hakush.in/gi/UI/${getImageId(enemyDropData.enemyName)}.webp`,
												enemyDropData.enemyName
											);
											const enemyImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${enemyDropData.enemyName}`);
											enemyImageLink.appendChild(enemyImage);
											enemyDiv.appendChild(enemyImageLink);

											// Create a div for all enemy drops
											const enemyDropsDiv = document.createElement('div');
											enemyDropsDiv.classList.add('enemy-drops-div');

											// Define base quantities for each star level case
											let quantities = [18, 66, 93];

											// Add each enemy drop
											['itemName1', 'itemName2', 'itemName3'].forEach((key, index) => {
												const dropDiv = createSpan('drop-div');

												// Add drop image
												const dropImage = createNumberedItemImage(
													'item-image',
													`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(enemyDropData[key])}.png`,
													`${enemyDropData[key]} (x${quantities[index]})`,
													quantities[index]
												);
												const dropImageLink =
													createLink(['item-link'],
														`https://genshin-impact.fandom.com/wiki/${enemyDropData[key]}`);

												// Add drop name
												const itemName = document.createElement('span');
												itemName.classList.add('item-name');
												itemName.textContent = `${enemyDropData[key]} (x${quantities[index]})`;
												const itemNameLink =
													createLink(['item-link'],
														`https://genshin-impact.fandom.com/wiki/${enemyDropData[key]}`);

												dropImageLink.appendChild(dropImage);
												dropDiv.appendChild(dropImageLink);
												itemNameLink.appendChild(itemName);
												dropDiv.appendChild(itemNameLink);

												enemyDropsDiv.appendChild(dropDiv);
											});

											const dropItem = document.createElement('li');
											dropItem.appendChild(enemyDiv);
											dropItem.appendChild(enemyDropsDiv);

											enemyDropDiv.appendChild(dropItem);
										} else {
											console.error(`No data found for enemy drop: ${talents.enemyDrop}`);
										}

										talentsList.appendChild(enemyDropDiv);
									}
								}

								if (talents.weeklyBossDrop) {
									if (character.name === 'Traveler' && character.element === 'Pyro') {
										// Create a div for the weekly boss
										const weeklyBossDiv = document.createElement('div');
										const enemyHeader = createSpan('materials-secondary-text', 'Weekly Boss Drop:');
										weeklyBossDiv.appendChild(enemyHeader);

										// Create a container for the items
										const weeklyBossDropContainer = createElement('li');

										const weeklyBossDropImage = createNumberedItemImage(
											['item-image', 'gem-image'],
											`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(talents.weeklyBossDrop)}.png`,
											talents.weeklyBossDrop,
											12
										);
										const weeklyBossDropLink = createLink(
											['item-link'],
											`https://genshin-impact.fandom.com/wiki/${talents.weeklyBossDrop}`
										);

										weeklyBossDropLink.appendChild(weeklyBossDropImage);
										weeklyBossDropContainer.appendChild(weeklyBossDropLink);

										// Add drop name
										const itemName = createSpan(['item-name', 'item-name-local-specialty']);
										itemName.textContent = `${talents.weeklyBossDrop} (x12)`;
										const itemNameLink =
											createLink(['item-link'],
												`https://genshin-impact.fandom.com/wiki/${talents.weeklyBossDrop}`);


										itemNameLink.appendChild(itemName);
										weeklyBossDropContainer.appendChild(itemNameLink);


										weeklyBossDiv.appendChild(weeklyBossDropContainer);
										talentsList.appendChild(weeklyBossDiv);
									} else if (character.name === 'Traveler' && character.element === 'Geo') {
										// Fetch the weekly boss drop data from materialMappingData
										const weeklyBossDropData = materialMappingData[talents.weeklyBossDrop];
										const weeklyBoss2DropData = materialMappingData[talents.weeklyBossDrop2];

										if (weeklyBossDropData && weeklyBoss2DropData) {
											// Create a div for the weekly boss
											const weeklyBossDiv = document.createElement('div');
											const enemyHeader = createSpan('materials-secondary-text', 'Weekly Boss Drop:');
											weeklyBossDiv.appendChild(enemyHeader);

											// Create a div for the enemy
											const enemyDiv = createDiv(['enemy-div', 'geo-enemy-div']);

											// Add enemy image
											const enemyImage = createImage(
												'enemy-image',
												`https://api.hakush.in/gi/UI/${getImageId(weeklyBossDropData.bossName)}.webp`,
												weeklyBossDropData.bossName
											);
											const enemyImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBossDropData.bossName}`);
											enemyImageLink.appendChild(enemyImage);
											enemyDiv.appendChild(enemyImageLink);

											// Create a div for all enemy drops
											const enemyDropsDiv = createDiv('enemy-drops-div');

											const dropDiv = createSpan('drop-div');

											// Add weekly boss drop image
											const dropImage = createNumberedItemImage(
												'item-image',
												`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(weeklyBossDropData.itemName)}.png`,
												`${weeklyBossDropData.itemName} (x6)`,
												6
											);
											const dropImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBossDropData.itemName}`);

											// Add weekly boss drop name
											const dropName = document.createElement('span');
											dropName.classList.add('item-name');
											dropName.textContent = `${weeklyBossDropData.itemName} (x6)`;
											const dropNameLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBossDropData.itemName}`);

											dropImageLink.appendChild(dropImage);
											dropDiv.appendChild(dropImageLink);
											dropNameLink.appendChild(dropName);
											dropDiv.appendChild(dropNameLink);

											enemyDropsDiv.appendChild(dropDiv);

											const dropItem = document.createElement('li');
											dropItem.appendChild(enemyDiv);
											dropItem.appendChild(enemyDropsDiv);

											// Create a div for the enemy
											const enemy2Div = createDiv(['enemy-div', 'geo-enemy-div2']);

											// Add enemy image
											const enemy2Image = createImage(
												'enemy-image',
												`https://api.hakush.in/gi/UI/${getImageId(weeklyBoss2DropData.bossName)}.webp`,
												weeklyBoss2DropData.bossName
											);
											const enemy2ImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBoss2DropData.bossName}`);
											enemy2ImageLink.appendChild(enemy2Image);
											enemy2Div.appendChild(enemy2ImageLink);

											// Create a div for all enemy drops
											const enemyDrops2Div = createDiv('enemy-drops-div');

											const drop2Div = createSpan('drop-div');

											// Add weekly boss drop image
											const drop2Image = createNumberedItemImage(
												'item-image',
												`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(weeklyBoss2DropData.itemName)}.png`,
												`${weeklyBoss2DropData.itemName} (x12)`,
												12
											);
											const drop2ImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBoss2DropData.itemName}`);

											// Add weekly boss drop name
											const drop2Name = document.createElement('span');
											drop2Name.classList.add('item-name');
											drop2Name.textContent = `${weeklyBoss2DropData.itemName} (x12)`;
											const drop2NameLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBoss2DropData.itemName}`);

											drop2ImageLink.appendChild(drop2Image);
											drop2Div.appendChild(drop2ImageLink);
											drop2NameLink.appendChild(drop2Name);
											drop2Div.appendChild(drop2NameLink);

											enemyDrops2Div.appendChild(drop2Div);

											const drop2Item = document.createElement('li');
											drop2Item.appendChild(enemy2Div);
											drop2Item.appendChild(enemyDrops2Div);

											weeklyBossDiv.appendChild(dropItem);
											weeklyBossDiv.appendChild(drop2Item);
											talentsList.appendChild(weeklyBossDiv);
										} else {
											console.error(`No data found for weekly boss drop: ${talents.weeklyBossDrop}`);
										}
									} else {
										// Fetch the weekly boss drop data from materialMappingData
										const weeklyBossDropData = materialMappingData[talents.weeklyBossDrop];

										if (weeklyBossDropData) {
											// Create a div for the weekly boss
											const weeklyBossDiv = document.createElement('div');
											const enemyHeader = createSpan('materials-secondary-text', 'Weekly Boss Drop:');
											weeklyBossDiv.appendChild(enemyHeader);

											// Create a div for the enemy
											const enemyDiv = document.createElement('div');
											enemyDiv.classList.add('enemy-div');

											// Add enemy image
											const enemyImage = createImage(
												'enemy-image',
												`https://api.hakush.in/gi/UI/${getImageId(weeklyBossDropData.bossName)}.webp`,
												weeklyBossDropData.bossName
											);
											const enemyImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBossDropData.bossName}`);
											enemyImageLink.appendChild(enemyImage);
											enemyDiv.appendChild(enemyImageLink);

											// Create a div for all enemy drops
											const enemyDropsDiv = document.createElement('div');
											enemyDropsDiv.classList.add('enemy-drops-div');

											const dropDiv = document.createElement('span');
											dropDiv.classList.add('drop-div');

											// Add weekly boss drop image
											const dropImage = createNumberedItemImage(
												'item-image',
												`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(weeklyBossDropData.itemName)}.png`,
												`${weeklyBossDropData.itemName} (x18)`,
												18
											);
											const dropImageLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBossDropData.itemName}`);

											// Add weekly boss drop name
											const dropName = document.createElement('span');
											dropName.classList.add('item-name');
											dropName.textContent = `${weeklyBossDropData.itemName} (x18)`;
											const dropNameLink =
												createLink(['item-link'],
													`https://genshin-impact.fandom.com/wiki/${weeklyBossDropData.itemName}`);

											dropImageLink.appendChild(dropImage);
											dropDiv.appendChild(dropImageLink);
											dropNameLink.appendChild(dropName);
											dropDiv.appendChild(dropNameLink);

											enemyDropsDiv.appendChild(dropDiv);

											const dropItem = document.createElement('li');
											dropItem.appendChild(enemyDiv);
											dropItem.appendChild(enemyDropsDiv);

											weeklyBossDiv.appendChild(dropItem);
											talentsList.appendChild(weeklyBossDiv);
										} else {
											console.error(`No data found for weekly boss drop: ${talents.weeklyBossDrop}`);
										}
									}
								}

								if (talents.talentBooks) {
									const talentBooksData = materialMappingData[talents.talentBooks];

									if (talentBooksData) {
										console.log(talents.talentBooks)
										console.log(talentBooksData)
										// Create a div for the talent books
										const talentBookDiv = createDiv();
										const talentBookHeader = createSpan('materials-secondary-text', 'Talent Books:');
										talentBookDiv.appendChild(talentBookHeader);

										// Function to create a single book entry
										const createTalentBookEntry = (type, tier, count) => {
											if (talentBooksData && talentBooksData[tier]) {
												const entryDiv = createDiv(['talent-book-entry']);

												const bookImage = createNumberedItemImage(
													['item-image', 'talent-book-image'],
													`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(imageMappingData[talentBooksData[tier]])}.png`,
													talentBooksData[tier],
													count
												);

												const bookLink = createLink(
													['item-link'],
													`https://genshin-impact.fandom.com/wiki/${talentBooksData[tier].replace(/\s+/g, '_')}`
												);

												bookLink.appendChild(bookImage);
												entryDiv.appendChild(bookLink);

												return entryDiv;
											}
											return null;
										};

										// Add all talent book entries to the container
										const entries = [
											createTalentBookEntry('teachings', 'teachings', 9),
											createTalentBookEntry('guide', 'guide', 63),
											createTalentBookEntry('philosophies', 'philosophies', 114),
										];

										const bookList = document.createElement('li');

										entries.forEach(entry => {
											if (entry) bookList.appendChild(entry);
										});

										talentBookDiv.appendChild(bookList);

										talentsList.appendChild(talentBookDiv);
									} else {
										console.error(`No data found for talent books: ${talents.talentBooks}`);
									}
								}

								if (talents.travelerTalentBooks) {
									if (character.name === 'Traveler' && character.element === 'Geo') {
										// Create a div for the talent books
										const talentBookDiv = createDiv();
										const talentBookHeader = createSpan('materials-secondary-text', 'Talent Books:');
										talentBookDiv.appendChild(talentBookHeader);

										// Iterate over travelerTalentBooks to extract and map the data
										talents.travelerTalentBooks.forEach(talentBook => {
											// Function to create a single book entry
											const createTalentBookEntry = (type, tier, count) => {
												const data = materialMappingData[talentBook[type]];
												if (data && data[tier]) {
													const entryDiv = createDiv(['talent-book-entry', 'geo-talent-book-entry']);

													const bookImage = createNumberedItemImage(
														['item-image', 'talent-book-image'],
														`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(imageMappingData[data[tier]])}.png`,
														data[tier],
														count
													);

													const bookLink = createLink(
														['item-link'],
														`https://genshin-impact.fandom.com/wiki/${data[tier].replace(/\s+/g, '_')}`
													);

													bookLink.appendChild(bookImage);
													entryDiv.appendChild(bookLink);

													return entryDiv;
												}
												return null;
											};

											// Add all talent book entries to the container
											const entries = [
												createTalentBookEntry('teachings', 'teachings', 3),
												createTalentBookEntry('guide1', 'guide', 11),
												createTalentBookEntry('guide2', 'guide', 4),
												createTalentBookEntry('guide3', 'guide', 6),
												createTalentBookEntry('philosophies1', 'philosophies', 20),
												createTalentBookEntry('philosophies2', 'philosophies', 6),
												createTalentBookEntry('philosophies3', 'philosophies', 12)
											];

											const bookList = document.createElement('li');

											entries.forEach(entry => {
												if (entry) bookList.appendChild(entry);
											});

											talentBookDiv.appendChild(bookList);
										});

										// Iterate over travelerTalentBooks2 to extract and map the data
										talents.travelerTalentBooks2.forEach(talentBook2 => {
											// Function to create a single book entry
											const createTalentBook2Entry = (type, tier, count) => {
												const data = materialMappingData[talentBook2[type]];
												if (data && data[tier]) {
													const entry2Div = createDiv(['talent-book-entry']);

													const book2Image = createNumberedItemImage(
														['item-image', 'talent-book-image'],
														`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(imageMappingData[data[tier]])}.png`,
														data[tier],
														count
													);

													const book2Link = createLink(
														['item-link'],
														`https://genshin-impact.fandom.com/wiki/${data[tier].replace(/\s+/g, '_')}`
													);

													book2Link.appendChild(book2Image);
													entry2Div.appendChild(book2Link);

													return entry2Div;
												}
												return null;
											};

											// Add all talent book entries to the container
											const entries = [
												createTalentBook2Entry('teachings', 'teachings', 6),
												createTalentBook2Entry('guide1', 'guide', 22),
												createTalentBook2Entry('guide2', 'guide', 8),
												createTalentBook2Entry('guide3', 'guide', 12),
												createTalentBook2Entry('philosophies1', 'philosophies', 40),
												createTalentBook2Entry('philosophies2', 'philosophies', 12),
												createTalentBook2Entry('philosophies3', 'philosophies', 24)
											];

											const bookList2 = document.createElement('li');

											entries.forEach(entry => {
												if (entry) bookList2.appendChild(entry);
											});

											talentBookDiv.appendChild(bookList2);
										});
										talentsList.appendChild(talentBookDiv);
									} else {
										// Create a div for the talent books
										const talentBookDiv = createDiv();
										const talentBookHeader = createSpan('materials-secondary-text', 'Talent Books:');
										talentBookDiv.appendChild(talentBookHeader);

										// Iterate over travelerTalentBooks to extract and map the data
										talents.travelerTalentBooks.forEach(talentBook => {
											// Function to create a single book entry
											const createTalentBookEntry = (type, tier, count) => {
												const data = materialMappingData[talentBook[type]];
												if (data && data[tier]) {
													const entryDiv = document.createElement('div');
													entryDiv.classList.add('talent-book-entry');

													const bookImage = createNumberedItemImage(
														['item-image', 'talent-book-image'],
														`https://homdgcat.wiki/homdgcat-res/Mat/UI_ItemIcon_${getImageId(imageMappingData[data[tier]])}.png`,
														data[tier],
														count
													);

													const bookLink = createLink(
														['item-link'],
														`https://genshin-impact.fandom.com/wiki/${data[tier].replace(/\s+/g, '_')}`
													);

													bookLink.appendChild(bookImage);
													entryDiv.appendChild(bookLink);

													return entryDiv;
												}
												return null;
											};

											// Add all talent book entries to the container
											const entries = [
												createTalentBookEntry('teachings', 'teachings', 9),
												createTalentBookEntry('guide1', 'guide', 33),
												createTalentBookEntry('guide2', 'guide', 12),
												createTalentBookEntry('guide3', 'guide', 18),
												createTalentBookEntry('philosophies1', 'philosophies', 60),
												createTalentBookEntry('philosophies2', 'philosophies', 18),
												createTalentBookEntry('philosophies3', 'philosophies', 36)
											];

											const bookList = document.createElement('li');

											entries.forEach(entry => {
												if (entry) bookList.appendChild(entry);
											});

											talentBookDiv.appendChild(bookList);
										});
										talentsList.appendChild(talentBookDiv);
									}
								}

								talentsDiv.appendChild(talentsList)
							});
						}

						// Append materials div to character div
						materialsDiv.appendChild(ascensionDiv);
						materialsDiv.appendChild(talentsDiv);

						characterDiv.appendChild(materialsDiv);

						// Append character div to container
						charactersContainer.appendChild(characterDiv);
					})
				}
			})
	})
	.catch(error => console.error('Error fetching character data:', error));

