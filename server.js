const http = require("http");

const server = http.createServer((req, res) => {
    res.end("this is my server response!");
});

server.listen(process.env.PORT || 5000);