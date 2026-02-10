// Simple Node.js web server to display Hello World with date and time
const http = require('http');

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	const now = new Date();
	res.end(`<h1>Hello World!</h1><p>Current date and time: ${now.toString()}</p>`);
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});