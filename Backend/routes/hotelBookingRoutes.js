const hotelBookingController = require('../controllers/hotelBookingController');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter(hotelBookingController);

