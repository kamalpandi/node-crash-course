import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname, __filename);

const server = http.createServer(async (req, res) => {

    try {
        if (req.method === 'GET') {
            let filepath;
            if (req.url === '/') {
                filepath = path.join(__dirname, 'public', 'index.html');
                // res.setHeader('Content-Type', 'text/html');
                // res.statusCode = 200;
                // res.end(html_content);
            } else if (req.url === '/about') {
                filepath = path.join(__dirname, 'public', 'about.html');
                // res.writeHead(200, { 'Content-type': 'text/html' });
                // res.end('<h1>About page</h1>');
            } else {
                throw new Error('Not found');
                // res.writeHead(404, { 'Content-type': 'text/html' });
                // res.end('<h1>Page not found</h1>');
            }
            const data = await fs.readFile(filepath);
            res.setHeader('Content-type', 'text/html');
            res.write(data);
            res.end();
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
