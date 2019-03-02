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
   // console.log("path->", request.url);

    if (request.method === "GET") {
        getFile(request, response, path.join(process.cwd(), request.url), contentType[path.extname(request.url)]);
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
                    fs.writeFile("inmateJournal.js", "let info = " + body + ";\n\r export default info;");
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
            fs.stat(loc, function(err, stats) {
                if (stats.isFile()) {
                    res.writeHead(200, {
                        "Content-Type": contType
                    });
                    fs.createReadStream(loc).pipe(res);
                } else if (stats.isDirectory()) {
                }
            });
        } else {

            if (/favicon/.test(loc)) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("ERROR File does NOT Exists");
                return;
            }

            // Send the default index.html.
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            fs.createReadStream(path.join(process.cwd(), "/index.html")).pipe(res);

            return;
        }
    });
}
