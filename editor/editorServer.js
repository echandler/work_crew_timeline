const http = require("http");
const port = 3000;
const fs = require("fs");
const path = require("path");
const url = require("url");
const contentType = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "text/plain",
    ".html": "text/html"
};

const requestHandler = (request, response) => {
    console.log("sdf", request.url, path.extname(request.url));
    if (request.method === "GET") {
        getFile(
            request,
            response,
            path.join(process.cwd(), request.url),
            contentType[path.extname(request.url)]
        );
    } else if (request.method === "POST") {
        if (request.url === "/write_JSON_to_file") {
            body = [];
            request
                .on("error", err => {
                    console.error(err);
                })
                .on("data", chunk => {
                    body.push(chunk);
                })
                .on("end", () => {
                    body = Buffer.concat(body).toString();
                    fs.writeFile("inmateJournal.js", "let info = "+ body + ";\n\r export default info;");
                    response.writeHead(200);
                    response.end("DONE");
                });
        }
    }
};

const server = http.createServer(requestHandler);
server.listen(port, err => {
    if (err) {
        return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${port}`);
});

function getFile(req, res, loc, contType) {
    fs.exists(loc, function(exists) {
        if (exists) {
            res.writeHead(200, {
                "Content-Type": contType
            });
            fs.createReadStream(loc).pipe(res);
        } else {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("ERROR File does NOT Exists");
        }
    });
}
