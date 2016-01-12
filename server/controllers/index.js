var UsersController = require('./UsersController');
var StorageController = require('./StorageController');
var FileTransferController = require('./FileTransferController');
var AdminController = require('./AdminController');

module.exports = {
    users: UsersController,
    storage: StorageController,
    fileTransfer: FileTransferController,
    admin: AdminController
};