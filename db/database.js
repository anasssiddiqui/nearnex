const { Sequelize } = require('sequelize');
const { postgres, env } = require('../src/utility/config');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: postgres.host,
    port: postgres.port,
    username: postgres.user,
    password: postgres.password,
    database: postgres.database,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('PostgreSQL connected successfully');
    })
    .catch((error) => {
        console.error(`PostgreSQL connection error: ${error}`);
        // @TODO - On production, exit and stop the server if PostgreSQL does not work
        // process.exit(-1);
    });

if (env === 'development') {
    // Enable debugging in development mode if needed
    sequelize
        .sync()
        .then(() => {
            console.log('Sequelize models synced successfully');
        })
        .catch((err) => {
            console.error(`Sequelize sync error: ${err.message}`);
        });
}

module.exports = sequelize;
