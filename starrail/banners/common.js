// Function to create and return an element with given type, class, and text content
function createElement(type, classNames = [], textContent = '', innerHTML = '', title = '') {
	const element = document.createElement(type);

	// Check if classNames is an array and add all classes
	if (Array.isArray(classNames)) {
		classNames.forEach(className => element.classList.add(className));
	} else if (classNames) {
		element.classList.add(classNames);
	}

	if (textContent) element.textContent = textContent;
	if (innerHTML) element.innerHTML = innerHTML;
	if (title) element.title = title;
	return element;
}

// Function to create a span element with class
function createSpan(classNames = [], textContent = '', innerHTML = '', title = '') {
	return createElement('span', classNames, textContent, innerHTML, title);
}

// Function to create a div element with class
function createDiv(classNames = [], textContent = '', innerHTML = '', title = '') {
	return createElement('div', classNames, textContent, innerHTML, title);
}

function createLink(classNames = [], url = '') {
	const element = document.createElement('a');

	// Check if classNames is an array and add all classes
	if (Array.isArray(classNames)) {
		classNames.forEach(className => element.classList.add(className));
	} else if (classNames) {
		element.classList.add(classNames);
	}

	if (url) element.href = url;
	return element;
}

// Function to create an img element with class
function createImage(classNames = [], src = '', alt = '', title = '') {
	const element = document.createElement('img');

	// Check if classNames is an array and add all classes
	if (Array.isArray(classNames)) {
		classNames.forEach(className => element.classList.add(className));
	} else if (classNames) {
		element.classList.add(classNames);
	}

	if (src) element.src = src;
	if (alt) {
		element.alt = alt;
	}
	if (title) {
		element.title = title;
	} else if (alt) {
		element.title = alt
	}
	return element;
}

// Function to calculate the gap between two dates
function calculateGap(startDate, endDate) {
	const start = new Date(startDate);
	const end = new Date(endDate);
	return Math.abs(start - end) / (1000 * 60 * 60 * 24); // Gap in days
}

// Function to calculate days since a date
function calculateDaysSince(endDate) {
	const now = new Date();
	const lastRerunEnd = new Date(endDate);
	const timeDifference = now - lastRerunEnd;
	return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

// Function to calculate the difference in months and days since a date
function calculateMonthsAndDaysSince(endDate) {
	const now = new Date();
	const lastRerunEnd = new Date(endDate);
	let years = now.getFullYear() - lastRerunEnd.getFullYear();
	let months = now.getMonth() - lastRerunEnd.getMonth();
	let days = now.getDate() - lastRerunEnd.getDate();
	if (days < 0) {
		months -= 1;
		days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Get days in the previous month
	}
	if (months < 0) {
		years -= 1;
		months += 12;
	}
	months += years * 12;
	return { months, days };
}

// Function to calculate days until a given date
function calculateDaysUntil(date) {
	const now = new Date();
	const givenDate = new Date(date);
	const timeDifference = givenDate - now;
	return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

// Function to create a valid Date object
function safeParseDate(dateString) {
	const date = new Date(dateString);
	return isNaN(date.getTime()) ? null : date;
}