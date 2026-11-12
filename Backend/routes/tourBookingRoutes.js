const tourBookingController = require('../controllers/tourBookingController');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter(tourBookingController);

