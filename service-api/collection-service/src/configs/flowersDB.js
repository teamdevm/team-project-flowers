const dbConnection = {
    database: process.env.DB_NAME || 'flowers',
    user: process.env.DB_USER || 'flower_tester',
    password: process.env.DB_PASSWORD || 'flower_tester',
    host: process.env.DB_HOST || '46.146.230.198',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
};

module.exports = dbConnection;