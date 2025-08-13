setInterval(() => {
	const allSections = document.querySelectorAll('.up_low');
	let maxHeight = 0;

	// Step 1: find the tallest upper/lower across all sections
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
	});
}, 10); // every 0.01 seconds

setInterval(() => {
	const allSections = document.querySelectorAll('.up_low');
	let maxHeight = 0;

	// Step 0: reset heights to auto so scrollHeight is correct
	allSections.forEach(container => {
		const upper = container.querySelector('.upper');
		const lower = container.querySelector('.lower');

		upper.style.minHeight = 'auto';
		lower.style.minHeight = 'auto';
	});

	// Step 1: find the tallest upper/lower across all sections
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
	});
}, 30000); // every 30 seconds
