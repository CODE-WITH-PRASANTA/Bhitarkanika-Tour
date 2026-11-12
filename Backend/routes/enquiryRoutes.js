const enquiryController = require('../controllers/enquiryController');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter(enquiryController);

