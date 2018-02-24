(function() {

    /**
     * Map (color to range) class.
     *
     * @param range
     * @param color
     * @constructor
     */
    CH.Map = function(range, color) {
        if (!CH.Util.isRange(range)) {
            CH.Msg.error("Invalid range '" + JSON.stringify(range) + "'.");
            return;
        }
        if (!CH.Util.isColor(color)) {
            CH.Msg.error("Invalid color '" + JSON.stringify(color) + "'.");
            return;
        }
        this.range = range;
        this.color = color;
    };

    /** Simple tests. */
    // var map_invalid_1 = new CH.Map({}, new CH.Color(0.5, 0.3, 0.2));
    // var map_invalid_2 = new CH.Map(new CH.Range(1, 2), {});
    // var map_valid = new CH.Map(new CH.Range(1, 2), new CH.Color(0.5, 0.3, 0.2));
    // console.log(map_valid.range);
    // console.log(map_valid.color);

})();