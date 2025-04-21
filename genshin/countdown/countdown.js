// Constants
const versionDataUrl = 'https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/version_data.json';
const characterDataUrl = 'https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/character_data.json';
const imageMappingDataUrl = 'https://raw.githubusercontent.com/Blackout-Webhooks-Actions/GameData/refs/heads/main/image_mapping_data.json';
const defaultVersionLength = 42;
const versionJumps = {
	'1.6': '2.0',
	'2.8': '3.0',
	'3.8': '4.0',
	'4.8': '5.0',
	'5.8': '6.0'
};

function formatVersion(version) {
	return version.toFixed(1);
}

function addDays(date, days) {
	let result = new Date(date);
	result.setUTCDate(result.getUTCDate() + days);
	return result;
}

function getNextVersion(version) {
	const verStr = formatVersion(version);
	return versionJumps[verStr] ? parseFloat(versionJumps[verStr]) : parseFloat((version + 0.1).toFixed(1));
}

// Data Fetching Functions
async function fetchJSON(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error('Network response was not ok');
		return await response.json();
	} catch (error) {
		console.error(`Failed to fetch data from ${url}:`, error);
		return null;
	}
}

function calculateSchedule(versionLengths) {
	let schedule = [];
	let currentDate = new Date(Date.UTC(2020, 8, 28, 3, 0, 0)); // 3 AM UTC = 11 AM CST
	let version = 1.0;
	const now = new Date();

	while (true) {
		let verStr = formatVersion(version);
		schedule.push({ version: verStr, date: new Date(currentDate) });

		let duration = versionLengths[verStr] ?? defaultVersionLength;
		currentDate = addDays(currentDate, duration);

		const nextVersion = getNextVersion(version);
		if (currentDate > now) {
			schedule.push({ version: formatVersion(nextVersion), date: new Date(currentDate) });
			break;
		}

		version = nextVersion;
	}

	// Add the next upcoming version
	const lastVersion = parseFloat(schedule[schedule.length - 1].version);
	const lastDate = new Date(schedule[schedule.length - 1].date);
	const nextVersion = getNextVersion(lastVersion);
	const nextDate = addDays(lastDate, versionLengths[formatVersion(lastVersion)] || defaultVersionLength);
	schedule.push({ version: formatVersion(nextVersion), date: nextDate });


	return schedule;
}

function getDripMarketingDate(schedule, version) {
	const versionNumber = parseFloat(version);
	const currentVersion = schedule.find((v) => parseFloat(v.version) === versionNumber);
	if (!currentVersion) return null;

	const dripDate = addDays(currentVersion.date, -37);
	dripDate.setUTCHours(10, 0, 0, 0); // 10:00 UTC = 18:00 CST
	return dripDate;
}

function getSpecialProgramDate(versionDate) {
	const specialProgramDate = new Date(versionDate);
	specialProgramDate.setUTCDate(specialProgramDate.getUTCDate() - 7);

	while (specialProgramDate.getUTCDay() !== 5) {
		specialProgramDate.setUTCDate(specialProgramDate.getUTCDate() - 1);
	}

	specialProgramDate.setUTCHours(12, 0, 0, 0); // 12:00 UTC = 20:00 CST
	return specialProgramDate;
}

function displayCountdown(versionInfo, schedule) {
	const timerDiv = document.getElementById('version-timer');

	function updateCountdown() {
		const now = new Date();
		const diff = versionInfo.date - now;

		if (diff <= 0) {
			const nextVersion = getNextVersion(parseFloat(versionInfo.version));
			const nextVersionInfo = schedule.find(v => parseFloat(v.version) === nextVersion);
			if (nextVersionInfo) {
				versionInfo.version = nextVersionInfo.version;
				versionInfo.date = nextVersionInfo.date;
			}
			return;
		}

		let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		let minutes = Math.floor((diff / (1000 * 60)) % 60);
		let seconds = Math.floor((diff / 1000) % 60);

		timerDiv.innerHTML = `
			<p>Next Version: <strong>${versionInfo.version}</strong></p>
			<p>Releases in: <strong>${days}d ${hours}h ${minutes}m ${seconds}s</strong></p>
		`;
	}

	updateCountdown();
	setInterval(updateCountdown, 1000);
}

function displayDripMarketingCountdown(schedule) {
	const dripCountdownDiv = document.getElementById('drip-countdown');
	let currentIndex = schedule.length - 1;
	let currentVersion = schedule[currentIndex];
	let dripDate = getDripMarketingDate(schedule, currentVersion.version);

	function updateDripCountdown() {
		const now = new Date();
		const diff = dripDate - now;

		if (diff <= 0) {
			const nextVersion = getNextVersion(parseFloat(currentVersion.version));
			const nextVersionInfo = schedule.find(v => parseFloat(v.version) === nextVersion);

			if (nextVersionInfo) {
				currentVersion = nextVersionInfo;
				dripDate = getDripMarketingDate(schedule, currentVersion.version);
			}
			return;
		}

		let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		let minutes = Math.floor((diff / (1000 * 60)) % 60);
		let seconds = Math.floor((diff / 1000) % 60);

		dripCountdownDiv.innerHTML = `
			<p>Next Drip Marketing: <strong>${currentVersion.version}</strong></p>
			<p>Starts in: <strong>${days}d ${hours}h ${minutes}m ${seconds}s</strong></p>
		`;
	}

	updateDripCountdown();
	setInterval(updateDripCountdown, 1000);
}

