const fetch = require('node-fetch');

module.exports.handler = async (event, context) => {
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

		// Extract title and content (basic parsing using regex or jsdom)
		const titleMatch = html.match(/<title>(.*?)<\/title>/);
		const title = titleMatch ? titleMatch[1] : 'Hoyolab Article';
		const contentMatch = html.match(/<meta name="description" content="(.*?)"/);
		const description = contentMatch ? contentMatch[1] : 'No description available';

		// Return the response
		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				description,
				originalUrl: url,
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
