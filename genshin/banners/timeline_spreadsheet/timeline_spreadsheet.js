// Function to check if a date is "upcoming" based on the current date
function isUpcomingDate(dateString) {
	const date = new Date(dateString);
	return date > new Date();
}

// Function to create a checkmark element with color based on wishType
function createCheckmark(wishType) {
	const span = createSpan(['checkmark', wishType === 'chronicled' ? 'chronicled-wish' : wishType === 'upcoming' ? 'upcoming-wish' : 'event-wish']);
	return span;
}

// Function to calculate color transition from green to red
function calculateCharacterGradientColor(elapsedTime, maxElapsedTime) {
	const greenColor = { r: 0, g: 255, b: 0 }; // Green
	const redColor = { r: 255, g: 0, b: 0 }; // Red
	const blackColor = { r: 255, g: 255, b: 255 }; // Black

	let startColor, endColor, ratio;

	if (elapsedTime <= maxElapsedTime) {
		startColor = greenColor;
		endColor = redColor;
		ratio = elapsedTime / maxElapsedTime;
	} else {
		startColor = redColor;
		endColor = blackColor;
		ratio = (elapsedTime - maxElapsedTime) / (maxElapsedTime * 3.5); // Extend the ratio beyond maxElapsedTime
	}

	const r = Math.round(startColor.r * (1 - ratio) + endColor.r * ratio);
	const g = Math.round(startColor.g * (1 - ratio) + endColor.g * ratio);
	const b = Math.round(startColor.b * (1 - ratio) + endColor.b * ratio);

	return `rgb(${r}, ${g}, ${b})`;
}

