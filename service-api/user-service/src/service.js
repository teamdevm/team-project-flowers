const express = require('express');
const conf = require('./configs/service')
const user = require('./routes/userRoute');
const {sequelize} = require('./models/models');

const app = express();

app.use('/', user);

app.listen(conf.port, (err) => {
    if (err) {
        return console.log('Something bad happened:\n\t', err);
    }

    sequelize.sync().catch(error => console.log('Something bad happened with db:\n\t', error));

    console.log(`Server is listening on port ${conf.port}`);
})
