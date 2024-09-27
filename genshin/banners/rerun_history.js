// Function to convert character name to snake_case
function toSnakeCase(name) {
	return name.toLowerCase().replace(/ /g, '_');
}

// Function to calculate the difference in months and days since the last rerun
function calculateMonthsAndDaysSince(endDate) {
	const now = new Date();
	const lastRerunEnd = new Date(endDate);

	let years = now.getFullYear() - lastRerunEnd.getFullYear();
	let months = now.getMonth() - lastRerunEnd.getMonth();
	let days = now.getDate() - lastRerunEnd.getDate();

	// Adjust if the current day of the month is before the rerun end day
	if (days < 0) {
		months -= 1;
		days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Get days in the previous month
	}

	// Adjust if the current month is before the rerun end month
	if (months < 0) {
		years -= 1;
		months += 12;
	}

	// Add the year difference to months (since each year adds 12 months)
	months += years * 12;

	// Return the time in months and days
	return { months, days };
}

// Function to calculate days since the last rerun
function calculateDaysSince(endDate) {
	const now = new Date();
	const lastRerunEnd = new Date(endDate);
	const timeDifference = now - lastRerunEnd;
	const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	return daysSince;
}

// Function to calculate days until a given date
function calculateDaysUntil(date) {
	const now = new Date();
	const givenDate = new Date(date);
	const timeDifference = givenDate - now;
	const daysUntil = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	return daysUntil;
}

// Function to create and return an element with given type, class, and text content
function createElement(type, className, textContent = '', innerHTML = '') {
	const element = document.createElement(type);
	if (className) element.classList.add(className);
	if (textContent) element.textContent = textContent;
	if (innerHTML) element.innerHTML = innerHTML;
	return element;
}

// Function to filter and sort characters based on hash
function filterAndSortCharacters(characters) {
	const sortOption = document.getElementById('sortOptions').value;
	const elementFilter = Array.from(document.querySelectorAll('#elementFilter input[type="checkbox"]:checked')).map(input => input.value);
	const starFilter = Array.from(document.querySelectorAll('#starFilter input[type="checkbox"]:checked')).map(input => Number(input.value));

	let filteredCharacters = characters;

	// Filter characters by selected elements
	if (elementFilter.length > 0) {
		filteredCharacters = filteredCharacters.filter(character => elementFilter.includes(character.element?.toLowerCase()));
	}

	// Filter characters by selected star level
	if (starFilter.length > 0) {
		filteredCharacters = filteredCharacters.filter(character => {
			return starFilter.includes(character.star); // Assuming 'starLevel' is the field in JSON data
		});
	}

	// Apply sorting based on the selected sorting option
	switch (sortOption) {
		case 'longest':
			filteredCharacters.sort((a, b) => {
				const daysSinceLastRerunA = calculateDaysSince(a.reruns[a.reruns.length - 1].endDate);
				const daysSinceLastRerunB = calculateDaysSince(b.reruns[b.reruns.length - 1].endDate);
				return daysSinceLastRerunB - daysSinceLastRerunA; // Sort by longest wait
			});
			break;
		case 'shortest':
			filteredCharacters.sort((a, b) => {
				const daysSinceLastRerunA = calculateDaysSince(a.reruns[a.reruns.length - 1].endDate);
				const daysSinceLastRerunB = calculateDaysSince(b.reruns[b.reruns.length - 1].endDate);
				return daysSinceLastRerunA - daysSinceLastRerunB; // Sort by shortest wait
			});
			break;
		case 'alphabetical':
			filteredCharacters.sort((a, b) => {
				const nameA = a.name ? a.name.toLowerCase() : '';
				const nameB = b.name ? b.name.toLowerCase() : '';
				return nameA.localeCompare(nameB); // Sort alphabetically by name
			});
			break;
		case 'alphabetical-zyx':
			filteredCharacters.sort((a, b) => {
				const nameA = a.name ? a.name.toLowerCase() : '';
				const nameB = b.name ? b.name.toLowerCase() : '';
				return nameB.localeCompare(nameA); // Sort alphabetically by name (reverse)
			});
			break;
		case 'release-earliest':
			characters.sort((a, b) => new Date(a.reruns[0].startDate) - new Date(b.reruns[0].startDate)); // Sort by earliest first rerun
			break;
		case 'release-latest':
			characters.sort((a, b) => new Date(b.reruns[0].startDate) - new Date(a.reruns[0].startDate)); // Sort by latest first rerun
			break;
		case 'random':
			filteredCharacters.sort(() => Math.random() - 0.5); // Randomize order
			break;
		case 'most-reruns':
			filteredCharacters.sort((a, b) => b.reruns.length - a.reruns.length); // Sort by number of reruns (most first)
			break;
		case 'least-reruns':
			filteredCharacters.sort((a, b) => a.reruns.length - b.reruns.length); // Sort by number of reruns (least first)
			break;
		case 'element':
			filteredCharacters.sort((a, b) => {
				const elementA = a.element ? a.element.toLowerCase() : '';
				const elementB = b.element ? b.element.toLowerCase() : '';
				return elementA.localeCompare(elementB); // Sort by element (alphabetically)
			});
			break;
		case 'upcoming':
			filteredCharacters = filteredCharacters.filter(character => {
				const reruns = character.reruns;
				const lastRerun = reruns[reruns.length - 1];
				const startDate = new Date(lastRerun.startDate);
				const now = new Date();
				return (lastRerun.startDate === "upcoming" && lastRerun.endDate === "upcoming") || now < startDate;
			});
			break
	}

	return filteredCharacters;
}

