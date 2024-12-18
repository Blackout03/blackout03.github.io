const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
	try {
		const articleId = event.queryStringParameters.q;
		if (!articleId) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: 'Missing query parameter: q' }),
			};
		}

		const url = `https://www.hoyolab.com/article/${articleId}`;
		const response = await fetch(url);
		const html = await response.text();

		// Load HTML content using cheerio
		const $ = cheerio.load(html);

		// Extract title from the page
		const title = $('div.mhy-article-page__title h1').text().trim();

		// Extract description/content
		const description = $('div.mhy-article-page__content').text().trim();

		// Return the response
		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				description,
				originalUrl: url,
				embed: {
					title: title,
					description: description.length > 200 ? description.substring(0, 200) + '...' : description,
					url: url,
				},
			}),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed to fetch Hoyolab article' }),
		};
	}
};
