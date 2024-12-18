const axios = require('axios');
const cheerio = require('cheerio');

async function fetchArticleContent(url) {
	try {
		// Make the HTTP request to fetch the article page
		const response = await axios.get(url);
		console.log(response.data)
		const $ = cheerio.load(response.data); // Load the HTML content using Cheerio

		// Extract the title and description
		const title = $('.mhy-article-page__title h1').text();
		console.log(title)
		// const description = $('.mhy-article-page__content p').first().text();
		const description = title;

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
		return { title: '', description: '', originalUrl: url, embed: { title: '', description: '', url: url } };
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
