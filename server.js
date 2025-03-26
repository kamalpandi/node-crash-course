import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname,__filename);

const server = http.createServer((req, res) => {

    try {
        if (req.method === 'GET') {
            if (req.url === '/') {
                res.setHeader('Content-Type', 'text/html');
                res.statusCode = 200;
                res.end(html_content);
            } else if (req.url === '/about') {
                res.writeHead(200, { 'Content-type': 'text/html' });
                res.end('<h1>About page</h1>');
            } else {
                res.writeHead(404, { 'Content-type': 'text/html' });
                res.end('<h1>Page not found</h1>');

            }
        } else {
            throw new Error('Method not allowd');
        }

    } catch (error) {

        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Server error:', error);
    }


});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
