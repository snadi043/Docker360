const createAndThrowError = (message, errorCode) => {
    const error = new Error(message);
    error.code = errorCode;
    throw error;
};

exports.createAndThrowError = createAndThrowError;