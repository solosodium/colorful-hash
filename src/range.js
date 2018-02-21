(function() {

    /**
     * Range class.
     * @param left
     * @param right
     * @constructor
     */
    ColorfulHash.Range = function(left, right) {
        this.left = 0;
        this.right = 0;
        if (!ColorfulHash.Util.isNumber(left)) {
            ColorfulHash.Msg.error("Left bound '" + left + "' is not a number.");
            return;
        }
        if (!ColorfulHash.Util.isNumber(right)) {
            ColorfulHash.Msg.error("Right bound '" + right + "' is not a number.");
            return;
        }
        if (left > right) {
            ColorfulHash.Msg.error("Left bound '" + left + "' is larger than right bound '" + right + "'.");
            return;
        }
        // Cache values.
        this.left = left;
        this.right = right;
    };

    /**
     * Check if this range contains a value.
     * @param value
     * @return {boolean}
     */
    ColorfulHash.Range.prototype.contains = function(value) {
        if (!ColorfulHash.Util.isNumber(value)) {
            ColorfulHash.Msg.error("Value '" + value + "' is not a number.");
            return false;
        } else {
            return value >= this.left && value <= this.right;
        }
    };

    /** Simple tests. */
    // var range_invalid_1 = new ColorfulHash.Range('a', 0);
    // var range_invalid_2 = new ColorfulHash.Range(0, 'b');
    // var range_invalid_3 = new ColorfulHash.Range(10, 2);
    // var range_valid = new ColorfulHash.Range(1.5, 6);
    // console.log(range_valid.contains(2));
    // console.log(range_valid.contains(-1));

})();
