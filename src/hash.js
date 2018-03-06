(function() {

    /**
     * Hash class.
     * @param hash
     * @param encoding hash encoding (hex or base64)
     * @constructor
     */
    CH.Hash = function(hash, encoding) {
        // Expect hash to be a string.
        if (!CH.Util.isString(hash)) {
            CH.Exception.throw("Hash '" + JSON.stringify(hash) + "' is not a string.");
        }
        // Remove all white spaces.
        var intermediate = hash.replace(new RegExp(' ', 'g'), '');
        // Check encoding case.
        switch (encoding) {
            case CH.ENCODING.HEX:
                // HEX hash has to be converted to lower case first.
                intermediate = intermediate.toLowerCase();
                for (var i = 0; i < intermediate.length; i++) {
                    if (CH.CHARSET.HEX.indexOf(intermediate.charAt(i)) < 0) {
                        CH.Exception.throw("'" + JSON.stringify(hash) + "' is invalid HEX hash.");
                    }
                }
                break;
            case CH.ENCODING.BASE64:
                // Remove end-of-string padding '='.
                intermediate = intermediate.replace(new RegExp('=', 'g'), '');
                for (var j = 0; j < intermediate.length; j++) {
                    if (CH.CHARSET.BASE64.indexOf(intermediate.charAt(j)) < 0) {
                        console.log(intermediate.charAt(j));
                        console.log(CH.CHARSET.BASE64.indexOf(intermediate.charAt(j)));
                        CH.Exception.throw("'" + JSON.stringify(hash) + "' is invalid BASE64 hash.");
                    }
                }
                break;
            default:
                CH.Exception.throw("Unknown encoding '" + JSON.stringify(encoding) + "'.");
        }
        // Cache values.
        this.raw = hash;
        this.encoding = encoding;
        this.processed = intermediate;
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
                CH.Exception.throw("Unknown encoding '" + JSON.stringify(encoding) + "'.");
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

})();
