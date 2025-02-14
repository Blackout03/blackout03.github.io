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
			`https://honkai-star-rail.fandom.com/wiki/${getCharacterName(character.name, character.element)}`);
	const characterImage =
		createImage(['character-image', character.star === 5 && character.starType ? 'special-star-image' : character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
			`https://homdgcat.wiki/images/avataricon/avatar/${characterName}.png`,
			`${character.name} avatar`,
			character.name)
	characterImageLink.appendChild(characterImage)
	return characterImageLink;
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

// Function to create an image element for the character's element type
function createTypeImage(type) {
	const typeImageLink =
		createLink(['item-link'],
			`https://honkai-star-rail.fandom.com/wiki/${type}`);
	const typeImage =
		createImage('type-image',
			`https://homdgcat.wiki/images/Element/${type}.png`,
			type);
	typeImageLink.appendChild(typeImage)
	return typeImageLink;
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
	fetch('../image_mapping_data.json').then(response => response.json())
])
	.then(([characterData, imageMappingData]) => {
		const charactersContainer = document.getElementById('charactersContainer');
		const urlParams = new URLSearchParams(window.location.search);
		const includeUpcomingCharacters = urlParams.has('includeUpcoming'); // Check if '?upcoming' is in the URL

		// Helper function to get image ID from imageMappingData.json or fallback to itemName
		function getImageId(itemName) {
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

					// Create a div for the character details (name, path, type)
					const detailsDiv = document.createElement('div');
					detailsDiv.classList.add('details');

					const characterImageName = getImageId(character.name);

					// Append character image
					const characterImage = createCharacterImage(character, characterImageName);
					detailsDiv.appendChild(characterImage);

					// Create a div for the character details (name, path, type)
					const detailsRightDiv = document.createElement('div');
					detailsRightDiv.classList.add('details-right');

					// Create character name element
					const characterNameLink =
						createLink(['item-link'],
							`https://honkai-star-rail.fandom.com/wiki/${getCharacterName(character.name, character.type)}`);
					const characterName = createElement('h2', '', character.name, '', getCharacterName(character.name, character.type));
					characterNameLink.appendChild(characterName);
					detailsRightDiv.appendChild(characterNameLink);

					// Create a div for path and type icons
					const iconsDiv = document.createElement('div');
					iconsDiv.classList.add('icons');

					// Append path image
					const pathImage = createPathImage(character.path);
					iconsDiv.appendChild(pathImage);

					// Append type image
					const typeImage = createTypeImage(character.type);
					iconsDiv.appendChild(typeImage);

					// Append the icons to details div
					detailsRightDiv.appendChild(iconsDiv);

					// Append details right to details div
					detailsDiv.appendChild(detailsRightDiv);

					// Append details to character div
					characterDiv.appendChild(detailsDiv);

					// Create materials div
					const materialsDiv = document.createElement('div');
					materialsDiv.classList.add('materials');
					const ascensionDiv = createDiv('ascension-div');
					const tracesDiv = createDiv('traces-div');

					// Append materials details
					character.materials.forEach(material => {
						// Display Enemy Drops materials with image if they exist
						if (material.ascension) {
							const ascensionHeader = createSpan('materials-main-text', 'Ascension:')
							ascensionDiv.appendChild(ascensionHeader);

							material.ascension.forEach(ascension => {
								const ascensionList = document.createElement('div');
								ascensionList.classList.add('ascension-materials');

								if (ascension.enemyDrop) {
									// Create a div for the enemy drop
									const enemyDropDiv = document.createElement('div');

									const enemyHeader = createSpan('materials-secondary-text', 'Enemy Drop:')
									enemyDropDiv.appendChild(enemyHeader)

									ascension.enemyDrop.forEach(drop => {
										// Create a div for the enemy
										const enemyDiv = document.createElement('div');
										enemyDiv.classList.add('enemy-div');

										// Add enemy image
										const enemyImage = createImage(
											'enemy-image',
											`https://homdgcat.wiki/images/monsterfigure/Monster_${getImageId(drop.enemyName)}.png`,
											drop.enemyName);
										enemyDiv.appendChild(enemyImage);

										// Create a div for all enemy drops
										const enemyDropsDiv = document.createElement('div');
										enemyDropsDiv.classList.add('enemy-drops-div');

										// Define base quantities for each star level case
										let quantities = [];
										if (character.star === 5) {
											quantities = [15, 15, 15]; // 5-star
										} else if (character.star === 4) {
											quantities = [12, 13, 12]; // 4-star
										}

										// Add each enemy drop
										['itemName1', 'itemName2', 'itemName3'].forEach((key, index) => {
											const dropDiv = document.createElement('span');
											dropDiv.classList.add('drop-div');

											// Add drop image
											const dropImage = createNumberedItemImage(
												'item-image',
												`https://homdgcat.wiki/images/itemicon/${getImageId(drop[key])}.png`,
												`${drop[key]} (x${quantities[index]})`,
												quantities[index]
											);

											// Add drop name
											const itemName = document.createElement('span');
											itemName.classList.add('item-name');
											itemName.textContent = `${drop[key]} (x${quantities[index]})`;

											dropDiv.appendChild(dropImage);
											dropDiv.appendChild(itemName);

											enemyDropsDiv.appendChild(dropDiv);
										});

										const dropItem = document.createElement('li');
										dropItem.appendChild(enemyDiv);
										dropItem.appendChild(enemyDropsDiv);

										enemyDropDiv.appendChild(dropItem)
										ascensionList.appendChild(enemyDropDiv)
									})
								}

								if (ascension.stagnantShadowDrop) {
									// Create a div for the stagnant shadow
									const stagnantShadowDiv = document.createElement('div');

									const enemyHeader = createSpan('materials-secondary-text', 'Stagnant Shadow Drop:')
									stagnantShadowDiv.appendChild(enemyHeader)
									ascension.stagnantShadowDrop.forEach(drop => {
										// Add enemy image
										const stagnantShadowName = createDiv('materials-stagnant-shadow-text', `Stagnant Shadow: ${drop.stagnantShadowName}`)

										stagnantShadowDiv.appendChild(stagnantShadowName);

										// Define base quantities for each star level case
										let quantities = 0;
										if (character.star === 5) {
											quantities = 65; // 5-star
										} else if (character.star === 4) {
											quantities = 50; // 4-star
										}

										const shadowImage = createNumberedItemImage(
											'item-image',
											`https://homdgcat.wiki/images/itemicon/${getImageId(drop.itemName)}.png`,
											`${drop.itemName} (x65)`,
											quantities
										);

										// Add drop name
										const itemName = document.createElement('span');
										itemName.classList.add('item-name');
										itemName.textContent = `${drop.itemName} (x65)`;


										const dropItem = document.createElement('li');
										dropItem.classList.add('stagnant-shadow-list')
										const item = createDiv('stagnant-shadow-item')
										item.appendChild(shadowImage);
										item.appendChild(itemName);

										dropItem.appendChild(stagnantShadowName);
										dropItem.appendChild(item);

										stagnantShadowDiv.appendChild(dropItem);
										ascensionList.appendChild(stagnantShadowDiv)
									});
								}

								ascensionDiv.appendChild(ascensionList)
							});
						}
						if (material.traces) {
							const tracesHeader = createSpan('materials-main-text', 'Traces:')
							tracesDiv.appendChild(tracesHeader);

							material.traces.forEach(traces => {
								const tracesList = document.createElement('div');
								tracesList.classList.add('trace-materials');

								if (traces.enemyDrop) {
									// Create a div for the enemy drop
									const enemyDropDiv = document.createElement('div');

									const enemyHeader = createSpan('materials-secondary-text', 'Enemy Drop:')
									enemyDropDiv.appendChild(enemyHeader)

									traces.enemyDrop.forEach(drop => {
										// Create a div for the enemy
										const enemyDiv = document.createElement('div');
										enemyDiv.classList.add('enemy-div');

										// Add enemy image
										const enemyImage = createImage(
											'enemy-image',
											`https://homdgcat.wiki/images/monsterfigure/Monster_${getImageId(drop.enemyName)}.png`,
											drop.enemyName);
										enemyDiv.appendChild(enemyImage);

										// Create a div for all enemy drops
										const enemyDropsDiv = document.createElement('div');
										enemyDropsDiv.classList.add('enemy-drops-div');

										// Define base quantities for each star level case
										let quantities = [];
										if (character.star === 5) {
											quantities = [41, 56, 58]; // 5-star
										} else if (character.star === 4) {
											quantities = [28, 42, 42]; // 4-star
										}

										// Add each enemy drop
										['itemName1', 'itemName2', 'itemName3'].forEach((key, index) => {
											const dropDiv = document.createElement('span');
											dropDiv.classList.add('drop-div');

											// Add drop image
											const dropImage = createNumberedItemImage(
												'item-image',
												`https://homdgcat.wiki/images/itemicon/${getImageId(drop[key])}.png`,
												`${drop[key]} (x${quantities[index]})`,
												quantities[index]
											);

											// Add drop name
											const itemName = document.createElement('span');
											itemName.classList.add('item-name');
											itemName.textContent = `${drop[key]} (x${quantities[index]})`;

											dropDiv.appendChild(dropImage);
											dropDiv.appendChild(itemName);

											enemyDropsDiv.appendChild(dropDiv);
										});

										const dropItem = document.createElement('li');
										dropItem.appendChild(enemyDiv);
										dropItem.appendChild(enemyDropsDiv);

										enemyDropDiv.appendChild(dropItem)
										tracesList.appendChild(enemyDropDiv)
									});
								}

								if (traces.calyxDrop) {
									// Create a div for the calyx
									const calyxDiv = document.createElement('div');

									const enemyHeader = createSpan('materials-secondary-text', 'Calyx Drop:')
									calyxDiv.appendChild(enemyHeader)
									traces.calyxDrop.forEach(drop => {
										// Add enemy image
										const calyxName = createDiv('materials-calyx-text', `Calyx: ${drop.calyxName}`)

										calyxDiv.appendChild(calyxName);



										// Create a div for all enemy drops
										const enemyDropsDiv = document.createElement('div');
										enemyDropsDiv.classList.add('enemy-drops-div');

										// Define base quantities for each star level case
										let quantities = [];
										if (character.star === 5) {
											quantities = [15, 72, 139]; // 5-star
										} else if (character.star === 4) {
											quantities = [12, 54, 105]; // 4-star
										}

										// Add each enemy drop
										['itemName1', 'itemName2', 'itemName3'].forEach((key, index) => {
											const dropDiv = document.createElement('span');
											dropDiv.classList.add('drop-div');

											// Add drop image
											const dropImage = createNumberedItemImage(
												'item-image',
												`https://homdgcat.wiki/images/itemicon/${getImageId(drop[key])}.png`,
												`${drop[key]} (x${quantities[index]})`,
												quantities[index]
											);

											// Add drop name
											const itemName = document.createElement('span');
											itemName.classList.add('item-name');
											itemName.textContent = `${drop[key]} (x${quantities[index]})`;

											dropDiv.appendChild(dropImage);
											dropDiv.appendChild(itemName);

											enemyDropsDiv.appendChild(dropDiv);
										});

										const dropItem = document.createElement('li');
										dropItem.appendChild(enemyDropsDiv);

										calyxDiv.appendChild(dropItem);
										tracesList.appendChild(calyxDiv)
									});
								}

								if (traces.echoOfWarDrop) {
									// Create a div for the echo of war
									const echoOfWarDiv = document.createElement('div');

									const enemyHeader = createSpan('materials-secondary-text', 'Echo of War Drop:')
									echoOfWarDiv.appendChild(enemyHeader)
									traces.echoOfWarDrop.forEach(drop => {
										// Add enemy image
										const echoOfWarName = createDiv('materials-echo-of-war-text', `Echo of War: ${drop.echoOfWarName}`)

										echoOfWarDiv.appendChild(echoOfWarName);

										const itemImage = createNumberedItemImage(
											'item-image',
											`https://homdgcat.wiki/images/itemicon/${getImageId(drop.itemName)}.png`,
											`${drop.itemName} (x12)`,
											12
										);

										// Add drop name
										const itemName = document.createElement('span');
										itemName.classList.add('item-name');
										itemName.textContent = `${drop.itemName} (x65)`;


										const dropItem = document.createElement('li');
										dropItem.classList.add('echo-of-war-list')
										const item = createDiv('echo-of-war-item')
										item.appendChild(itemImage);
										item.appendChild(itemName);

										dropItem.appendChild(echoOfWarName);
										dropItem.appendChild(item);

										echoOfWarDiv.appendChild(dropItem);
										tracesList.appendChild(echoOfWarDiv)
									});
								}

								tracesDiv.appendChild(tracesList)
							});
						}

						// Append materials div to character div
						materialsDiv.appendChild(ascensionDiv);
						materialsDiv.appendChild(tracesDiv);

						characterDiv.appendChild(materialsDiv);

						// Append character div to container
						charactersContainer.appendChild(characterDiv);
					})
				}
			})
	})
	.catch(error => console.error('Error fetching character data:', error));