// Combined event listener for both dropdowns
function checkJsonData() {
	Promise.all([
		fetch('https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/character_data.json').then(response => response.json()),
		fetch('https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/image_mapping_data.json').then(response => response.json())
	])
		.then(([characterData, imageMappingData]) => {
			const includeUpcomingCharacters = localStorage.getItem('includeUpcoming') === 'true'; // Check if it's the string 'true'

			// Helper function to get image ID from imageMappingData.json or fallback to itemName
			function getImageId(itemName, imageMappingData) {
				return imageMappingData.Characters[itemName] || itemName;
			}

			// Function to create an image element for a character
			function createCharacterImage(character) {
				const characterName = getImageId(character.name, imageMappingData);
				const characterImageLink =
					createLink(['item-link'],
						`https://genshin-impact.fandom.com/wiki/${character.name}`);
				const characterImage =
					createImage(['character-image', character.star === 5 && character.starType ? 'special-star-image' : character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
						`https://api.hakush.in/gi/UI/UI_AvatarIcon_${characterName}.webp`,
						`${character.name} avatar`,
						character.name);
				characterImageLink.appendChild(characterImage);
				return characterImageLink;
			}

			const table = document.getElementById('banner-timeline');
			const versionPhases = {};
			const versionPhasesSet = {};  // {version: Set<phase>}
			const characters = [];

			// Extract versions and characters, and collect unique phases by version
			characterData.characters
				.filter(character => {
					// If '?upcoming' is present, include all characters
					if (includeUpcomingCharacters) return true;
					// Only include characters that do not have an upcoming banner and have a version field in reruns
					return character.reruns.some(rerun => rerun.version) &&
						!character.reruns.some(rerun => rerun.banner === 'upcoming');
				})
				.forEach(character => {
					if ((character.reruns && character.reruns.length > 0)) {
						if (character.name === "Traveler") return
						characters.push(character);
						character.reruns.forEach(rerun => {
							if (!versionPhases[rerun.version]) {
								versionPhases[rerun.version] = [];
							}

							// Skip adding upcoming phase if it's a leak and upcoming is not enabled
							if (rerun.phase === "upcoming" && rerun.info === "leak" && !includeUpcomingCharacters) return;

							// Check for duplicates before adding a phase
							const isDuplicate = versionPhases[rerun.version].some(phase =>
								phase[0] === rerun.startDate &&
								phase[1] === rerun.endDate &&
								phase[3] === rerun.phase
							);

							// Only add the phase if it's not a duplicate
							if (!isDuplicate) {
								versionPhases[rerun.version].push([
									rerun.startDate,
									rerun.endDate,
									rerun.version,
									rerun.phase
								]);
							}
						});
					}
				});

			// Log collected phases before sorting
			console.log("Before sorting phases (versionPhases):", versionPhases);

			// Sort phases for each version by the start date
			Object.keys(versionPhases).forEach(version => {
				versionPhases[version].sort((a, b) => {
					const startDateA = safeParseDate(a[0]);
					const startDateB = safeParseDate(b[0]);
					return (startDateA && startDateB) ? startDateA.getTime() - startDateB.getTime() : 0;
				});
			});

			// Log after sorting by date
			console.log("After sorting by start date (versionPhases):", versionPhases);

			// Sort phases for each version by phase number (last element in each array)
			Object.keys(versionPhases).forEach(version => {
				versionPhases[version] = Array.from(versionPhases[version]).sort((a, b) => {
					// Convert phase values to numbers for comparison
					const phaseA = parseInt(a[3], 10);
					const phaseB = parseInt(b[3], 10);

					// Sort by phase number, with the lower number first
					return phaseA - phaseB;
				});
			});

			// Log after sorting by phase number
			console.log("After sorting by phase number (versionPhases):", versionPhases);

			const versionArray = Object.keys(versionPhases).sort();

			// Create header columns for versions
			const headerRow = table.querySelector('thead tr');
			const phaseRow = createElement('tr');

			versionArray.forEach(version => {
				// Check if any character has a rerun with a valid startDate and endDate for this version
				const versionHasValidRerun = characters.some(character => {
					return character.reruns.some(rerun => rerun.version === version && ((rerun.startDate && rerun.endDate) || rerun.banner === "upcoming"));
				});

				// Only add the version column if there's a valid rerun for this version
				if (versionHasValidRerun) {
					const versionTh = createElement('th', 'version', `Version ${version}`);

					// Separate normal phases and upcoming phases
					const normalPhases = versionPhases[version].filter(phase => phase[3] !== 'upcoming');
					const upcomingPhases = versionPhases[version].filter(phase => phase[3] === 'upcoming');

					// Set colspan to total phases count
					versionTh.colSpan = normalPhases.length + upcomingPhases.length;
					headerRow.appendChild(versionTh);

					// Add normal phases first with numbered labels
					normalPhases.forEach((phase, index) => {
						const phaseTh = createElement('th', 'phase', '', `Phase<br>${index + 1}`);
						phaseRow.appendChild(phaseTh);
					});

					// Then add the upcoming phases with "Phase ???"
					upcomingPhases.forEach(() => {
						const phaseTh = createElement('th', 'phase', '', `Phase<br>???`);
						phaseRow.appendChild(phaseTh);
					});
				}
			});

			table.querySelector('thead').appendChild(headerRow);
			table.querySelector('thead').appendChild(phaseRow);

			// Sort characters by their first banner date
			characters.sort((a, b) => {
				const aFirstBanner = a.reruns.length > 0 ? new Date(a.reruns[0].startDate) : new Date();
				const bFirstBanner = b.reruns.length > 0 ? new Date(b.reruns[0].startDate) : new Date();
				return aFirstBanner - bFirstBanner;
			});

			// Initialize elapsedTime and maxElapsedTime
			let elapsedTime = 0;
			const maxElapsedTime = 20; // Maximum elapsed time for gradient

			function createPhaseCell(character, phase, version) {
				const rerunDates = character.reruns.map(rerun => ({
					start: new Date(rerun.startDate),
					end: new Date(rerun.endDate),
					banner: rerun.banner,
					version: rerun.version
				}));
				
				const phaseCell = createElement('td');
				const phaseStartDate = safeParseDate(phase[0]);
				const phaseEndDate = safeParseDate(phase[1]);

				const versionReruns = character.reruns.filter(rerun => rerun.version === version);

				// Find the matching rerun for this phase, similar to your existing logic
				const phaseRerun = versionReruns.find(rerun => {
					const phaseStart = safeParseDate(rerun.startDate);
					const phaseEnd = safeParseDate(rerun.endDate);
					const validPhaseStart = safeParseDate(phase[0]);
					const validPhaseEnd = safeParseDate(phase[1]);

					if (phase[3] === "upcoming") {
						return (rerun.phase && rerun.phase === phase[3]) || phase[3] === undefined;
					}

					return phaseStart && phaseEnd && validPhaseStart && validPhaseEnd &&
						phaseStart.toISOString() === validPhaseStart.toISOString() &&
						phaseEnd.toISOString() === validPhaseEnd.toISOString();
				});


				// If this phase is before the first run, make it dark grey
				if (rerunDates[0].banner === "upcoming") {
					if (version === rerunDates[0].version) {
						phaseCell.classList.add('upcoming-version');
						if (phaseRerun) {
							const checkmark = createCheckmark(phaseRerun.wishType);
							phaseCell.appendChild(checkmark);
						} else {
							const questionmark = createCheckmark('upcoming');
							phaseCell.appendChild(questionmark);
						}
					} else {
						phaseCell.classList.add('before-release');
					}
					row.appendChild(phaseCell);
					return;
				} else if ((phaseStartDate < rerunDates[0].start && !(phase[0] === "upcoming"))) {
					if (phase[3] === "upcoming") {
						phaseCell.classList.add('upcoming-version');
						const checkmark = createCheckmark(phaseRerun?.wishType || 'upcoming');
						phaseCell.appendChild(checkmark);
					} else {
						phaseCell.classList.add('before-release');
					}
				} else if (phaseRerun) {
					const checkmark = createCheckmark(phaseRerun.wishType);
					phaseCell.appendChild(checkmark);

					// Reset elapsedTime after each rerun
					elapsedTime = 0;
				} else {
					phaseCell.classList.add(`${elapsedTime}`);
					phaseCell.style.backgroundColor = calculateCharacterGradientColor(elapsedTime, maxElapsedTime);
					elapsedTime++;
					phaseCell.textContent = `${elapsedTime}`; // Display elapsedTime
				}

				return phaseCell;
			}

			// Create rows for each character
			const tbody = table.querySelector('tbody');
			characters.forEach(character => {
				const row = createElement('tr');

				const entry = createElement('td', 'character-entry');

				// Append image
				const img = createCharacterImage(character);
				entry.appendChild(img);

				// Append name
				const nameElement = createSpan('', character.name);
				entry.appendChild(nameElement);

				row.appendChild(entry);

				const rerunDates = character.reruns.map(rerun => ({
					start: new Date(rerun.startDate),
					end: new Date(rerun.endDate),
					banner: rerun.banner,
					version: rerun.version
				}));

				versionArray.forEach(version => {// Separate phases into normal and upcoming like header
					const normalPhases = versionPhases[version].filter(phase => phase[3] !== 'upcoming');
					const upcomingPhases = versionPhases[version].filter(phase => phase[3] === 'upcoming');

					// Output normal phases first
					normalPhases.forEach(phase => {
						const phaseCell = createPhaseCell(character, phase, version);
						row.appendChild(phaseCell);
					});

					// Then output upcoming phases
					upcomingPhases.forEach(phase => {
						const phaseCell = createPhaseCell(character, phase, version);
						row.appendChild(phaseCell);
					});

				});
				tbody.appendChild(row);
			});
		})
		.catch(error => console.error('Error loading JSON data:', error));
}

checkJsonData();
