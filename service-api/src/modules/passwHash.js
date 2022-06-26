const bcrypt = require('bcryptjs');

const saltRounds = 10;

function getHash(original) {
    try {
        return bcrypt.hashSync(original, saltRounds);
    } catch (error) {
        throw error;
    }
}

function matchHash(password, originalHashed) {
    try {
        return bcrypt.compareSync(password, originalHashed);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getHash,
    matchHash
}