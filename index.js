const express = require('express');

const app = express();

const { config } = require('./config')
const itemsApi = require('./routes/items')

const { logErrors, errorHandler } = require('./utils/middlewares/errorHandlers')

// body parser
app.use(express.json())

itemsApi(app)

app.use(logErrors)
app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
})