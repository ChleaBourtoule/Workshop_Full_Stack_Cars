const carsRouter = require('./car');

const setupRoutes = (app) => {
    // Car routes
    app.use('/api/cars', carsRouter);
};

module.exports = {
    setupRoutes,
};