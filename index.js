'use strict';

var fs = require('fs');

module.exports = function requireAll(options) {

    if (typeof options === 'string') {
        options = {
            dirname: options,
            filter: /(.+)\.js(on)?$/
        }
    }

    //TODO: merge default options?
    var result = {};

    //TODO: check if dirname is dir?
    var files = fs.readdirSync(options.dirname);

    files.forEach(function(file) {
        var filepath = options.dirname + '/' + file;

        //check dir or just file
        if (fs.statSync(filepath).isDirectory()) {

            result[file] = requireAll({
                dirname: filepath,
                filter: options.filter
            });

        } else {
            //"a.js".match(/(.+)\.js(on)?$/)
            //["a.js", "a", undefined]
            var match = file.match(options.filter);
            //core js also use require()
            result[match[1]] = require(filepath);
        }
    });


    return result;

};