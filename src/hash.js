var coha = coha || {};

(function() {

    coha.hash = {

        /**
         * Check if a hash string is valid.
         * @param hash
         * @param encoding
         * @return {boolean}
         */
        isValid: function(hash, encoding) {
            // Expect hash to be a string.
            if (!(typeof hash === 'string') && !(hash instanceof String)) {
                coha.msg.error("Hash '" + hash + "' is not a string.");
                return false;
            }
            // Check encoding case.
            switch (encoding) {
                case coha.ENCODING.HEX:
                    // HEX hash has to be converted to lower case first.
                    hash = hash.toLowerCase();
                    for (var i = 0; i < hash.length; i++) {
                        if (coha.CHARSET.HEX.indexOf(hash.charAt(i)) < 0) {
                            coha.msg.error("'" + hash + "' is invalid HEX hash.");
                            return false;
                        }
                    }
                    break;
                case coha.ENCODING.BASE64:
                    for (var j = 0; j < hash.length; j++) {
                        if (coha.CHARSET.BASE64.indexOf(hash.charAt(j)) < 0) {
                            coha.msg.error("'" + hash + "' is invalid BASE64 hash.");
                            return false;
                        }
                    }
                    break;
                default:
                    coha.msg.error("Unknown encoding '" + encoding + "'.");
                    return false;
                    break;
            }
            return true;
        },

        /**
         * Convert hash string to an array of numbers.
         * @param hash
         * @param encoding
         * @return {Array}
         */
        toNumbers: function(hash, encoding) {
            var numbers = [];
            switch (encoding) {
                case coha.ENCODING.HEX:
                    for (var i = 0; i < hash.length; i++) {
                        numbers.push(coha.CHARSET.HEX.indexOf(hash.charAt(i)));
                    }
                    break;
                case coha.ENCODING.BASE64:
                    for (var i = 0; i < hash.length; i++) {
                        numbers.push(coha.CHARSET.BASE64.indexOf(hash.charAt(i)));
                    }
                    break;
                default:
                    coha.msg.error("Unknown encoding '" + encoding + "'.");
                    return [];
                    break;
            }
            return numbers;
        }

    };

})();
