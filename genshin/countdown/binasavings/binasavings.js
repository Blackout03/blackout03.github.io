document.addEventListener("DOMContentLoaded", () => {
	const constellation = document.getElementById("constellation");
	const refinement = document.getElementById("refinement");
	const primogems = document.getElementById("primogems");
	const fates = document.getElementById("fates");
	const results = document.getElementById("results");

	// Load saved data
	const saved = JSON.parse(localStorage.getItem("binaSavings")) || {};
	if (saved.constellation) constellation.value = saved.constellation;
	if (saved.refinement) refinement.value = saved.refinement;
	if (saved.primogems) primogems.value = saved.primogems;
	if (saved.fates) fates.value = saved.fates;

	// Cost constants
	const PRIMO_PER_FATE = 160;
	const CONSTELLATION_COST = 180 * PRIMO_PER_FATE; // 28800
	const REFINEMENT_COST = 160 * PRIMO_PER_FATE;    // 25600

	function requiredPrimosForConstellation(level) {
		let n = parseInt(level.substring(1));
		return (n + 1) * CONSTELLATION_COST; // starts at C0
	}

	function requiredPrimosForRefinement(level) {
		let n = parseInt(level.substring(1));
		if (n === 0) return 0; // R0 = 0 cost
		return n * REFINEMENT_COST; // starts at R1
	}

	function updateProgress() {
		const constVal = constellation.value;
		const refVal = refinement.value;
		const currentPrimos = parseInt(primogems.value) || 0;
		const currentFates = parseInt(fates.value) || 0;

		const totalPrimogemValue = currentPrimos + currentFates * PRIMO_PER_FATE;

		const neededConst = requiredPrimosForConstellation(constVal);
		const neededRef = requiredPrimosForRefinement(refVal);
		const totalNeeded = neededConst + neededRef;

		const percentage = totalNeeded === 0 ? 100 : Math.min(100, (totalPrimogemValue / totalNeeded * 100).toFixed(2));

		results.textContent = `You have ${currentPrimos} primogems and ${currentFates} fates (${totalPrimogemValue} total value). You need ${totalNeeded} primogems for C${constVal[1]} and R${refVal[1]}. You are ${percentage}% of the way there.`;

		// Save to local storage
		localStorage.setItem("binaSavings", JSON.stringify({
			constellation: constVal,
			refinement: refVal,
			primogems: currentPrimos,
			fates: currentFates
		}));

		// Update progress bar
		const bar = document.getElementById("progress-bar");
		const label = document.getElementById("progress-label");
		const stats = document.getElementById("progress-stats");

		bar.style.background = `linear-gradient(to right, #4caf50 ${percentage}%, #333 ${percentage}%)`;
		label.textContent = `${percentage}%`;
		stats.textContent = `${totalPrimogemValue} / ${totalNeeded}`;
	}

	// Hook all inputs to update automatically
	[constellation, refinement, primogems, fates].forEach(el => {
		el.addEventListener("input", updateProgress);
	});

	// Run once on the page load to reflect current values
	updateProgress();

	function formatKey(key) {
		// Handle versioned keys like "57special_program" → "5.7 Special Program"
		const versionMatch = key.match(/^(\d)(\d)(?:_|)(special_program)$/i);
		if (versionMatch) {
			const major = versionMatch[1];
			const minor = versionMatch[2];
			const label = versionMatch[3].replace(/_/g, " ");
			return `${major}.${minor} ${capitalizeWords(label)}`;
		}

		// Replace any 'nodkrai' substring with 'Nod-Krai'
		let replaced = key.replace(/nodkrai/gi, "Nod-Krai");

		// General fallback for snake_case to Capitalized Words
		return capitalizeWords(replaced.replace(/_/g, " "));
	}

	function capitalizeWords(str) {
		return str
			.split(" ")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	}

	// Load and display JSON dates
	fetch("binasavings.json")
		.then(res => res.json())
		.then(data => {
			const datesList = document.getElementById("dates-list");

			Object.entries(data).forEach(([key, value]) => {
				const li = document.createElement("li");

				let dateDisplay = value;

				if (value.toLowerCase() !== "unknown") {
					const today = new Date();
					const target = new Date(`${value}T00:00:00+08:00`);
					const diffTime = target - today;
					console.log("China Target (parsed ISO):", target);
					console.log("China today (parsed ISO):", today);
					console.log("China diffTime (parsed ISO):", diffTime);
					const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

					if (diffDays > 1) {
						dateDisplay += ` (${diffDays} days remaining)`;
					} else if (diffDays === 1) {
						dateDisplay += ` (1 day remaining)`;
					} else if (diffDays === 0) {
						dateDisplay += ` (Today)`;
					} else {
						dateDisplay += ` (Past)`;
					}
				}

				li.textContent = `${formatKey(key)}: ${dateDisplay}`;
				datesList.appendChild(li);
			});
		})
		.catch(err => {
			console.error("Failed to load binasavings.json", err);
		});
});
