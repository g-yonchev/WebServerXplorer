var UsersController = require('./UsersController');
var StorageController = require('./StorageController');
var AdminController = require('./AdminController');

module.exports = {
    users: UsersController,
    storage: StorageController,
    admin: AdminController

};