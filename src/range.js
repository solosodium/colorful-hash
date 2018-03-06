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
            CH.Exception.throw("Left bound '" + JSON.stringify(left) + "' is not a number.");
        }
        if (!CH.Util.isNumber(right)) {
            CH.Exception.throw("Right bound '" + JSON.stringify(right) + "' is not a number.");
        }
        if (left >= right) {
            CH.Exception.throw("Right bound '" + JSON.stringify(right) + "' is not larger than left bound '" + JSON.stringify(left) + "'.");
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
            CH.Exception.throw("Value '" + JSON.stringify(value) + "' is not a number.");
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
            CH.Exception.throw("Range '" + JSON.stringify(range) + "' is not a range.");
        }
        return range.left >= this.left && range.right <= this.right;
    };

})();
