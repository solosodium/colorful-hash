(function() {

    /**
     * Range class (left inclusive, right exclusive).
     * @param left
     * @param right
     * @constructor
     */
    CH.Range = function(left, right) {
        this.left = 0;
        this.right = 0;
        if (!CH.Util.isNumber(left)) {
            CH.Msg.error("Left bound '" + left + "' is not a number.");
            return;
        }
        if (!CH.Util.isNumber(right)) {
            CH.Msg.error("Right bound '" + right + "' is not a number.");
            return;
        }
        if (left >= right) {
            CH.Msg.error("Right bound '" + right + "' is not larger than left bound '" + left + "'.");
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
    CH.Range.prototype.containsValue = function(value) {
        if (!CH.Util.isNumber(value)) {
            CH.Msg.error("Value '" + value + "' is not a number.");
            return false;
        }
        return value >= this.left && value < this.right;
    };

    /**
     * Check if this range contains a range.
     * @param range
     * @return {boolean}
     */
    CH.Range.prototype.containsRange = function(range) {
        if (!CH.Util.isRange(range)) {
            CH.Msg.error("Range '" + JSON.stringify(range) + "' is not a range.");
            return false;
        }
        return range.left >= this.left && range.right <= this.right;
    };

    /** Simple tests. */
    // var range_invalid_1 = new CH.Range('a', 0);
    // var range_invalid_2 = new CH.Range(0, 'b');
    // var range_invalid_3 = new CH.Range(10, 2);
    // var range_valid = new CH.Range(1.5, 6);
    // console.log(range_valid.contains(2));
    // console.log(range_valid.contains(-1));

})();
