const ErrorResponse = require('../utils/errorResponce')

const errorHandler = (err, req, res, next) =>{
    let error = {...err}
    error.message = err.message
    if (err.name === 'CastError') {
        const message = `Resource not found ${err.value}`
        error = new ErrorResponse(message, 404)
    }
    if (err.code === 1100) {
        const message = "Duplicate value field entered"
        error = new ErrorResponse(message, 404)
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.error).map(val=> ' ' + val.message)
        error = new ErrorResponse(message, 404)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server error"
    })
}

module.exports = errorHandler