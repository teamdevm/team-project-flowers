class ApiError {
    constructor(status, description, errorLog) {
        this.status = status;
        switch (status) {
            case 400:
                this.title = 'Bad Request';
                break;
            case 404:
                this.title = 'Not Found';
                break;
            case 500:
                this.title = 'Internal Server Error';
                break;
            default:
                this.title = 'Unknown Error';
        }
        this.description = description;
        console.log(`${description}:\n\t${errorLog}`);
    }

    send(response) {
        response
            .status(this.status)
            .send({
                title: this.title,
                description: this.description
            });
    }
}

const apiErrorMiddle = (error, request, response, next) => {
    error.send(response);
    response.end();
}

module.exports = {
    ApiError,
    apiErrorMiddle
};