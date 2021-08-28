const express = require('express');

const app = express();

const { config } = require('./config');
const itemsApi = require('./routes/items');

const { logErrors, wrapError, errorHandler } = require('./utils/middlewares/errorHandlers');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// body parser
app.use(express.json());


// routes
itemsApi(app);

// Catch 404
app.use(notFoundHandler);

// Error middlewares
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});