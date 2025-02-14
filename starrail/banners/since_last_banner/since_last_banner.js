// Function to filter and sort characters based on hash
function filterAndSortCharacters(characters) {
	const sortOption = document.getElementById('sortOptions').value;
	const typeFilter = Array.from(document.querySelectorAll('#typeFilter input[type="checkbox"]:checked')).map(input => input.value);
	const pathFilter = Array.from(document.querySelectorAll('#pathFilter input[type="checkbox"]:checked')).map(input => input.value);
	const starFilter = Array.from(document.querySelectorAll('#starFilter input[type="checkbox"]:checked')).map(input => Number(input.value));

	let filteredCharacters = characters;

	// Filter characters by selected elements
	if (typeFilter.length > 0) {
		filteredCharacters = filteredCharacters.filter(character => typeFilter.includes(character.type?.toLowerCase()));
	}

	// Filter characters by selected elements
	if (pathFilter.length > 0) {
		filteredCharacters = filteredCharacters.filter(character => pathFilter.includes(character.path?.toLowerCase()));
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
				return (!lastRerun.startDate && !lastRerun.endDate) || ((lastRerun.startDate === "upcoming" && lastRerun.endDate === "upcoming") || now < startDate);
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
	Promise.all([
		fetch('../../character_data.json').then(response => response.json()),
		fetch('../../image_mapping_data.json').then(response => response.json())
	])
		.then(([characterData, imageMappingData]) => {
			const urlParams = new URLSearchParams(window.location.search);
			const includeUpcomingCharacters = urlParams.has('includeUpcoming'); // Check if '?upcoming' is in the URL

			// Helper function to get image ID from imageMappingData.json or fallback to itemName
			function getImageId(itemName, imageMappingData) {
				return imageMappingData[itemName] || itemName;
			}

			clearCharacterList(); // Clear the list before updating
			const characterList = document.getElementById('character-list');

			let characters = characterData.characters.filter(character => character.reruns.length > 0); // Exclude characters with no reruns

			const sortedCharacters = filterAndSortCharacters(characters);

			sortedCharacters
				.filter(character => {
					// If '?upcoming' is present, include all characters
					if (includeUpcomingCharacters) return true;
					// Only include characters that do not have an upcoming banner and have a version field in reruns
					return character.reruns.some(rerun => rerun.version) &&
						!character.reruns.some(rerun => rerun.banner === 'upcoming');
				})
				.forEach(character => {
					if (character.name === "Traveler") return
					const reruns = character.reruns;
					const lastRerun = reruns[reruns.length - 1];
					const startDate = new Date(lastRerun.startDate);
					const endDate = new Date(lastRerun.endDate);
					const now = new Date();
					const daysSinceLastRerun = calculateDaysSince(lastRerun.endDate);
					const timeSinceLastRerun = calculateMonthsAndDaysSince(lastRerun.endDate);
					const characterName = getImageId(character.name, imageMappingData);

					const card = createDiv('character-card');

					const img = createImage('character-image');
					img.src = `https://homdgcat.wiki/images/avataricon/avatar/${characterName}.png`;
					img.alt = `${character.name} avatar`;
					img.title = `${character.name}`;
					img.classList.add(character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image');

					const details = createDiv('character-details');
					const name = createSpan('character-name', character.name);
					const bannerCount = createDiv('banner-count', `Banners: ${reruns.length}`);

					let rerunStatus;
					let rerunInfo;
					let rerunVersionInfo;
					let previousRun;
					let ongoingRun;
					let upcomingRun;
					let upcomingRerun;
					let timeSince;
					let daysSince;


					// Append other info to card

					if (!lastRerun.startDate && !lastRerun.endDate) {
						rerunInfo = createDiv('rerun-info', '', `Upcoming Release!`)
						rerunVersionInfo = createSpan('rerun-version-info', '', `[Version ${lastRerun.version}]`)

						upcomingRun = createSpan('upcoming-rerun-status', '', `Upcoming Release: ${lastRerun.version} <div class="upcoming-version">[Version ${lastRerun.version}]</div>`)
					} else if (lastRerun.startDate === "upcoming" && lastRerun.endDate === "upcoming" || now < startDate) {
						const isUpcoming = lastRerun.startDate === "upcoming" && lastRerun.endDate === "upcoming";

						if (isUpcoming && reruns.length > 1) {
							rerunInfo = createDiv('rerun-info', '', `Release: ${lastRerun.startDate}`)
							rerunVersionInfo = createSpan('rerun-version-info', '', `[Version ${lastRerun.version}]`)
							upcomingRun = createDiv('upcoming-rerun-status', `Upcoming Rerun: ${lastRerun.version} <div class="upcoming-version">[Version ${lastRerun.version}]</div>`)

							if (reruns.length > 1) {
								const previousRerun = reruns[reruns.length - 2];
								const previousRerunEndDate = new Date(previousRerun.endDate);
								rerunInfo = createDiv('rerun-info', '', `Previous Banner: (${previousRerun.startDate}) - (${previousRerun.endDate})`)
								rerunVersionInfo = createSpan('rerun-version-info', '', `[Version ${previousRerun.version}]`)
								const daysSincePreviousRerun = calculateDaysSince(previousRerunEndDate);
								const timeSincePreviousRerun = calculateMonthsAndDaysSince(previousRerunEndDate);

								timeSince = `Time since last banner: ${timeSincePreviousRerun.months} months, ${timeSincePreviousRerun.days} days`;
								daysSince = `Days since last banner: ${daysSincePreviousRerun} days`;

								previousRun = createDiv('rerun-status', '', `<span>${timeSince}<br>${daysSince}</span>`)
							}
						} else if (isUpcoming) {
							rerunInfo = createDiv('rerun-info', '', `Release: ${lastRerun.startDate}`)
							rerunVersionInfo = createSpan('rerun-version-info', '', `[Version ${lastRerun.version}]`)
							upcomingRun = createDiv('upcoming-rerun-status', `Upcoming Rerun: ${lastRerun.version}`)

						} else {
							rerunInfo = createDiv('rerun-info', '', `Release: ${lastRerun.startDate}`)
							rerunVersionInfo = createSpan('rerun-version-info', '', `[Version ${lastRerun.version}]`)
							const daysUntilStart = calculateDaysUntil(startDate);
							upcomingRerun = `Upcoming Release: ${startDate.toLocaleDateString()} (in ${daysUntilStart} days) <div class="upcoming-version">[Version ${lastRerun.version}]</div>`;

							if (reruns.length > 1) {
								const previousRerun = reruns[reruns.length - 2];
								const previousRerunEndDate = new Date(previousRerun.endDate);
								rerunInfo = createDiv('rerun-info', '', `Previous Banner: (${previousRerun.startDate}) - (${previousRerun.endDate})`)
								rerunVersionInfo = createSpan('rerun-version-info', '', `[Version ${previousRerun.version}]`)
								const daysSincePreviousRerun = calculateDaysSince(previousRerunEndDate);
								const timeSincePreviousRerun = calculateMonthsAndDaysSince(previousRerunEndDate);

								rerunStatus = ``;
								upcomingRerun = `Upcoming Banner: ${startDate.toLocaleDateString()} (in ${daysUntilStart} days) <div class="upcoming-version">[Version ${lastRerun.version}]</div>`;
								timeSince = `Time since last banner: ${timeSincePreviousRerun.months} months, ${timeSincePreviousRerun.days} days`;
								daysSince = `Days since last banner: ${daysSincePreviousRerun} days`;

								previousRun = createDiv('rerun-status', '', `<span>${timeSince}<br>${daysSince}</span>`)
							}

							upcomingRun = createSpan('upcoming-rerun-status', '', upcomingRerun)
						}
					} else {
						rerunInfo = createDiv('rerun-info', '', `Previous Banner: (${lastRerun.startDate}) - (${lastRerun.endDate})`)
						rerunVersionInfo = createSpan('rerun-version-info', '', `[Version ${lastRerun.version}]`)
						if (now >= startDate && now <= endDate) {
							if (reruns.length > 1) {
								const previousRerun = reruns[reruns.length - 2];
								const previousRerunEndDate = new Date(previousRerun.endDate);
								rerunInfo = createDiv('rerun-info', '', `Previous Banner: (${previousRerun.startDate}) - (${previousRerun.endDate})`)
								rerunVersionInfo = createSpan('rerun-version-info', '', `[Version ${previousRerun.version}]`)
								const daysSincePreviousRerun = calculateDaysSince(previousRerunEndDate);
								const timeSincePreviousRerun = calculateMonthsAndDaysSince(previousRerunEndDate);
								timeSince = `Time since last banner: ${timeSincePreviousRerun.months} months, ${timeSincePreviousRerun.days} days`;
								daysSince = `Days since last banner: ${daysSincePreviousRerun} days`;

								previousRun = createDiv('rerun-status', '', `<span>${timeSince}<br>${daysSince}</span>`)
							}

							ongoingRun = createSpan('ongoing-rerun-status', '', `Ongoing: (${lastRerun.startDate}) - (${lastRerun.endDate}) <div class="ongoing-version">[Version ${lastRerun.version}]</div>`)

						} else {
							timeSince = `Time since last banner: ${timeSinceLastRerun.months} months, ${timeSinceLastRerun.days} days`;
							daysSince = `Days since last banner: ${daysSinceLastRerun} days`;

							previousRun = createDiv('rerun-status', '', `<span>${timeSince}<br>${daysSince}</span>`)
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
		})
		.catch(error => console.error('Error fetching rerun data:', error));
}

// Add event listeners for both dropdowns
document.getElementById('sortOptions').addEventListener('change', checkJsonData);
document.getElementById('typeFilter').addEventListener('change', checkJsonData);
document.getElementById('pathFilter').addEventListener('change', checkJsonData);
document.getElementById('starFilter').addEventListener('change', checkJsonData);

checkJsonData();