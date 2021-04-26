const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
  console.log(req);
  console.log(req.body);
  res.send({ test: req.body });
});

require('./routes/uploadRoutes')(app);

app.listen(4000, () => {
  console.log('listen on 4000');
});
