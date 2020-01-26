const express = require('express')
const app = express()
const port = 3000


async function quickstart() { 
    //imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
    
    //Creates a client 
    const client = new vision.ImageAnnotatorClient();

    //Performs label detection on the image file 
    const [result] = await client.labelDetection("ZeroTwo.jpg");
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
}
// quickstart();

app.get('/', (req, res) => res.send('Tamuhack!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))