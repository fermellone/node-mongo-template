const express = require('express');

const app = express();

const { config } = require('./config/index')

const itemssApi = require('./routes/items')

// body parser
app.use(express.json())

itemssApi(app)

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
})