/**
 * This script builds src files to a single javascript file.
 */

// Required modules.
const fs = require('fs');
const uglify = require('uglify-js');

// Constants.
const SRC_DIR_PATH = './src';
const DEST_DIR_PATH = './dist';
const OUTPUT_FILE = 'colorful.hash.js';
const PATH_DELIMITER = '/';
const FILE_ENCODING = 'utf8';

// Uglify options.
var options = {
    toplevel: false,
    output: {
        beautify: false,
        preamble: '/* '+ OUTPUT_FILE +' */'
    }
};

// Read src directory.
fs.readdir(SRC_DIR_PATH, function(err, files) {
    if (err) {
        console.error(err);
    } else {
        // Build file to code map.
        var file2Code = {};
        files.forEach(function(file) {
            file2Code[file] =
                fs.readFileSync(
                    SRC_DIR_PATH + PATH_DELIMITER + file,
                    FILE_ENCODING);
        });
        // Generate uglified code.
        var outputCode = uglify.minify(file2Code, options);
        fs.writeFileSync(
            DEST_DIR_PATH + PATH_DELIMITER + OUTPUT_FILE,
            outputCode.code,
            FILE_ENCODING);
        // Done!
        console.log(OUTPUT_FILE + " compiled successfully!");
    }
});
