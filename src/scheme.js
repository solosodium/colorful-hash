(function() {

    /**
     * Scheme class for a collection of maps within a range defined by encoding.
     * @param encoding hash encoding (hex or base64)
     * @constructor
     */
    CH.Scheme = function(encoding) {
        this.defaultColor = new CH.Color(0, 0, 0);
        this.range = new CH.Range(0, 1);
        this.maps = [];
        switch (encoding) {
            case CH.ENCODING.HEX:
                this.range.right = CH.CHARSET.HEX.length;
                break;
            case CH.ENCODING.BASE64:
                this.range.right = CH.CHARSET.BASE64.length;
                break;
            default:
                CH.Msg.error("Unknown encoding '" + encoding + "'.");
                break;
        }
        // Create a series of unit (1) sized maps to cover the range.
        for (var i=this.range.left; i<this.range.right; i++) {
            this.maps.push(new CH.Map(new CH.Range(i, i+1), CH.Color.copy(this.defaultColor)));
        }
    };

    /**
     * Adds a map to scheme map list.
     * @param map
     */
    CH.Scheme.prototype.addMap = function(map) {
        if (!CH.Util.isMap(map)) {
            CH.Msg.error("Invalid map '" + JSON.stringify(map) + "'.");
            return;
        }
        if (!this.range.containsRange(map.range)) {
            CH.Msg.error("Map '" + JSON.stringify(map) + "' is out of scheme's range.");
            return;
        }
        for (var i=0; i<this.maps.length; i++) {
            if (map.range.containsRange(this.maps[i].range)) {
                this.maps[i].color = CH.Color.copy(map.color);
            }
        }
    };

    /**
     * Get color from this scheme for specific value.
     * @param value
     * @return {CH.Color}
     */
    CH.Scheme.prototype.getColor = function(value) {
        if (!CH.Util.isNumber(value)) {
            CH.Msg.error("Value '" + value + "' is not a number.");
            return CH.Color.copy(this.defaultColor);
        }
        for (var i=0; i<this.maps.length; i++) {
            if (this.maps[i].range.containsValue(value)) {
                return CH.Color.copy(this.maps[i].color);
            }
        }
        return new CH.Color.copy(this.defaultColor);
    };

    /** Simple tests. */
    // var scheme_invalid_1 = new CH.Scheme('what');
    // scheme_invalid_1.addMap('what');
    // var scheme_valid_1 = new CH.Scheme(CH.ENCODING.HEX);
    // scheme_valid_1.addMap(new CH.Map(new CH.Range(-1, 5), new CH.Color(0.5, 0.5, 0.5)));
    // scheme_valid_1.addMap(new CH.Map(new CH.Range(5, 20), new CH.Color(0.5, 0.5, 0.5)));
    // console.log(scheme_valid_1);
    // var scheme_valid_2 = new CH.Scheme(CH.ENCODING.HEX);
    // scheme_valid_2.addMap(new CH.Map(new CH.Range(4, 7), new CH.Color(1, 0, 0)));
    // scheme_valid_2.addMap(new CH.Map(new CH.Range(0, 3), new CH.Color(0, 1, 0)));
    // scheme_valid_2.addMap(new CH.Map(new CH.Range(6, 9), new CH.Color(0, 0, 1)));
    // console.log(JSON.stringify(scheme_valid_2.maps));
    // console.log(scheme_valid_2.getColor(8));

})();