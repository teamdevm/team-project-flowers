const bcrypt = require('bcryptjs');

const saltRounds = 10;

async function getHash(original) {
    let hash;
    try {
        hash = await bcrypt.hash(original, saltRounds);
    } catch (error) {
        console.log('Something went wrong with the hash module. ', error);
        throw new Error('Something went wrong with the hash module.');
    }

    return hash;
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

module.export = {
    getHash,
    matchHash
}