function displaySpecialProgramCountdown(schedule) {
	const specialProgramCountdownDiv = document.getElementById('special-program-countdown');
	let currentIndex = schedule.length - 2;
	let currentVersion = schedule[currentIndex];
	let specialProgramDate = getSpecialProgramDate(currentVersion.date);

	function updateSpecialProgramCountdown() {
		const now = new Date();
		const diff = specialProgramDate - now;

		if (diff <= 0) {
			const nextVersion = getNextVersion(parseFloat(currentVersion.version));
			const nextVersionInfo = schedule.find(v => parseFloat(v.version) === nextVersion);
			if (nextVersionInfo) {
				currentVersion = nextVersionInfo;
				specialProgramDate = getSpecialProgramDate(currentVersion.date);
			}
			return;
		}

		let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		let minutes = Math.floor((diff / (1000 * 60)) % 60);
		let seconds = Math.floor((diff / 1000) % 60);

		specialProgramCountdownDiv.innerHTML = `
			<p>Next Special Program: <strong>${currentVersion.version}</strong></p>
			<p>Airs in: <strong>${days}d ${hours}h ${minutes}m ${seconds}s</strong></p>
		`;
	}

	updateSpecialProgramCountdown();
	setInterval(updateSpecialProgramCountdown, 1000);
}

function displayBetaCountdown(versionInfo, schedule) {
	const includeUpcoming = localStorage.getItem('includeUpcoming') === 'true';
	const betaCountdownDiv = document.getElementById('beta-countdown');

	if (!includeUpcoming) {
		betaCountdownDiv.style.display = 'none'; // Hide the element entirely
		return;
	}

	betaCountdownDiv.style.display = ''; // Ensure it's visible when includeUpcoming is true

	const setTimeToEvening = (date) => {
		date.setHours(20, 0, 0, 0);
		return date;
	};


	function updateBetaCountdown() {
		const latest = schedule[schedule.length - 1];
		const previous = schedule[schedule.length - 2];
		const earlier = schedule[schedule.length - 3];

		const latestDate = setTimeToEvening(new Date(latest.date));
		const previousDate = setTimeToEvening(new Date(previous.date));
		const earlierDate = setTimeToEvening(new Date(earlier.date));

		let betaVersion = '';
		let betaPhase = '';

		const now = new Date();
		const diffFromEarlier = Math.floor((now - earlierDate) / (1000 * 60 * 60 * 24));
		const diffFromPrevious = Math.floor((now - previousDate) / (1000 * 60 * 60 * 24));

		console.log(diffFromEarlier)
		console.log(diffFromPrevious)

		if (diffFromEarlier >= 0 && diffFromEarlier < 5) {
			betaVersion = previous.version;
			betaPhase = 'v2';
		} else if (diffFromEarlier >= 5 && diffFromEarlier < 12) {
			betaVersion = previous.version;
			betaPhase = 'v3';
		} else if (diffFromEarlier >= 12 && diffFromEarlier < 19) {
			betaVersion = previous.version;
			betaPhase = 'v4';
		} else if (diffFromEarlier >= 19 && diffFromEarlier < 22) {
			betaVersion = previous.version;
			betaPhase = 'v5';
		} else if (diffFromPrevious <= -1) {
			betaVersion = latest.version;
			betaPhase = 'v1';
		}

		if (betaVersion && betaPhase) {
			let targetDate = new Date(previousDate);
			if (betaPhase === 'v1' && now < previousDate) {
				targetDate.setDate(previousDate.getDate());
			} else if (betaPhase === 'v1' && now < previousDate) {
				targetDate.setDate(previousDate.getDate());
			} else if (betaPhase === 'v2') {
				targetDate.setMonth(earlierDate.getMonth());
				targetDate.setDate(earlierDate.getDate() + 5);
			} else if (betaPhase === 'v3') {
				targetDate.setMonth(earlierDate.getMonth());
				targetDate.setDate(earlierDate.getDate() + 12);
			} else if (betaPhase === 'v4') {
				targetDate.setMonth(earlierDate.getMonth());
				targetDate.setDate(earlierDate.getDate() + 19);
			} else if (betaPhase === 'v5') {
				targetDate.setMonth(earlierDate.getMonth());
				targetDate.setDate(earlierDate.getDate() + 22);
			}

			const diff = targetDate - now;
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			betaCountdownDiv.innerHTML = `
			<p>Next Beta: <strong>${betaVersion} Beta ${betaPhase}</strong></p>
			<p>Releases in: <strong>${days}d ${hours}h ${minutes}m ${seconds}s</strong></p>
		`;
		}
	}

	updateBetaCountdown();
	setInterval(updateBetaCountdown, 1000);
}

