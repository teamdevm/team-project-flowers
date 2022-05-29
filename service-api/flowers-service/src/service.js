const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened. ', err);
    }

    console.log('Server is listening on port', port);
})