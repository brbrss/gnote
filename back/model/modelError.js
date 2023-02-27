
class DbConnectionError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'Connection Error';
        this.status = 503;
    }
}

class NotFoundError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'Not Found Error';
        this.status = 404;
    }
}

class OperationError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'Invalid Operation Error';
        this.status = 422;
    }
}

class AuthenticationError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'Authentication Error';
        this.status = 401;
    }
}

class InputError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'Input Error';
        this.status = 400;
    }
}

module.exports = {
    DbConnectionError, NotFoundError,
    OperationError, AuthenticationError, InputError
};
