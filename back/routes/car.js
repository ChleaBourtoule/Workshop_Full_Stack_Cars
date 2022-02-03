const carsRouter = require('express').Router();
const Car = require('../models/car');


carsRouter.get('/', (req, res) => {
    const { plate, brand, model } = req.query;
    Car.findCars({ filters: { plate, brand, model } })
    .then((cars) => {
        res.json(cars);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving cars from database');
    })
});

carsRouter.get('/brands', (req, res) => {
    Car.findBrand({})
    .then((cars) => {
        res.json(cars);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving brand from database');
    })
});

carsRouter.get('/brands/models', (req, res) => {
    const { brand } = req.query;
    Car.findModel({ filters: {brand}})
    .then((cars) => {
        res.json(cars);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving models from database');
    })
})

module.exports = carsRouter;