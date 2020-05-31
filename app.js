const express = require('express');
const cors = require('cors');
const taskRouter = require('./routes/tasks');
const app = express();

constport = 3001;

app.use(express.json());
app.use(cors());
app.use(`/task`, taskRouter);

app.listen(port, () => console.log('TODO app runing on port ' + port));
