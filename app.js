const express = require('express');
const cors = require('cors');
const taskRouter = require('./routes/tasks');
const Task = require('./models/tasks.js');

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());
app.use(`/task`, taskRouter);

app.listen(port, () => console.log('TODO app running on port ' + port));
