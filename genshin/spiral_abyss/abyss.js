function equalizeHeights() {
	const allSections = document.querySelectorAll('.up_low');
	let maxHeight = 0;

	// Reset first so we measure natural content height
	allSections.forEach(container => {
		const upper = container.querySelector('.upper');
		const lower = container.querySelector('.lower');

		maxHeight = Math.max(maxHeight, upper.scrollHeight, lower.scrollHeight);
	});

	// Step 2: apply the tallest height to all upper/lower
	allSections.forEach(container => {
		const upper = container.querySelector('.upper');
		const lower = container.querySelector('.lower');

		upper.style.minHeight = lower.style.minHeight = maxHeight + 'px';
		upper.style.height = lower.style.height = maxHeight + 'px';
		upper.style.maxHeight = lower.style.maxHeight = maxHeight + 'px';
	});
}

// Run once on load
window.addEventListener('load', equalizeHeights);

// Run a second time on load, after a short delay
window.addEventListener('load', () => {
	setTimeout(() => {
		equalizeHeights();
	}, 100); // wait 100ms; adjust if needed
});

// Run on resize
window.addEventListener('resize', () => {
	// Reset minHeight first
	document.querySelectorAll('.up_low').forEach(container => {
		const upper = container.querySelector('.upper');
		const lower = container.querySelector('.lower');
		if (upper) upper.style.minHeight = 'auto';
		if (lower) lower.style.minHeight = 'auto';
		if (upper) upper.style.height = 'auto';
		if (lower) lower.style.height = 'auto';
		if (upper) upper.style.maxHeight = 'auto';
		if (lower) lower.style.maxHeight = 'auto';
	});

	// Then recalc
	equalizeHeights();
});

// Observe the main container that holds all up_low sections
const mainContainer = document.querySelector('.scroller'); // change to your wrapper's selector
if (mainContainer) {
	const observer = new MutationObserver(() => {
		// Reset heights first
		document.querySelectorAll('.up_low').forEach(container => {
			const upper = container.querySelector('.upper');
			const lower = container.querySelector('.lower');
			if (upper) upper.style.minHeight = 'auto';
			if (lower) lower.style.minHeight = 'auto';
			if (upper) upper.style.height = 'auto';
			if (lower) lower.style.height = 'auto';
			if (upper) upper.style.maxHeight = 'auto';
			if (lower) lower.style.maxHeight = 'auto';
		});
		// Recalculate heights
		equalizeHeights();
	});

	observer.observe(mainContainer, {
		childList: true, // new/removed children
		subtree: true,   // include all nested elements
		characterData: true // include text changes
	});
}