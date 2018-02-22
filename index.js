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

// Source files. The order is preserved for simple tests purposes.
const SRC_FILES = [
    'main.js',
    'const.js',
    'msg.js',
    'util.js',
    'hash.js',
    'uuid.js',
    'range.js',
    'color.js',
    'map.js',
    'scheme.js',
    'element.js',
];

// Uglify options.
let options = {
    toplevel: false,
    output: {
        beautify: true,
        preamble: '/* '+ OUTPUT_FILE +' */'
    }
};

// Read src directory.
fs.readdir(SRC_DIR_PATH, function(err, files) {
    if (err) {
        console.error("Read source directory error:", err);
    } else {
        // Build file to code map.
        console.log("Processing source files: ");
        let file2Code = {};
        SRC_FILES.forEach(function(file) {
            if (files.indexOf(file) < 0) {
                console.error(" - Missing source file: '" + file + "'");
            } else {
                file2Code[file] =
                    fs.readFileSync(
                        SRC_DIR_PATH + PATH_DELIMITER + file,
                        FILE_ENCODING);
                console.log(" - Found: '" + file + "'");
            }
        });
        // Generate uglified code.
        let outputCode = uglify.minify(file2Code, options);
        if (outputCode.hasOwnProperty('error')) {
            console.error("Compilation failed:", outputCode);
        } else {
            fs.writeFileSync(
                DEST_DIR_PATH + PATH_DELIMITER + OUTPUT_FILE,
                outputCode.code,
                FILE_ENCODING);
            // Done!
            console.log(OUTPUT_FILE + " compiled successfully!");
        }
    }
});
