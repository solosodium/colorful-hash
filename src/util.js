(function() {

    /**
     * Util class.
     * @constructor
     */
    ColorfulHash.Util = function() {
        /** Do nothing. */
    };

    /**
     * Check if a number is a number.
     * @param number
     * @return {boolean}
     */
    ColorfulHash.Util.isNumber = function(number) {
        return !isNaN(number) && isFinite(number);
    };

    /**
     * Check if a string is a string.
     * @param string
     * @return {boolean}
     */
    ColorfulHash.Util.isString = function(string) {
        return (typeof string === 'string') || (string instanceof String);
    };

    /**
     * Check if a value is valid RGBA value.,
     * @param value
     * @return {boolean}
     */
    ColorfulHash.Util.isRGBA = function(value) {
        return ColorfulHash.Util.isNumber(value) && (value >= 0 && value <= 1);
    };

    /**
     * Check if range is of class Range.
     * @param range
     * @return {boolean}
     */
    ColorfulHash.Util.isRange = function(range) {
        return range instanceof ColorfulHash.Range;
    };

    /**
     * Check if color is of class Color.
     * @param color
     * @return {boolean}
     */
    ColorfulHash.Util.isColor = function(color) {
        return color instanceof ColorfulHash.Color;
    };

})();