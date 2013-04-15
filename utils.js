var fs = require('fs');
var utils = {};

utils.isArray = function(obj) {
    if (obj instanceof Array) {
        return true;
    }
    
    if (typeof obj !== 'object') {
        return false;
    }
    
    if (utils.type(obj) === 'array') {
        return true;
    }
    
    return false;
};

utils.type = function(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return String (obj);
    }
    
    return Object
                .prototype
                .toString
                .call(obj)
                .replace(/\[object ([a-zA-Z]+)\]/, '$1')
                .toLowerCase();
};

utils.searchJsFiles = function (dir, callback)
{
    fs.readdir(dir, function(err, files) {
        for (var i in files) {
            fs.stat(dir+'/'+files[i], (function(i) {
                return function (err, stat) {
                    if (err) throw err;
                    
                    if (stat.isDirectory()) {
                        utils.searchJsFiles(dir+'/'+files[i], callback);
                    } else {
                        if (files[i].match(/\.js$/)) {
                            callback(dir, files[i]);
                        }
                    }
                }
            })(i));
        }
    });
}

module.exports = utils;