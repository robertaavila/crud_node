const express = require('express');

const app = express();

const port = 3001;

app.get('/', (req, res) => res.send('<h1> TODO app </h1>'));

app.listen(port, () => console.log('TODO app runing on port ' + port));