function populateTable(schedule) {
	const tbody = document.querySelector('#version-table tbody');
	tbody.innerHTML = '';

	schedule.forEach(({ version, date }) => {
		let row = document.createElement('tr');

		let versionCell = document.createElement('td');
		let dateCell = document.createElement('td');

		versionCell.textContent = version;
		dateCell.textContent = date.toLocaleDateString('en-CA');

		row.appendChild(versionCell);
		row.appendChild(dateCell);
		tbody.appendChild(row);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	(async () => {
		const versionData = await fetchJSON(versionDataUrl);
		if (!versionData) {
			document.getElementById('countdown').textContent = 'Failed to load version data.';
			return;
		}

		const versionLengths = versionData['Version Length'] || {};
		const schedule = calculateSchedule(versionLengths);

		const upcoming = schedule[schedule.length - 2];

		displayCountdown(upcoming, schedule);
		displayDripMarketingCountdown(schedule);
		displaySpecialProgramCountdown(schedule);
		displayBetaCountdown(upcoming, schedule);

		populateTable(schedule);

		await displayDripCharacters(upcoming.version, schedule); // Pass schedule to this function
	})();
});

async function displayDripCharacters(version, schedule) {
	const characterData = await fetchJSON(characterDataUrl);
	const imageMappingData = await fetchJSON(imageMappingDataUrl);
	if (!characterData || !imageMappingData) return;

	const characters = characterData.characters.filter(char => char.version === version);
	const gallery = document.querySelector('.character-gallery');
	const drip = document.querySelector('#drip-characters');
	gallery.innerHTML = '';

	characters.forEach(character => {
		const card = createCharacterCard(character, imageMappingData);
		gallery.appendChild(card);
	});

	// Only display drip-marketed characters if the drip countdown has passed
	const includeUpcoming = localStorage.getItem('includeUpcoming') === 'true';

	if (includeUpcoming || isSpecialProgramDatePassed(schedule.find(v => v.version === version))) {
		displayUpcomingCharacters(characters); // Display characters if drip date passed
	} else if (isDripDatePassed(schedule, version)) {
		setCharacterImageStyle("unknown-star-image"); // Display characters if drip date passed
	} else {
		// Set to unknown-star-image until special program
		drip.innerHTML = '';
	}
}

function displayUpcomingCharacters(characters) {
	const upcomingSection = document.querySelector('.upcoming-characters');
	if (!upcomingSection) return;

	upcomingSection.innerHTML = ''; // Clear any previous content

	characters.forEach(character => {
		const card = createCharacterCard(character); // Reuse the createCharacterCard function
		upcomingSection.appendChild(card);
	});

	// Optionally, add a message indicating these characters are upcoming
	const message = document.createElement('div');
	message.classList.add('upcoming-message');
	message.textContent = 'These characters will be available in the upcoming drip marketing.';
	upcomingSection.appendChild(message);
}

function setCharacterImageStyle(style) {
	const characterImages = document.querySelectorAll('.character-image');
	characterImages.forEach(img => {
		img.classList.remove('unknown-star-image', 'four-star-image', 'five-star-image');
		img.classList.add(style);
	});
}

function isDripDatePassed(schedule, version) {
	const dripDate = getDripMarketingDate(schedule, version);
	return new Date() >= dripDate;
}

function isSpecialProgramDatePassed(version) {
	const specialProgramDate = getSpecialProgramDate(version.date);
	return new Date() >= specialProgramDate;
}

function getImageId(itemName, imageMappingData) {
	if (itemName === "Traveler") {
		const traveler = localStorage.getItem('traveler') || 'female';
		return traveler === 'female' ? 'PlayerGirl' : 'PlayerBoy';
	}
	return imageMappingData.Characters[itemName] || itemName;
}

function createLink(classes, href) {
	const link = document.createElement('a');
	link.classList.add(...classes);
	link.href = href;
	link.target = '_blank';
	return link;
}

function createImage(classes, src, alt, title) {
	const img = document.createElement('img');
	img.classList.add(...classes);
	img.src = src;
	img.alt = alt;
	img.title = title;
	return img;
}

function createCharacterCard(character, imageMappingData) {
	const characterName = getImageId(character.name, imageMappingData);
	const characterLink = createLink(
		['item-link'],
		`https://genshin-impact.fandom.com/wiki/${character.name}`
	);
	const characterImage = createImage(
		['character-image', character.star === 5 ? 'five-star-image' : character.star === 4 ? 'four-star-image' : 'unknown-star-image'],
		`https://api.hakush.in/gi/UI/UI_AvatarIcon_${characterName}.webp`,
		`${character.name} avatar`,
		character.name
	);
	characterLink.appendChild(characterImage);

	const card = document.createElement('div');
	card.classList.add('character-card');
	card.appendChild(characterLink);

	const nameSpan = document.createElement('span');
	nameSpan.textContent = character.name;
	card.appendChild(nameSpan);

	return card;
}
