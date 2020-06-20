const http = require("http");
const url = require("url");
const path = require("path");
const fs = require('fs');
const { exec } = require('child_process');
const server = new http.Server();
const trans = require('./utils/trans');

server.listen(4000, function () {
    console.log("running：http://localhost:4000");
});

server.on('request', function (req, res) {
    const urls = url.parse(req.url, true);
    const filePathname = path.join(__dirname, '/public/index.html');

    if (urls.path === '/') {
        fs.readFile(filePathname, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    "Context-type": "text/plain"
                });
                res.write('404');
                res.end();
            } else {
                res.writeHead(200, {
                    "Context-type": "text/plain"
                });
                res.write(data);
                res.end();
            }
        })
    } else if(urls.path === '/result') {
        const filesJson = {};
        const pathName = './testResult';
        fs.readdir(pathName, async (err, files) => {
            console.log(files);
            for (let i = 0; i < files.length; i++) {
                const data = fs.readFileSync(`${pathName}/${files[i]}`, 'utf-8');
                filesJson[files[i]] = trans(JSON.parse(data));
            }

            // console.log(filesJson);
            res.end(JSON.stringify(filesJson));
        });
    }else {
        res.end();
    }
});