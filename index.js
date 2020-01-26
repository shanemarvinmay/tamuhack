const express = require('express');
const app = express();
const port = 3000;
let fs = require('fs');
let formidable = require('formidable');
let path = require('path');
let cwd = path.basename(path.resolve());


app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname });
});

app.post('/submit-image', (req, res) => {
    // console.log(req.query);
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let oldPath = files.file.path;
        let newPath = 'img.png';
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
            /**
             * CESAR! USE GOOGLE API HERE!
             */
        }); 
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));