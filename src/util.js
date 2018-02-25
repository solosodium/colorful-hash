(function() {

    /**
     * Util class.
     * @constructor
     */
    CH.Util = function() {
        /** Do nothing. */
    };

    /**
     * Check if a number is a number.
     * @param number
     * @return {boolean}
     */
    CH.Util.isNumber = function(number) {
        return !isNaN(number) && isFinite(number);
    };

    /**
     * Check if a string is a string.
     * @param string
     * @return {boolean}
     */
    CH.Util.isString = function(string) {
        return (typeof string === 'string') || (string instanceof String);
    };

    /**
     * Check if a value is valid RGBA value (between 0 to 1).
     * @param value
     * @return {boolean}
     */
    CH.Util.isRGBA = function(value) {
        return CH.Util.isNumber(value) && (value >= 0 && value <= 1);
    };

    /**
     * Check if range is of class Range.
     * @param range
     * @return {boolean}
     */
    CH.Util.isRange = function(range) {
        return range instanceof CH.Range;
    };

    /**
     * Check if color is of class Color.
     * @param color
     * @return {boolean}
     */
    CH.Util.isColor = function(color) {
        return color instanceof CH.Color;
    };

    /**
     * Check if map is of class Map.
     * @param map
     * @return {boolean}
     */
    CH.Util.isMap = function(map) {
        return map instanceof CH.Map;
    };

    /**
     * Check if scheme is of class Scheme.
     * @param scheme
     * @return {boolean}
     */
    CH.Util.isScheme = function(scheme) {
        return scheme instanceof CH.Scheme;
    };

    /**
     * Check if raw is of class Hash.
     * @param hash
     * @return {boolean}
     */
    CH.Util.isHash = function(hash) {
        return hash instanceof CH.Hash;
    };

    /**
     * Check if value is null or undefined.
     * @param value
     * @return {boolean}
     */
    CH.Util.isNullOrUndefined = function(value) {
        return (value === null) || (typeof value === 'undefined');
    };

})();