const handelingError = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            // Create a custom error response
            const errorResponse = {
                message: 'An error occurred',
                error: err.message, // Include the error message
            };

            // Set the HTTP status code based on the type of error
            if (err instanceof SyntaxError) {
                res.status(400); // Bad Request for syntax errors (e.g., JSON parsing errors)
                errorResponse.message = 'Invalid JSON';
            } else {
                res.status(500); // Internal Server Error for other errors
            }

            // Send the custom error response to the client
            res.json(errorResponse);
        }
    };
};


export default handelingError;