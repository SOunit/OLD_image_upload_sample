const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  fs.readFile('./data/output.json', (err, fileContent) => {
    if (err) {
      console.log(err);
      res.send([]);
    } else {
      res.send(JSON.parse(fileContent));
    }
  });
});

// create json
app.post('/', (req, res) => {
  // init images
  let images = [];

  // get images from json
  fs.readFile('./data/output.json', (err, fileContent) => {
    if (err) {
      console.log(err);
    } else {
      images = JSON.parse(fileContent);
    }

    // add image
    images.push(req.body);

    // save images url to json
    fs.writeFileSync('./data/output.json', JSON.stringify(images));

    console.log(images);
    res.send(images);
  });
});

require('./routes/uploadRoutes')(app);

app.listen(4000, () => {
  console.log('listen on 4000');
});
