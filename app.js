const express = require('express');
const taskRouter = require('./routes/tasks');
const app = express();

const port = 3001;

app.use(`/task`, taskRouter);

app.listen(port, () => console.log('TODO app runing on port ' + port));
