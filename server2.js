import { createServer } from 'http';

const PORT = process.env.PORT;

const users = [
    { id: 0, name: 'john doe' },
    { id: 1, name: 'jane doe' },
    { id: 2, name: 'jim doe' }
];

const server = createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(users));
        res.end();
        
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]; // third slice of the url
        console.log(id)
        const user = users.find((user) => user.id === parseInt(id));
        res.setHeader('Content-Type', 'application/json');
        // res.write(JSON.stringify(users[parseInt(id)]));  

        if (user) {
            res.write(JSON.stringify(user));
        } else {
            res.statusCode = 404;
            res.write(JSON.stringify({ message: `User ${id} not found` }));
        }
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