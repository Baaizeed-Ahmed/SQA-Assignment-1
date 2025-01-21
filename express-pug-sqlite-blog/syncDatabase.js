const { sequelize } = require('./models');

sequelize.sync({ alter: true }) // Use { force: true } to drop and recreate tables
    .then(() => {
        console.log('Database synchronized successfully.');
        process.exit(0); // Exit the script
    })
    .catch((err) => {
        console.error('Failed to synchronize the database:', err);
        process.exit(1); // Exit with an error
    });
