var util = require('util');

// through2 is a thin wrapper around node transform streams
var through2    = require('through2');
var gutil       = require('gulp-util');
var PluginError = gutil.PluginError;

var prefixTemplate = '<dom-module id="%s"><template><style>\n';

// Suffix never changes
var suffixString = '\n</style></template></dom-module>';
var suffixBuffer = new Buffer(suffixString);


// Plugin level function(dealing with files)
function polymerizeCss(options) {

    // Creating a stream through which each file will pass
    return through2.obj(function(file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }

        // Get styleId and set it onto the prefix string
        var styleId = typeof options.styleId === 'function' ? 
            options.styleId(file) : options.styleId;

        var prefixString = util.format(prefixTemplate, styleId);

        if (file.isBuffer()) {

            var prefixBuffer = new Buffer(prefixString);

            // concat stuff
            var res = Buffer.concat([
                prefixBuffer, 
                file.contents, 
                suffixBuffer
            ]);

            // set contents onto the vinyl file
            file.contents = res;
        }
        if (file.isStream()) {
            throw new PluginError('gulp-polymerize-css', 'Streams not currently supported');
        }

        cb(null, file);
    });
}

// Exporting the plugin main function
module.exports = polymerizeCss;