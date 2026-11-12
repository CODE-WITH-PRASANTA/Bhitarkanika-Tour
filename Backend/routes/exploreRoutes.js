const exploreController = require('../controllers/exploreController');
const createCrudRouter = require('./createCrudRouter');

module.exports = createCrudRouter(exploreController);

