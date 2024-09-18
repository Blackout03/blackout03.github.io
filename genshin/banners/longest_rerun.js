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

// Function to display character rerun information
function displayRerunInfo(rerunData) {
	const characterList = document.getElementById('character-list');

	const sortedCharacters = rerunData.characters
		.filter(character => character.reruns.length > 0) // Exclude characters with no reruns
		.sort((a, b) => {
			const daysSinceLastRerunA = calculateDaysSince(a.reruns[a.reruns.length - 1].endDate);
			const daysSinceLastRerunB = calculateDaysSince(b.reruns[b.reruns.length - 1].endDate);
			return daysSinceLastRerunB - daysSinceLastRerunA; // Sort by longest wait
		});

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
		img.src = `https://game-cdn.appsample.com/gim/avatars/${snakeCaseName}.png`
		img.alt = `${character.name} avatar`;
		img.title = `${character.name}`;

		const details = createElement('div', 'character-details');
		const name = createElement('div', 'character-name', character.name);

		let rerunStatus;
		let rerunInfo;
		let rerunVersionInfo;
		let previousRun;
		let ongoingRun;
		let upcomingRun;
		let timeSince;
		let daysSince;

		// Append other info to card

		const rerunStatusElement = document.createElement('div');
		rerunStatusElement.classList.add('rerun-status');

		if (lastRerun.startDate === "upcoming" && lastRerun.endDate === "upcoming" || now < startDate) {
			const isUpcoming = lastRerun.startDate === "upcoming" && lastRerun.endDate === "upcoming";

			if (isUpcoming) {
				rerunInfo = createElement('div', 'rerun-info', '', `Release: ${lastRerun.endDate}`)
				rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${lastRerun.version}] <div class="wish-type">[${wishType}]</div>`)
				upcomingRun = createElement('div', 'upcoming-rerun-status', `Upcoming Rerun: ${lastRerun.version}`)

			} else {
				rerunInfo = createElement('div', 'rerun-info', '', `Release: ${lastRerun.endDate}`)
				rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${lastRerun.version}] <div class="wish-type">[${wishType}]</div>`)
				const daysUntilStart = calculateDaysUntil(startDate);
				rerunStatus = `Upcoming Rerun: ${startDate.toLocaleDateString()} (in ${daysUntilStart} days)`;

				if (reruns.length > 1) {
					const previousRerun = reruns[reruns.length - 2];
					const previousRerunEndDate = new Date(previousRerun.endDate);
					rerunInfo = createElement('div', 'rerun-info', '', `Previous Banner: (${previousRerun.startDate}) - (${previousRerun.endDate})`)
					rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${previousRerun.version}] <div class="wish-type">[${wishType}]</div>`)
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
			rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${lastRerun.version}] <div class="wish-type">[${wishType}]</div>`)
			if (now >= startDate && now <= endDate) {
				if (reruns.length > 1) {
					const previousRerun = reruns[reruns.length - 2];
					const previousRerunEndDate = new Date(previousRerun.endDate);
					rerunInfo = createElement('div', 'rerun-info', '', `Previous Banner: (${previousRerun.startDate}) - (${previousRerun.endDate})`)
					rerunVersionInfo = createElement('span', 'rerun-version-info', '', `[Version ${previousRerun.version}] <div class="wish-type">[${wishType}]</div>`)
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

// Fetch JSON data from external file and display the rerun info
fetch('rerun_data.json')
	.then(response => response.json())
	.then(data => {
		displayRerunInfo(data);
	})
	.catch(error => console.error('Error fetching rerun data:', error));
