// Function to convert character name to snake_case
function toSnakeCase(name) {
	return name.toLowerCase().replace(/ /g, '_');
}

// Function to create and return an element with given type, class, and text content
function createElement(type, className, textContent = '', innerHTML = '') {
	const element = document.createElement(type);
	if (className) element.classList.add(className);
	if (textContent) element.textContent = textContent;
	if (innerHTML) element.innerHTML = innerHTML;
	return element;
}

// Function to create an image element for a character
function createCharacterImage(character) {
	const snakeCaseName = toSnakeCase(character.name);
	const img = document.createElement('img');
	img.src = `https://paimon.moe/images/characters/${snakeCaseName}.png`;
	img.alt = `${character.name} avatar`;
	img.title = `${character.name}`;
	img.classList.add('character-image');
	return img;
}

// Function to create and style the list of character names based on their star rating
function createCharacterNameContainer(group) {
	// Separate characters by star rating
	const fiveStarCharacters = group.characters.filter(char => char.star === 5);
	const fourStarCharacters = group.characters.filter(char => char.star === 4);

	// Combine characters and sort by star rating
	const sortedCharacters = [...fiveStarCharacters, ...fourStarCharacters];

	// Create a container for all character entries
	const characterContainer = document.createElement('div');
	characterContainer.classList.add('character-container');

	// Create a comma-separated list of names
	sortedCharacters.forEach(char => {
		const entry = document.createElement('div');
		entry.classList.add('character-entry');

		// Append image
		const img = createCharacterImage(char);
		entry.appendChild(img);

		// Append name
		const nameElement = document.createElement('span');
		nameElement.textContent = char.name;
		nameElement.classList.add(char.star === 5 ? 'five-star' : 'four-star');
		entry.appendChild(nameElement);

		characterContainer.appendChild(entry);
	});

	return characterContainer;
}

document.addEventListener("DOMContentLoaded", () => {
	fetch('rerun_data.json')
		.then(response => response.json())
		.then(data => {
			const timeline = document.getElementById('timeline');
			const bannersByVersion = {}; // To store phases by version

			// Create a combined list of all reruns with character data
			const reruns = [];
			data.characters.forEach(character => {
				character.reruns.forEach(rerun => {
					reruns.push({
						name: character.name,
						startDate: rerun.startDate,
						endDate: rerun.endDate,
						version: rerun.version,
						wishType: rerun.wishType,
						star: character.star,
						phase: rerun.phase || null // Add phase, use null if it doesn't exist
					});
				});
			});

			// Sort reruns by startDate and endDate
			reruns.sort((a, b) => {
				const startDiff = new Date(a.startDate) - new Date(b.startDate);
				return startDiff !== 0 ? startDiff : new Date(a.endDate) - new Date(b.endDate);
			});

			// Group by startDate, endDate, and wishType
			const groupedReruns = [];
			reruns.forEach(rerun => {
				// Check if there's already a group for the same start, end, and wishType
				const group = groupedReruns.find(group =>
					group.startDate === rerun.startDate &&
					group.endDate === rerun.endDate &&
					group.wishType === rerun.wishType
				);

				if (group) {
					// If found, add the character to the existing group
					group.characters.push({ name: rerun.name, star: rerun.star });
				} else {
					// If not, create a new group
					groupedReruns.push({
						startDate: rerun.startDate,
						endDate: rerun.endDate,
						version: rerun.version,
						wishType: rerun.wishType,
						characters: [{ name: rerun.name, star: rerun.star }],
						phase: rerun.phase || null // Store phase if it exists
					});
				}
			});

			// Display the grouped reruns
			groupedReruns.forEach(group => {
				// Initialize version phases if not already present
				if (!bannersByVersion[group.version]) {
					bannersByVersion[group.version] = [];
				}

				// Check if there's already a banner with the same start and end date for this version
				const existingPhase = bannersByVersion[group.version].find(
					b => b.startDate === group.startDate && b.endDate === group.endDate
				);

				let phase;
				if (existingPhase) {
					// If same date banner exists, use the same phase
					phase = existingPhase.phase;
				} else {
					// Assign a new phase and push this banner's dates into the version's banner list
					phase = bannersByVersion[group.version].length + 1;
					bannersByVersion[group.version].push({
						startDate: group.startDate,
						endDate: group.endDate,
						phase
					});
				}

				const bannerEntry = document.createElement('div');
				bannerEntry.classList.add('banner-entry');

				const characterNameContainer = createCharacterNameContainer(group);
				bannerEntry.appendChild(characterNameContainer);

				// Create and append the wish type, style it based on wishType
				const wishType = document.createElement('div');
				wishType.textContent = group.wishType === 'event' ? '[Event Wish]' : '[Chronicled Wish]';
				wishType.classList.add('wish-type', group.wishType === 'event' ? 'event-wish' : 'chronicled-wish');
				bannerEntry.appendChild(wishType);

				const bannerDetails = document.createElement('div');
				bannerDetails.classList.add('banner-details');

				// Create and append the start and end date
				const startDate = document.createElement('span');
				startDate.textContent = `Start: ${group.startDate}`;
				bannerDetails.appendChild(startDate);

				const endDate = document.createElement('span');
				endDate.textContent = `End: ${group.endDate}`;
				bannerDetails.appendChild(endDate);

				const version = document.createElement('span');
				if (group.phase) {
					version.textContent = `Version: ${group.version}, Phase ${group.phase}`;
				} else {
					version.textContent = `Version: ${group.version}, Phase ${phase}`;
				}
				bannerDetails.appendChild(version);

				bannerEntry.appendChild(bannerDetails);
				timeline.appendChild(bannerEntry);
			});
		})
		.catch(error => console.error('Error loading JSON:', error));
});
