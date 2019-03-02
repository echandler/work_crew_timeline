const http = require("http");
const port = 3000;
const fs = require("fs");

const requestHandler = (request, response) => {
    console.log(request.url);

    if (request.method === "GET") {
        if (request.url === "/src.js") {
            getFile(request, response, "./src.js", "text/javascript");
        } else if (request.url === "/styles.css") {
            getFile(request, response, "./styles.css", "text/css");
        } else if (request.url === "/body.json") {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end(JSON.stringify({ data: body }));
        } else {
            getFile(request, response, "./index.html", "text/html");
        }
    } else if (request.method === "POST") {
        if (request.url === "/updatedata") {
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
                    body = decodeURIComponent(body);
                    response.writeHead(200);
                    response.end("DONE");
                });
        } else if (/gettag/.test(request.url)) {
            var data = [];
            request
                .on("error", err => {
                    console.error(err);
                })
                .on("data", chunk => {
                    data.push(chunk);
                })
                .on("end", () => {
                    data = Buffer.concat(data).toString();
                    data = data;
                    response.writeHead(200);
                    response.end(isVowel(data.substr(0, 1)));
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

var body = `
L (<<-- Creating drop cased letter in this way messes up the selection mechanism in some browsers) orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae nisi vel libero semper viverra. Pellentesque vitae dolor eu mi maximus molestie ut at metus. Sed a gravida quam. Sed sit                amet mi eu lectus dapibus laoreet. Suspendisse ultricies nunc a commodo venenatis. Morbi at elementum lacus. Proin lorem mi, vulputate et lectus at, venenatis ornare libero. Nulla quis arcu elit. Suspendisse potenti.&nbsp;&nbsp;&nbsp;&nbsp;Praesent pellentesque libero ut eros <span>pretium</span>, &nbsp; &nbsp; &nbsp; &nbsp; quis tincidunt ante tempus. In at dictum justo. Donec congue velit ac Proin lorem mi, vulputate etlobortis laoreet. Sed vitae hendrerit felis.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae nisi vel libero semper viverra. Pellentesque vitae dolor eu mi maximus molestie ut at metus. Sed a gravida quam. Sed sit amet mi eu lectus dapibus laoreet. Suspendisse ultricies nunc a commodo venenatis. Morbi at elementum lacus. Proin lorem mi, vulputate et lectus at, venenatis ornare libero. Nulla quis arcu elit. Suspendisse potenti. Praesent pellentesque libero ut eros pretium, quis tincidunt ante tempus. In at dictum justo. Donec congue velit ac lobortis laoreet. Sed vitae hendrerit felis.<br>There will be...
   `;

function isVowel(x) {
    return /[aeiou]/i.test(x) ? "Baky" : "Kola";
}
