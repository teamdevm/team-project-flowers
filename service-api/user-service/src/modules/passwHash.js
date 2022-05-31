const bcrypt = require('bcryptjs');

const saltRounds = 10;

function getHash(original) {
    try {
        return bcrypt.hashSync(original, saltRounds);
    } catch (error) {
        throw error;
    }
}

async function matchHash(password, originalHashed) {
    let matched;
    try {
        matched = await bcrypt.compareSync(password, originalHashed);
    } catch (error) {
        console.log('Something went wrong with the hash module. ', error);
        throw new Error('Something went wrong with the hash module.');
    }

    return matched;
}

module.exports = {
    getHash,
    matchHash
}