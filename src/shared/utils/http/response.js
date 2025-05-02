// 
/**
 * @description: Utility function to format HTTP responses.
 * @param {*} payload - The payload to be formatted.
 * @param {boolean} payload.success - Indicates if the request was successful.
 * @param {number} payload.statusCode - The HTTP status code.
 * @param {*} payload.data - The data to be returned in the response.
 * @param {*} payload.error - The error message, if any.
 * @param {string} payload.message - The message to be returned in the response.
 * @param {string} payload.code - The error code, if any. 
 * @param {string} payload.type - The type of error, if any.
 * @returns 
 */
exports.formatResponse = (payload) => {
    // { success = false, statusCode = 500, data = null, error = null }
    return {
        success: payload.success || false,
        message: payload.message || null,
        statusCode: payload.statusCode || 500,
        data: payload.data || null,
        error: payload.error || null,
        // code: payload.code || null,
        // type: payload.type || null
    };
}
