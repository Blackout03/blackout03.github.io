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


// Function to calculate the gap between two dates
function calculateGap(startDate, endDate) {
	const start = new Date(startDate);
	const end = new Date(endDate);
	return Math.abs(start - end) / (1000 * 60 * 60 * 24); // Gap in days
}

// Function to find the 3 longest gaps without a banner
function findLongestGaps(data) {
	const excludedCharacters = new Set([
		"Keqing", "Tighnari", "Dehya", "Amber", "Kaeya",
		"Lisa", "Jean", "Diluc", "Mona"
	]);

	const gaps = [];
	const currentDate = new Date(); // Get the current date as a Date object

	data.characters
		.filter(character => !excludedCharacters.has(character.name))
		.forEach(character => {
			const reruns = character.reruns
				// Filter out upcoming banners (future start dates)
				.filter(rerun => new Date(rerun.startDate) <= currentDate)
				.filter(rerun => rerun.startDate !== "upcoming");

		// Calculate gaps between consecutive banners
		for (let i = 0; i < reruns.length - 1; i++) {
			const currentEnd = reruns[i].endDate;
			const nextStart = reruns[i + 1].startDate;
			let gap = calculateGap(nextStart, currentEnd);
			gaps.push({
				character: character.name,
				imageName: character.imageName,
				gap,
				start: currentEnd,
				end: nextStart,
				star: character.star
			});
		}

		// Calculate the gap between the last banner and the current date
		if (reruns.length > 0) {
			const mostRecentEnd = reruns[reruns.length - 1].endDate;
			const currentDate = new Date().toISOString().split('T')[0];
			let gap = calculateGap(currentDate, mostRecentEnd);
			gaps.push({
				character: character.name,
				imageName: character.imageName,
				gap,
				start: mostRecentEnd,
				end: "Ongoing",
				star: character.star
			});
		}
	});

	// Sort gaps in descending order and get the top 10
	gaps.sort((a, b) => b.gap - a.gap);
	return gaps.slice(0, 10);
}

function checkJsonData() {
	fetch('rerun_data.json')
		.then(response => response.json())
		.then(data => {
			const longestGaps = findLongestGaps(data);
			displayLongestGaps(longestGaps);
		})
		.catch(error => console.error('Error fetching rerun data:', error));
}

// Function to display the longest gaps on the page
function displayLongestGaps(gaps) {
	const container = document.getElementById('longest-gaps');
	container.innerHTML = '';

	gaps.forEach((gap, index) => {
		const gapElement = createElement('div', 'gap-item');
		const characterName = gap.imageName ? gap.imageName : gap.character;

		const img = createElement('img', 'character-image');
		img.src = `https://homdgcat.wiki/homdgcat-res/Avatar/UI_AvatarIcon_${characterName}.png`;
		img.alt = `${gap.character} avatar`;
		img.title = `${gap.character}`;
		img.classList.add(gap.star === 5 ? 'five-star-image' : gap.star === 4 ? 'four-star-image' : 'unknown-star-image');

		const info = createElement('div', 'gap-info', '', `
			<div class="character-name">${gap.character}</div>
			<p><strong>Gap Length:</strong> ${gap.gap} days</p>
			<p><strong>Gap Start:</strong> ${gap.start}</p>
			<p><strong>Gap End:</strong> ${gap.end}</p>`);

		gapElement.appendChild(img);
		gapElement.appendChild(info);
		container.appendChild(gapElement);
	});
}


checkJsonData()
