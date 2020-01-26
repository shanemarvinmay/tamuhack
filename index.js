const express = require('express');
const app = express();
const port = 3000;
let fs = require('fs');
let formidable = require('formidable');
let path = require('path');
let cwd = path.basename(path.resolve());


// serving html 
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname });
});


async function quickstart() { 
    //imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
    
    //Creates a client 
    const client = new vision.ImageAnnotatorClient();

    //Performs label detection on the image file 
    const [result] = await client.labelDetection("img.png");
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
}
// quickstart();




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
            quickstart();
        }); 
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));