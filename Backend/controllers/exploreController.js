const Explore = require('../models/Explore');
const createCrudController = require('./crudController');

module.exports = createCrudController(Explore, 'Explore item');

