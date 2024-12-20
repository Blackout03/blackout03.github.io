// Function to find the 3 longest gaps without a banner
function findLongestGaps(data) {
	const excludedCharacters = new Set([
		"Tighnari", "Dehya", "Amber", "Kaeya",
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

	// Get 'top' value from the query parameter, default to 10
	const urlParams = new URLSearchParams(window.location.search);
	const isOngoing = urlParams.has('ongoing');
	const top = parseInt(urlParams.get('top')) || 10;

	// Filter for ongoing banners if ?ongoing is in the URL
	let filteredGaps;
	if (isOngoing) {
		filteredGaps = gaps.filter(gap => gap.end === "Ongoing");
	} else {
		filteredGaps = gaps;
	}

	// Return the top gaps based on the query parameter
	const heading = document.querySelector('h1');
	if (isOngoing) {
		heading.textContent = `Top ${top} Longest Ongoing Banners`;
	} else {
		heading.textContent = `Top ${top} Longest Periods Between Banners`;
	}

	return filteredGaps.slice(0, top);
}

// Function to display the longest gaps on the page
function displayLongestGaps(gaps) {
	gaps.forEach((gap, index) => {
		const gapElement = createDiv('gap-item');
		const characterName = getImageId(character.name);

		const img = createImage('character-image');
		img.src = `https://homdgcat.wiki/homdgcat-res/Avatar/UI_AvatarIcon_${characterName}.png`;
		img.alt = `${gap.character} avatar`;
		img.title = `${gap.character}`;
		img.classList.add(gap.star === 5 ? 'five-star-image' : gap.star === 4 ? 'four-star-image' : 'unknown-star-image');

		// Increment the banner number only if the current gap length is different from the previous one
		if (previousGap !== null && gap.gap !== previousGap) {
			currentBannerNumber++;
		}
		previousGap = gap.gap; // Update previous gap length

		const info = createDiv('gap-info', '', `
			<div class="character-name">${gap.character}</div>
			<p><strong>Gap Length:</strong> ${gap.gap} days <span class="banner-number">#${currentBannerNumber}</span></p>
			<p><strong>Gap Start:</strong> ${gap.start}</p>
			<p><strong>Gap End:</strong> ${gap.end}</p>`);

		// Create the banner number element and append it to the gap item
		const bannerNumber = createDiv('',);
		const indexText = createSpan('index-number', '', `#${index + 1}`);

		gapElement.appendChild(img);
		gapElement.appendChild(info);
		gapElement.appendChild(bannerNumber);
		bannerNumber.appendChild(indexText);

		container.appendChild(gapElement);
	});
}

Promise.all([
	fetch('../../character_data.json').then(response => response.json()),
	fetch('../../image_data.json').then(response => response.json())
])
	.then(([characterData, imageData]) => {
		const container = document.getElementById('longest-gaps');
		container.innerHTML = '';

		let currentBannerNumber = 1;  // Start with banner number 1
		let previousGap = null;       // Keep track of the previous gap length

		// Helper function to get image ID from imageData.json or fallback to itemName
		function getImageId(itemName) {
			return imageData[itemName] || itemName;
		}

		const longestGaps = findLongestGaps(characterData);
		longestGaps.forEach((gap, index) => {
			const gapElement = createDiv('gap-item');
			const characterName = getImageId(gap.character);

			const img = createImage('character-image');
			img.src = `https://homdgcat.wiki/homdgcat-res/Avatar/UI_AvatarIcon_${characterName}.png`;
			img.alt = `${gap.character} avatar`;
			img.title = `${gap.character}`;
			img.classList.add(gap.star === 5 ? 'five-star-image' : gap.star === 4 ? 'four-star-image' : 'unknown-star-image');

			// Increment the banner number only if the current gap length is different from the previous one
			if (previousGap !== null && gap.gap !== previousGap) {
				currentBannerNumber++;
			}
			previousGap = gap.gap; // Update previous gap length

			const info = createDiv('gap-info', '', `
			<div class="character-name">${gap.character}</div>
			<p><strong>Gap Length:</strong> ${gap.gap} days <span class="banner-number">#${currentBannerNumber}</span></p>
			<p><strong>Gap Start:</strong> ${gap.start}</p>
			<p><strong>Gap End:</strong> ${gap.end}</p>`);

			// Create the banner number element and append it to the gap item
			const bannerNumber = createDiv('',);
			const indexText = createSpan('index-number', '', `#${index + 1}`);

			gapElement.appendChild(img);
			gapElement.appendChild(info);
			gapElement.appendChild(bannerNumber);
			bannerNumber.appendChild(indexText);

			container.appendChild(gapElement);
		});
	})
	.catch(error => console.error('Error fetching rerun data:', error));
