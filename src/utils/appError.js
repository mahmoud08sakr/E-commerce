

export default class appError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statusCode = statusCode

    }
}