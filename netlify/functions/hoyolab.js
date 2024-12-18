const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

module.exports = async (req, res) => {
	const { id } = req.query;

	if (!id) {
		return res.status(400).send("Error: No article ID provided.");
	}

	const hoyolabUrl = `https://www.hoyolab.com/article/${id}`;

	try {
		// Fetch the Hoyolab article
		const response = await fetch(hoyolabUrl);
		const html = await response.text();

		// Parse the HTML
		const dom = new JSDOM(html);
		const metaTitle = dom.window.document.querySelector('meta[property="og:title"]')?.content || "Hoyolab Article";
		const metaDescription = dom.window.document.querySelector('meta[property="og:description"]')?.content || "Read this article on Hoyolab.";
		const metaImage = dom.window.document.querySelector('meta[property="og:image"]')?.content || "";

		// Generate the HTML response
		const embedHtml = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>${metaTitle}</title>

			<!-- Discord embed meta tags -->
			<meta property="og:title" content="${metaTitle}">
			<meta property="og:description" content="${metaDescription}">
			<meta property="og:image" content="${metaImage}">
			<meta property="og:url" content="${hoyolabUrl}">
		</head>
		<body>
			<h1>Redirecting...</h1>
			<p>You are being redirected to <a href="${hoyolabUrl}">the article</a>.</p>
			<script>
				window.location.href = "${hoyolabUrl}";
			</script>
		</body>
		</html>
		`;

		res.setHeader('Content-Type', 'text/html');
		res.status(200).send(embedHtml);
	} catch (error) {
		console.error("Failed to fetch article:", error);
		res.status(500).send("Error: Failed to fetch article details.");
	}
};
