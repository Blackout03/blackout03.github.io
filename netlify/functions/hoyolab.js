const puppeteer = require('puppeteer');

async function fetchArticleContent(url) {
	try {
		console.log('Chromium executable path:', puppeteer.executablePath());
		console.log('Chromium Path:', process.env.CHROME_BIN);

		const browser = await puppeteer.launch({
			headless: true, // Runs in headless mode (without GUI)
		});

		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'domcontentloaded' }); // Wait until the DOM is loaded

		// Wait for specific elements to load (you can customize this based on your needs)
		await page.waitForSelector('.mhy-article-page__title h1'); // Adjust this to match the element you're looking for

		// Extract the title and description
		const title = await page.$eval('.mhy-article-page__title h1', (el) => el.innerText);
		const description = await page.$eval('.mhy-article-page__content p', (el) => el.innerText);

		console.log(title)
		await browser.close();

		// Return the extracted data
		return {
			title,
			description,
			originalUrl: url,
			embed: {
				title,
				description,
				url: url
			}
		};
	} catch (error) {
		console.error('Error fetching article:', error);
		return { title: '', description: 'Error fetching article', originalUrl: url, embed: { title: '', description: 'Error fetching article', url: url } };
	}
}

module.exports.handler = async (event, context) => {
	const articleId = event.queryStringParameters.q; // Get the article ID (e.g., 34755631)
	const articleUrl = `https://www.hoyolab.com/article/${articleId}`; // Construct the URL for the article

	// Fetch the article content
	const articleContent = await fetchArticleContent(articleUrl);

	return {
		statusCode: 200,
		body: JSON.stringify(articleContent), // Return the extracted data as JSON
	};
};
