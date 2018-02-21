(function() {

    /**
     * Hash class.
     * @param hash
     * @param encoding  hash encoding (hex or base64)
     * @constructor
     */
    ColorfulHash.Hash = function(hash, encoding) {
        this.hash = '';
        this.processed = '';
        this.encoding = '';
        // Expect hash to be a string.
        if (!ColorfulHash.Util.isString(hash)) {
            ColorfulHash.Msg.error("Hash '" + hash + "' is not a string.");
            return;
        }
        // Remove all white spaces.
        this.processed = hash.replace(new RegExp(' ', 'g'), '');
        // Check encoding case.
        switch (encoding) {
            case ColorfulHash.ENCODING.HEX:
                // HEX hash has to be converted to lower case first.
                this.processed = this.processed.toLowerCase();
                for (var i = 0; i < this.processed.length; i++) {
                    if (ColorfulHash.CHARSET.HEX.indexOf(this.processed.charAt(i)) < 0) {
                        ColorfulHash.Msg.error("'" + hash + "' is invalid HEX hash.");
                        return;
                    }
                }
                break;
            case ColorfulHash.ENCODING.BASE64:
                // Remove end-of-string padding '='.
                this.processed = this.processed.replace(new RegExp('=', 'g'), '');
                for (var j = 0; j < this.processed.length; j++) {
                    if (ColorfulHash.CHARSET.BASE64.indexOf(this.processed.charAt(j)) < 0) {
                        ColorfulHash.Msg.error("'" + hash + "' is invalid BASE64 hash.");
                        return;
                    }
                }
                break;
            default:
                ColorfulHash.Msg.error("Unknown encoding '" + encoding + "'.");
                return;
        }
        // Cache values.
        this.hash = hash;
        this.encoding = encoding;
    };

    /**
     * Converts a hash to a list of numbers.
     * @return {Array} list of numbers
     */
    ColorfulHash.Hash.prototype.toNumbers = function() {
        var numbers = [];
        switch (this.encoding) {
            case ColorfulHash.ENCODING.HEX:
                for (var i = 0; i < this.processed.length; i++) {
                    numbers.push(ColorfulHash.CHARSET.HEX.indexOf(this.processed.charAt(i)));
                }
                break;
            case ColorfulHash.ENCODING.BASE64:
                for (var j = 0; j < this.processed.length; j++) {
                    numbers.push(ColorfulHash.CHARSET.BASE64.indexOf(this.processed.charAt(j)));
                }
                break;
            default:
                ColorfulHash.Msg.error("Unknown encoding '" + encoding + "'.");
                return [];
                break;
        }
        return numbers;
    };

    /** Simple tests. */
    // var hash_invalid_1 = new ColorfulHash.Hash(1, "");
    // var hash_invalid_2 = new ColorfulHash.Hash("", "");
    // var hash_invalid_3 = new ColorfulHash.Hash("gkj", ColorfulHash.ENCODING.HEX);
    // var hash_invalid_4 = new ColorfulHash.Hash("@@", ColorfulHash.ENCODING.BASE64);
    // var hash_valid_1 = new ColorfulHash.Hash("39 72 4b 1e 5a 7d 2c f3 2c 22", ColorfulHash.ENCODING.HEX);
    // console.log(hash_valid_1.toNumbers());
    // console.log(hash_valid_1.hash + ', ' + hash_valid_1.processed);
    // var hash_valid_2 = new ColorfulHash.Hash("cm Fu ZG 9t c2 Q=", ColorfulHash.ENCODING.BASE64);
    // console.log(hash_valid_2.toNumbers());
    // console.log(hash_valid_2.hash + ', ' + hash_valid_2.processed);

})();
