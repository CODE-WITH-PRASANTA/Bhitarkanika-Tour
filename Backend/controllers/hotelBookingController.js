const HotelBooking = require('../models/HotelBooking');
const createCrudController = require('./crudController');

module.exports = createCrudController(HotelBooking, 'Hotel booking');