// Function to clear the current character list
function clearCharacterList() {
	const characterList = document.getElementById('character-list');
	while (characterList.firstChild) {
		characterList.removeChild(characterList.firstChild);
	}
}

// Combined event listener for both dropdowns
function checkJsonData() {
	fetch('rerun_data.json')
		.then(response => response.json())
		.then(data => {
			clearCharacterList(); // Clear the list before updating
			displayRerunInfo(data); // Update with the new filter and sort
		})
		.catch(error => console.error('Error fetching rerun data:', error));
}

// Add event listeners for both dropdowns
document.getElementById('sortOptions').addEventListener('change', checkJsonData);
document.getElementById('elementFilter').addEventListener('change', checkJsonData);
document.getElementById('starFilter').addEventListener('change', checkJsonData);

// Function to display character rerun information
function displayRerunInfo(rerunData) {
	const characterList = document.getElementById('character-list');

	let characters = rerunData.characters.filter(character => character.reruns.length > 0); // Exclude characters with no reruns

	const sortedCharacters = filterAndSortCharacters(characters);

	sortedCharacters.forEach(character => {
		const reruns = character.reruns;
		const lastRerun = reruns[reruns.length - 1];
		const startDate = new Date(lastRerun.startDate);
		const endDate = new Date(lastRerun.endDate);
		const now = new Date();
		const daysSinceLastRerun = calculateDaysSince(lastRerun.endDate);
		const timeSinceLastRerun = calculateMonthsAndDaysSince(lastRerun.endDate);
		const snakeCaseName = toSnakeCase(character.name);
		const wishType = lastRerun.wishType === "chronicled" ? "Chronicled Wish" : "Event Wish";

		const card = createElement('div', 'character-card');

		const img = createElement('img', 'character-image');
		img.src = `https://paimon.moe/images/characters/${snakeCaseName}.png`
		img.alt = `${character.name} avatar`;
		img.title = `${character.name}`;
		img.classList.add(character.star === 5 ? 'five-star-image' : 'four-star-image');

		const details = createElement('div', 'character-details');
		const name = createElement('span', 'character-name', character.name);
		const bannerCount = createElement('div', 'banner-count', `Banners: ${reruns.length}`);

		let rerunStatus;
		let rerunInfo;
		let rerunVersionInfo;
		let previousRun;
		let ongoingRun;
		let upcomingRun;
		let upcomingRerun;
		let timeSince;
		let daysSince;
		const wishTypeColor = lastRerun.wishType === "chronicled" ? "chronicled-wish" : "event-wish";


		// Append other info to card

		const rerunStatusElement = document.createElement('div');
		rerunStatusElement.classList.add('rerun-status');

		if (lastRerun.startDate === "upcoming" && lastRerun.endDate === "upcoming" || now < startDate) {
			const isUpcoming = lastRerun.startDate === "upcoming" && lastRerun.endDate === "upcoming";

			if (isUpcoming && reruns.length > 1) {
				rerunInfo = createElement('div', 'rerun-info', '', `Release: ${lastRerun.endDate}`)
				rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${lastRerun.version}] <div class="wish-type ${wishTypeColor}">[${wishType}]</div>`)
				upcomingRun = createElement('div', 'upcoming-rerun-status', `Upcoming Rerun: ${lastRerun.version} `)

				if (reruns.length > 1) {
					const previousRerun = reruns[reruns.length - 2];
					const previousRerunEndDate = new Date(previousRerun.endDate);
					rerunInfo = createElement('div', 'rerun-info', '', `Previous Banner: (${previousRerun.startDate}) - (${previousRerun.endDate})`)
					rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${previousRerun.version}] <div class="wish-type ${wishTypeColor}">[${wishType}]</div>`)
					const daysSincePreviousRerun = calculateDaysSince(previousRerunEndDate);
					const timeSincePreviousRerun = calculateMonthsAndDaysSince(previousRerunEndDate);

					timeSince = `Time since last banner: ${timeSincePreviousRerun.months} months, ${timeSincePreviousRerun.days} days`;
					daysSince = `Days since last banner: ${daysSincePreviousRerun} days`;

					previousRun = createElement('div', 'rerun-status', '', `<span>${timeSince}<br>${daysSince}</span>`)
				}
			} else if (isUpcoming) {
				rerunInfo = createElement('div', 'rerun-info', '', `Release: ${lastRerun.endDate}`)
				rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${lastRerun.version}] <div class="wish-type ${wishTypeColor}">[${wishType}]</div>`)
				upcomingRun = createElement('div', 'upcoming-rerun-status', `Upcoming Rerun: ${lastRerun.version}`)

			} else {
				rerunInfo = createElement('div', 'rerun-info', '', `Release: ${lastRerun.endDate}`)
				rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${lastRerun.version}] <div class="wish-type ${wishTypeColor}">[${wishType}]</div>`)
				const daysUntilStart = calculateDaysUntil(startDate);
				upcomingRerun = `Upcoming Rerun: ${startDate.toLocaleDateString()} (in ${daysUntilStart} days)`;

				if (reruns.length > 1) {
					const previousRerun = reruns[reruns.length - 2];
					const previousRerunEndDate = new Date(previousRerun.endDate);
					rerunInfo = createElement('div', 'rerun-info', '', `Previous Banner: (${previousRerun.startDate}) - (${previousRerun.endDate})`)
					rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${previousRerun.version}] <div class="wish-type ${wishTypeColor}">[${wishType}]</div>`)
					const daysSincePreviousRerun = calculateDaysSince(previousRerunEndDate);
					const timeSincePreviousRerun = calculateMonthsAndDaysSince(previousRerunEndDate);

					rerunStatus = ``;
					upcomingRerun = `Upcoming Banner: ${startDate.toLocaleDateString()} (in ${daysUntilStart} days)`;
					timeSince = `Time since last banner: ${timeSincePreviousRerun.months} months, ${timeSincePreviousRerun.days} days`;
					daysSince = `Days since last banner: ${daysSincePreviousRerun} days`;

					previousRun = createElement('div', 'rerun-status', '', `<span>${timeSince}<br>${daysSince}</span>`)
				}

				upcomingRun = createElement('div', 'upcoming-rerun-status', upcomingRerun)
			}
		} else {
			rerunInfo = createElement('div', 'rerun-info', '', `Previous Banner: (${lastRerun.startDate}) - (${lastRerun.endDate})`)
			rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${lastRerun.version}] <div class="wish-type ${wishTypeColor}">[${wishType}]</div>`)
			if (now >= startDate && now <= endDate) {
				if (reruns.length > 1) {
					const previousRerun = reruns[reruns.length - 2];
					const previousRerunEndDate = new Date(previousRerun.endDate);
					rerunInfo = createElement('div', 'rerun-info', '', `Previous Banner: (${previousRerun.startDate}) - (${previousRerun.endDate})`)
					rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${previousRerun.version}] <div class="wish-type ${wishTypeColor}">[${wishType}]</div>`)
					const daysSincePreviousRerun = calculateDaysSince(previousRerunEndDate);
					const timeSincePreviousRerun = calculateMonthsAndDaysSince(previousRerunEndDate);
					timeSince = `Time since last banner: ${timeSincePreviousRerun.months} months, ${timeSincePreviousRerun.days} days`;
					daysSince = `Days since last banner: ${daysSincePreviousRerun} days`;

					previousRun = createElement('div', 'rerun-status', '', `<span>${timeSince}<br>${daysSince}</span>`)
				}

				ongoingRun = createElement('div', 'ongoing-rerun-status', `Ongoing: (${lastRerun.startDate}) - (${lastRerun.endDate})`)

			} else {
				timeSince = `Time since last banner: ${timeSinceLastRerun.months} months, ${timeSinceLastRerun.days} days`;
				daysSince = `Days since last banner: ${daysSinceLastRerun} days`;

				previousRun = createElement('div', 'rerun-status', '', `<span>${timeSince}<br>${daysSince}</span>`)
			}
		}

		details.appendChild(name);
		name.appendChild(bannerCount);
		details.appendChild(rerunInfo);
		details.appendChild(rerunVersionInfo);

		if (previousRun) details.appendChild(previousRun);
		if (ongoingRun) details.appendChild(ongoingRun);
		if (upcomingRun) details.appendChild(upcomingRun);

		card.appendChild(img);
		card.appendChild(details);

		// Append card to character list
		characterList.appendChild(card);
	});
}

checkJsonData();
