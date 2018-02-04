var coha = coha || {};

(function() {

    /**
     * Hash encoding constants.
     * @type {{HEX: string, BASE64: string}}
     */
    coha.ENCODING = {
        HEX: 'hex',
        BASE64: 'base64'
    };

    /**
     * Hash encoding charsets.
     * @type {{HEX: [string], BASE64: [string]}}
     */
    coha.CHARSET = {
        HEX: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f'],
        BASE64: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
            'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p',' q', 'r', 's', 't', 'u', 'v', 'w', 'x',
            'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '+', '/']
    };

    /**
     * Hash encoding number range (maximum value).
     * @type {{HEX: Number, BASE64: Number}}
     */
    coha.RANGE = {
        HEX: {
            MIN: 0,
            MAX: coha.CHARSET.HEX.length - 1,
            LENGTH: coha.CHARSET.HEX.length
        },
        BASE64: {
            MIN: 0,
            MAX: coha.CHARSET.BASE64.length - 1,
            LENGTH: coha.CHARSET.BASE64.length
        }
    };

    /**
     * UUID regex.
     * @type {string}
     */
    coha.UUID_REGEX = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');

    /**
     * Message prefix string.
     * @type {string}
     */
    coha.MSG_PREFIX = '[coha] ';

    /**
     * Message logging level.
     * ------------------------------
     * | level | log | warn | error |
     * |----------------------------|
     * |   0   |  n  |  n   |   n   |
     * |   1   |  n  |  n   |   y   |
     * |   2   |  n  |  y   |   y   |
     * |   3   |  y  |  y   |   y   |
     * ------------------------------
     * @type {number}
     */
    coha.MSG_LEVEL = 3;

})();
