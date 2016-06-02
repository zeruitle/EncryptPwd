/*
 *Constructor, Interface
 */
function StorageInterface() {}

StorageInterface.prototype.isSynchronous = false;

StorageInterface.prototype.get = function(keys, opt_callback) {};

StorageInterface.prototype.set = function(items, opt_callback) {};

StorageInterface.prototype.remove = function(keys, opt_callback) {};

StorageInterface.prototype.addListener = function(callback) {};

/********************************************************
 *Constructor, implement StorageInterface
 */
function ObjectStorage() {
    this.values_ = {};
    this.listeners_ = [];
}

ObjectStorage.prototype.isSynchronous = true;