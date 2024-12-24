// Combined event listener for both dropdowns
function checkJsonData() {
	Promise.all([
		fetch('../../character_data.json').then(response => response.json()),
		fetch('../../image_data.json').then(response => response.json())
	])
		.then(([characterData, imageData]) => {
			const urlParams = new URLSearchParams(window.location.search);
			const includeUpcomingCharacters = urlParams.has('includeUpcoming'); // Check if '?upcoming' is in the URL

			// Helper function to get image ID from imageData.json or fallback to itemName
			function getImageId(itemName, imageData) {
				return imageData[itemName] || itemName;
			}

			// Function to create an image element for a character
			function createCharacterImage(character) {
				const characterName = getImageId(character.name, imageData);
				const img =
					createImage(['character-image', character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
						`https://homdgcat.wiki/images/avataricon/avatar/${characterName}.png`,
						`${character.name} avatar`,
						`${character.name}`);
				return img;
			}

			// Function to create and style the list of character names based on their star rating
			function createCharacterNameContainer(group) {
				// Separate characters by star rating
				const fiveStarCharacters = group.characters.filter(char => char.star === 5);
				const fourStarCharacters = group.characters.filter(char => char.star === 4);
				const unknownStarCharacters = group.characters.filter(char => char.star !== 5 && char.star !== 4);

				// Combine characters and sort by star rating
				const sortedCharacters = [...fiveStarCharacters, ...fourStarCharacters, ...unknownStarCharacters];

				// Create a container for all character entries
				const characterContainer = createDiv('character-container');

				// Create a comma-separated list of names
				sortedCharacters.forEach(char => {
					const entry = createDiv('character-entry');

					// Append image
					const img = createCharacterImage(char);
					entry.appendChild(img);

					// Append name
					const nameElement = createSpan(char.star === 5 ? 'five-star' : char.star === 4 ? 'four-star' : 'unknown-star', char.name);
					entry.appendChild(nameElement);

					characterContainer.appendChild(entry);
				});

				return characterContainer;
			}

			const timeline = document.getElementById('timeline');
			const bannersByVersion = {}; // To store phases by version

			// Create a combined list of all reruns with character data
			const reruns = [];
			characterData.characters
				.filter(character => {
					// If '?upcoming' is present, include all characters
					if (includeUpcomingCharacters) return true;
					// Only include characters that do not have an upcoming banner and have a version field in reruns
					return character.reruns.some(rerun => rerun.version) &&
						!character.reruns.some(rerun => rerun.banner === 'upcoming');
				})
				.forEach(character => {
					character.reruns.forEach(rerun => {
						reruns.push({
							name: character.name,
							startDate: rerun.startDate,
							endDate: rerun.endDate,
							version: rerun.version,
							comment_version: rerun.__version,
							wishType: rerun.wishType,
							star: character.star,
							phase: rerun.phase || null // Add phase, use null if it doesn't exist
						});
					});
				});

			// Sort reruns by startDate and endDate
			reruns.sort((a, b) => {
				// Parse versions as floats for numerical comparison
				const versionDiff = parseFloat(a.version) - parseFloat(b.version);
				if (versionDiff !== 0) return versionDiff;

				// If versions are the same, compare start dates
				const startDiff = new Date(a.startDate) - new Date(b.startDate);
				if (startDiff !== 0) return startDiff;

				// If start dates are the same, compare end dates
				return new Date(a.endDate) - new Date(b.endDate);
			});


			// Group by startDate, endDate, and wishType
			const groupedReruns = [];
			reruns
				.filter(rerun => !rerun.comment_version)
				.forEach(rerun => {
				// Check if there's already a group for the same start, end, and wishType
				const group = groupedReruns.find(group =>
					group.startDate === rerun.startDate &&
					group.endDate === rerun.endDate &&
					group.wishType === rerun.wishType &&
					group.phase === rerun.phase &&
					group.banner === rerun.banner
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
						characters: [{ name: rerun.name, star: rerun.star }],
						phase: rerun.phase || null // Store phase if it exists
					});
				}
			});

			// Display the grouped reruns
			groupedReruns
				.sort((a, b) => {
					// First, compare versions numerically
					const versionDiff = parseFloat(a.version) - parseFloat(b.version);
					if (versionDiff !== 0) return versionDiff;

					// If versions are the same, compare start dates
					return new Date(a.startDate) - new Date(b.startDate);
				})
				.forEach(group => {
				// Initialize version phases if not already present
				if (!bannersByVersion[group.version]) {
					bannersByVersion[group.version] = [];
				}

				console.log(groupedReruns)

				// Check if there's already a banner with the same start and end date for this version
				const existingPhase = bannersByVersion[group.version]?.find(
					b => b.startDate === group.startDate && b.endDate === group.endDate
				);

				let phase;
				if (!group.startDate && !group.endDate) {
					const bannerEntry = createDiv('banner-entry');

					const characterNameContainer = createCharacterNameContainer(group);
					bannerEntry.appendChild(characterNameContainer);

					const bannerDetails = createDiv('banner-details');

					// Add Upcoming Character message!
					const upcomingBanner = createSpan('upcoming-banner', `Upcoming Characters in ${group.version}`);
					bannerDetails.appendChild(upcomingBanner);

					const version = createSpan('', `Version: ${group.version}`);
					bannerDetails.appendChild(version);

					bannerEntry.appendChild(bannerDetails);
					timeline.appendChild(bannerEntry);
				} else {
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

					const bannerEntry = createDiv('banner-entry');

					const characterNameContainer = createCharacterNameContainer(group);
					bannerEntry.appendChild(characterNameContainer);

					const bannerDetails = createDiv('banner-details');

					// Create and append the start and end date
					const startDate = createSpan('', `Start: ${group.startDate}`);
					bannerDetails.appendChild(startDate);

					const endDate = createSpan('', `End: ${group.endDate}`);
					bannerDetails.appendChild(endDate);

					const version = createSpan('', group.phase ? `Version: ${group.version}, Phase ${group.phase}` : `Version: ${group.version}, Phase ${phase}`);
					
					bannerDetails.appendChild(version);

					bannerEntry.appendChild(bannerDetails);
					timeline.appendChild(bannerEntry);
				}
			});
		})
		.catch(error => console.error('Error loading JSON:', error));
}

checkJsonData();
