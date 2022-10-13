module.exports = class AppError extends Error {
    static message = "";
    static statusCode = 400;

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};
