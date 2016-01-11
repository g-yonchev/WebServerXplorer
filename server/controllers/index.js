var UsersController = require('./UsersController');
var StorageController = require('./StorageController');
var FileTransferController = require('./FileTransferController');

module.exports = {
    users: UsersController,
    storage: StorageController,
    fileTransfer: FileTransferController,
};