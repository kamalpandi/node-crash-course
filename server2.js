import { createServer } from 'http';

const PORT = process.env.PORT;

const users = [
    { id: 0, name: 'john doe' },
    { id: 1, name: 'jane doe' },
    { id: 2, name: 'jim doe' }
];

// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

//JSON middleeare
const jsonMiddleeare = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

//Route handler for GET /api/users
const getUsersHandler = () => {
    res.write(JSON.stringify(users));
    res.end();
};

//Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3]; // third slice of the url
    console.log(id)
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
        res.write(JSON.stringify(user));
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: `User ${id} not found` }));
    }
    res.end();
};

//Not found handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
};

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleeare(req, res, () => {
            if (req.url === '/api/users' && req.method === 'GET') {
                getUsersHandler();
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
                getUserByIdHandler(req, res);
            } else {
                notFoundHandler(req, res);
            }
        })
    })
});

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});