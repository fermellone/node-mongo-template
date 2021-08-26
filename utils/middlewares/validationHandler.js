function validate() {
    return false
}

function validationHandler(schema, check="body") {
    return (req, res, next) => {
        const error = validate(req[check], schema)

        if (error) next(new Error(error))
        else next()
    }
}

module.exports = validationHandler