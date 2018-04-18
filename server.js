const http = require('http');
function show(path, type)
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/image')) {

    } else if (req.url === '/') {

    } else {

    }
});
server.listen(80);