/**
 * Creates an application error/exception
 * @param {*} message string
 * @param {*} errorCode number
 * @param {*} cause Error
 */
function createApplicationError(message, errorCode, cause) {
    const err = Error(message,{
        cause,
    });
    err.errorCode = errorCode || 400;
    err.isApplicationError = true;
    return err;
}

export default createApplicationError;