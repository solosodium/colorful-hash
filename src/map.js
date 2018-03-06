(function() {

    /**
     * Map (color to range) class.
     * @param range
     * @param color
     * @constructor
     */
    CH.Map = function(range, color) {
        if (!CH.Util.isRange(range)) {
            CH.Exception.throw("Invalid range '" + JSON.stringify(range) + "'.");
        }
        if (!CH.Util.isColor(color)) {
            CH.Exception.throw("Invalid color '" + JSON.stringify(color) + "'.");
        }
        this.range = range;
        this.color = color;
    };

})();
