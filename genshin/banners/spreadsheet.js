// Function to check if a date is "upcoming" based on the current date
function isUpcomingDate(dateString) {
	const date = new Date(dateString);
	return date > new Date();
}

// Function to convert character name to snake_case
function toSnakeCase(name) {
	return name.toLowerCase().replace(/ /g, '_');
}

// Function to create an image element for a character
function createCharacterImage(character) {
	const snakeCaseName = toSnakeCase(character.name);
	const img = document.createElement('img');
	img.src = `https://paimon.moe/images/characters/${snakeCaseName}.png`;
	img.alt = `${character.name} avatar`;
	img.title = `${character.name}`;
	img.classList.add('character-image');
	img.classList.add(character.star === 5 ? 'five-star-image' : 'four-star-image');
	return img;
}

// Function to create a checkmark element with color based on wishType
function createCheckmark(wishType) {
	const span = document.createElement('span');
	span.classList.add('checkmark');

	// Add a class based on the wishType for different colors
	switch (wishType) {
		case 'chronicled':
			span.classList.add('chronicled-wish');
			break;
		case 'event':
		default:
			span.classList.add('event-wish');
			break;
	}

	return span;
}

// Function to create a valid Date object
function createValidDate(dateString) {
	const date = new Date(dateString);
	return isNaN(date.getTime()) ? null : date;
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

document.addEventListener('DOMContentLoaded', () => {
	const table = document.getElementById('banner-timeline');

	// Fetch JSON data from rerun_data.json
	fetch('rerun_data.json')
		.then(response => response.json())
		.then(data => {
			const versionPhases = {};
			const versionPhasesSet = {};  // {version: Set<phase>}
			const characters = [];

			// Extract versions and characters, and collect unique phases by version
			data.characters.forEach(character => {
				if (character.reruns && character.reruns.length > 0) {
					characters.push(character);
					character.reruns.forEach(rerun => {
						if (!versionPhases[rerun.version]) {
							versionPhases[rerun.version] = [];
						}
						// Check for duplicates before adding a phase
						const isDuplicate = versionPhases[rerun.version].some(phase =>
							phase[0] === rerun.startDate && phase[1] === rerun.endDate && (phase[3] === undefined || phase[3] === rerun.phase)
						);

						// Only add the phase if it's not a duplicate
						if (!isDuplicate) {
							versionPhases[rerun.version].push([rerun.startDate, rerun.endDate, rerun.version, rerun.phase]);
						}
					});
				}
			});

			// Sort phases for each version by the start date
			Object.keys(versionPhases).forEach(version => {
				versionPhases[version].sort((a, b) => {
					const startDateA = createValidDate(a[0]);
					const startDateB = createValidDate(b[0]);
					return (startDateA && startDateB) ? startDateA.getTime() - startDateB.getTime() : 0;
				});
			});

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

			const versionArray = Object.keys(versionPhases).sort();

			// Create header columns for versions
			const headerRow = table.querySelector('thead tr');
			const phaseRow = document.createElement('tr');

			versionArray.forEach(version => {
				const versionTh = document.createElement('th');
				versionTh.colSpan = versionPhases[version].length;
				versionTh.textContent = `Version ${version}`;
				versionTh.classList.add('version');
				headerRow.appendChild(versionTh);

				versionPhases[version].forEach((phase, index) => {
					const phaseTh = document.createElement('th');

					phaseTh.textContent = phase[3] !== undefined ? `Phase ${phase[3]}` : phase[0] === 'upcoming' ? `Phase ???` : `Phase ${index + 1}`;
					phaseTh.classList.add('phase');
					phaseRow.appendChild(phaseTh);
				});
			});

			table.querySelector('thead').appendChild(headerRow);
			table.querySelector('thead').appendChild(phaseRow);

			// Sort characters by their first banner date
			characters.sort((a, b) => {
				const aFirstBanner = a.reruns.length > 0 ? new Date(a.reruns[0].startDate) : new Date();
				const bFirstBanner = b.reruns.length > 0 ? new Date(b.reruns[0].startDate) : new Date();
				return aFirstBanner - bFirstBanner;
			});

			// Create rows for each character
			const tbody = table.querySelector('tbody');
			characters.forEach(character => {
				const row = document.createElement('tr');

				const entry = document.createElement('td');
				entry.classList.add('character-entry');

				// Append image
				const img = createCharacterImage(character);
				entry.appendChild(img);

				// Append name
				const nameElement = document.createElement('span');
				nameElement.textContent = character.name;
				entry.appendChild(nameElement);

				row.appendChild(entry);

				const rerunDates = character.reruns.map(rerun => ({
					start: new Date(rerun.startDate),
					end: new Date(rerun.endDate),
				}));

				// Initialize elapsedTime and maxElapsedTime
				let elapsedTime = 0;
				const maxElapsedTime = 20; // Maximum elapsed time for gradient

				versionArray.forEach(version => {
					const versionReruns = character.reruns.filter(rerun => rerun.version === version);
					versionPhases[version].forEach((phase) => {
						const phaseCell = document.createElement('td');
						const phaseStartDate = createValidDate(phase[0]);
						const phaseEndDate = createValidDate(phase[1]);

						// Check for a rerun in this phase
						const phaseRerun = versionReruns.find(rerun => {
							const phaseStart = createValidDate(rerun.startDate);
							const phaseEnd = createValidDate(rerun.endDate);
							const validPhaseStart = createValidDate(phase[0]);
							const validPhaseEnd = createValidDate(phase[1]);

							// Check if it's an upcoming phase
							if (phase[0] === "upcoming") {
								// Only match if the phase is set and matches
								return (rerun.phase && (rerun.phase === phase[3]) || phase[3] === undefined);
							}

							return phase[0] === "upcoming" || phaseStart && phaseEnd && validPhaseStart && validPhaseEnd &&
								phaseStart.toISOString() === validPhaseStart.toISOString() &&
								phaseEnd.toISOString() === validPhaseEnd.toISOString();
						});

						// If this phase is before the first run, make it dark grey
						if ((rerunDates[0].start.toString() === "Invalid Date" && !(phase[0] === "upcoming")) || (phaseStartDate < rerunDates[0].start && !(phase[0] === "upcoming"))) {
							phaseCell.classList.add('before-release');
						} else if (phase[0] === "upcoming") {
							phaseCell.classList.add('upcoming-version');
							if (phaseRerun) {
								const checkmark = createCheckmark(phaseRerun.wishType);
								phaseCell.appendChild(checkmark);
							} else {
								phaseCell.textContent = '???'; // Display "Invalid" if dates are not valid
							}
							row.appendChild(phaseCell);
							return;
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

						row.appendChild(phaseCell);
					});
				});
				tbody.appendChild(row);
			});
		})
		.catch(error => console.error('Error loading JSON data:', error));
});

