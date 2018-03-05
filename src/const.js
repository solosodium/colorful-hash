(function() {

    /**
     * Hash encoding constants.
     * @type {{HEX: string, BASE64: string}}
     */
    CH.ENCODING = {
        HEX: 'hex',
        BASE64: 'base64'
    };

    /**
     * Hash encoding charsets.
     * @type {{HEX: [string], BASE64: [string]}}
     */
    CH.CHARSET = {
        HEX: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
              'a', 'b', 'c', 'd', 'e', 'f'],
        BASE64: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
                 '8', '9', '+', '/']
    };

    /**
     * Exception prefix string.
     * @type {string}
     */
    CH.EXCEPTION_PREFIX = 'CH Exception: ';

})();
