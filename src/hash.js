(function() {

    /**
     * Hash class.
     * @param hash
     * @param encoding hash encoding (hex or base64)
     * @constructor
     */
    CH.Hash = function(hash, encoding) {
        this.raw = '';
        this.processed = '';
        this.encoding = '';
        // Expect hash to be a string.
        if (!CH.Util.isString(hash)) {
            CH.Msg.error("Hash '" + hash + "' is not a string.");
            return;
        }
        // Remove all white spaces.
        this.processed = hash.replace(new RegExp(' ', 'g'), '');
        // Check encoding case.
        switch (encoding) {
            case CH.ENCODING.HEX:
                // HEX hash has to be converted to lower case first.
                this.processed = this.processed.toLowerCase();
                for (var i = 0; i < this.processed.length; i++) {
                    if (CH.CHARSET.HEX.indexOf(this.processed.charAt(i)) < 0) {
                        CH.Msg.error("'" + hash + "' is invalid HEX hash.");
                        return;
                    }
                }
                break;
            case CH.ENCODING.BASE64:
                // Remove end-of-string padding '='.
                this.processed = this.processed.replace(new RegExp('=', 'g'), '');
                for (var j = 0; j < this.processed.length; j++) {
                    if (CH.CHARSET.BASE64.indexOf(this.processed.charAt(j)) < 0) {
                        CH.Msg.error("'" + hash + "' is invalid BASE64 hash.");
                        return;
                    }
                }
                break;
            default:
                CH.Msg.error("Unknown encoding '" + encoding + "'.");
                return;
        }
        // Cache values.
        this.raw = hash;
        this.encoding = encoding;
    };

    /**
     * Convert a hash to a list of numbers.
     * @return {Array} list of numbers
     */
    CH.Hash.prototype.toNumbers = function() {
        var numbers = [];
        switch (this.encoding) {
            case CH.ENCODING.HEX:
                for (var i = 0; i < this.processed.length; i++) {
                    numbers.push(CH.CHARSET.HEX.indexOf(this.processed.charAt(i)));
                }
                break;
            case CH.ENCODING.BASE64:
                for (var j = 0; j < this.processed.length; j++) {
                    numbers.push(CH.CHARSET.BASE64.indexOf(this.processed.charAt(j)));
                }
                break;
            default:
                CH.Msg.error("Unknown encoding '" + encoding + "'.");
                return [];
                break;
        }
        return numbers;
    };

    /**
     * Convert a hash to a list of characters.
     * @return {Array} list of characters
     */
    CH.Hash.prototype.toCharacters = function() {
        return Array.from(this.processed);
    };

    /** Simple tests. */
    // var hash_invalid_1 = new CH.Hash(1, "");
    // var hash_invalid_2 = new CH.Hash("", "");
    // var hash_invalid_3 = new CH.Hash("gkj", CH.ENCODING.HEX);
    // var hash_invalid_4 = new CH.Hash("@@", CH.ENCODING.BASE64);
    // var hash_valid_1 = new CH.Hash("39 72 4b 1e 5a 7d 2c f3 2c 22", CH.ENCODING.HEX);
    // console.log(hash_valid_1.toNumbers());
    // console.log(hash_valid_1.raw + ', ' + hash_valid_1.processed);
    // var hash_valid_2 = new CH.Hash("cm Fu ZG 9t c2 Q=", CH.ENCODING.BASE64);
    // console.log(hash_valid_2.toNumbers());
    // console.log(hash_valid_2.raw + ', ' + hash_valid_2.processed);
    // console.log(hash_valid_2.toCharacters());

})();
