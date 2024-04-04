function webResponse(res, code, message, data = null) {
    return res.status(code).json(
        {
            code: code,
            message: message,
            data: data
        }
    )
}

module.exports = {
    webResponse
}