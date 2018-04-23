const http = require('http');
const fs = require('fs');

function notfound(res) {
    res.writeHead(404);
    res.end('Not Found');
}

function show(path, type, res) {
    fs.stat(path, (err, stat) => {
        if (err || !stat.isFile()) {
            notfound(res);
        } else {
            res.writeHead(200, {
                'Content-Type': type
            });
            fs.createReadStream(path).pipe(res);
        }
    });
}
const STATIC_PATH = '/public'
const server = http.createServer((req, res) => {
    console.log('url: ', req.url);
    if (req.url.startsWith('/image')) {
        let suffixIndex = req.url.lastIndexOf('.');
        if (suffixIndex > 0) {
            let suffix = req.url.substring(suffixIndex + 1)
            show(__dirname + STATIC_PATH + req.url, 'image/' + suffix, res);
        } else {
            notfound(res);
        }
    } else if (req.url === '/') {
        show(__dirname + STATIC_PATH + '/index.htm','text/html', res);
    } else {
        notfound(res);
    }
});
server.listen(8080);
server.on('error',(err)=>{
    console.log(err);
});