const boom = require('@hapi/boom');

function validate() {
    return false;
}

function validationHandler(schema, check = 'body') {
    return (req, res, next) => {
        const error = validate(req[check], schema);

        if (error) next(boom.badRequest());
        else next();
    };
}

module.exports = validationHandler;
