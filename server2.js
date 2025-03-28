import { createServer } from 'http';

const PORT = process.env.PORT;

const users = [
    { id: 1, name: 'john doe' },
    { id: 2, name: 'jane doe' },
    { id: 3, name: 'jim doe' }
];

const server = createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(users));
        res.end();
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'Route not found' }));
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});