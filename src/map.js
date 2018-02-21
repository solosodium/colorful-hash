(function() {

    /**
     * Map (color to range) class.
     *
     * @param range
     * @param color
     * @constructor
     */
    ColorfulHash.Map = function(range, color) {
        if (!ColorfulHash.Util.isRange(range)) {
            ColorfulHash.Msg.error("Invalid range '" + range + "'.");
            return;
        }
        if (!ColorfulHash.Util.isColor(color)) {
            ColorfulHash.Msg.error("Invalid color '" + color + "'.");
            return;
        }
        this.range = range;
        this.color = color;
    };

    /** Simple tests. */
    // var map_invalid_1 = new ColorfulHash.Map({}, new ColorfulHash.Color(0.5, 0.3, 0.2));
    // var map_invalid_2 = new ColorfulHash.Map(new ColorfulHash.Range(1, 2), {});
    // var map_valid = new ColorfulHash.Map(new ColorfulHash.Range(1, 2), new ColorfulHash.Color(0.5, 0.3, 0.2));
    // console.log(map_valid.range);
    // console.log(map_valid.color);

})();