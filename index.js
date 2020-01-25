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
    console.log(req.query);
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log(files.file.path);
        fs.rename(files.file.path, 'img.png', function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
        
    });
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));