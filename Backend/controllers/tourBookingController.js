const TourBooking = require('../models/TourBooking');
const createCrudController = require('./crudController');

module.exports = createCrudController(TourBooking, 'Tour booking');

