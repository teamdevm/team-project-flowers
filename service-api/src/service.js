const express = require('express');
const conf = require('./configs/service');
const {sequelize} = require('./models/models')

const app = express();

app.get('/', async (request, response, next) => {
    response
        .status(200)
        .send('Hello from flowers-service-api');
});

app.listen(conf.port, (err) => {
    if (err) {
        return console.log('Something bad happened:\n\t', err);
    }

    sequelize.sync().catch(error => console.log('Something bad happened with db:\n\t', error));

    console.log(`Server is listening on port ${conf.port}`);
})