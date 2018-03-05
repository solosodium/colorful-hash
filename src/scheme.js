(function() {

    /**
     * Scheme class for a collection of maps within a range defined by encoding.
     * @param encoding hash encoding (hex or base64)
     * @constructor
     */
    CH.Scheme = function(encoding) {
        this.range = new CH.Range(0, 1);
        switch (encoding) {
            case CH.ENCODING.HEX:
                this.range.right = CH.CHARSET.HEX.length;
                break;
            case CH.ENCODING.BASE64:
                this.range.right = CH.CHARSET.BASE64.length;
                break;
            default:
                CH.Exception.throw("Unknown encoding '" + encoding + "'.");
        }
        // Create a series of unit (1) sized maps to cover the range.
        this.maps = [];
        for (var i=this.range.left; i<this.range.right; i++) {
            this.maps.push(new CH.Map(new CH.Range(i, i+1), CH.Color.copy(new CH.Color(0, 0, 0))));
        }
    };

    /**
     * Adds a map to scheme map list.
     * @param map
     */
    CH.Scheme.prototype.addMap = function(map) {
        if (!CH.Util.isMap(map)) {
            CH.Exception.throw("Invalid map '" + JSON.stringify(map) + "'.");
        }
        if (!this.range.containsRange(map.range)) {
            CH.Exception.throw("Map '" + JSON.stringify(map) + "' is out of scheme's range.");
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
            CH.Exception.throw("Value '" + value + "' is not a number.");
        }
        for (var i=0; i<this.maps.length; i++) {
            if (this.maps[i].range.containsValue(value)) {
                return CH.Color.copy(this.maps[i].color);
            }
        }
        CH.Exception.throw("Value '" + value + "' is not in scheme range.");
    };

    /**
     * Create a color scheme based on two colors (linearly interpreted).
     * @param encoding
     * @param colorA
     * @param colorB
     */
    CH.Scheme.twoColorLinear = function(encoding, colorA, colorB) {
        if (!CH.Util.isColor(colorA)) {
            CH.Exception.throw("Invalid colorA '" + JSON.stringify(colorA) + "'.");
        }
        if (!CH.Util.isColor(colorB)) {
            CH.Exception.throw("Invalid colorB '" + JSON.stringify(colorB) + "'.");
        }
        var length = 0;
        switch (encoding) {
            case CH.ENCODING.HEX:
                length = CH.CHARSET.HEX.length;
                break;
            case CH.ENCODING.BASE64:
                length = CH.CHARSET.BASE64.length;
                break;
            default:
                CH.Exception.throw("Unknown encoding '" + encoding + "'.");
        }
        var scheme = new CH.Scheme(encoding);
        for (var i=0; i<length; i++) {
            scheme.addMap(
                new CH.Map(new CH.Range(i, i+1),
                    new CH.Color(
                        colorA.r + (colorB.r - colorA.r) * i / (length - 1),
                        colorA.g + (colorB.g - colorA.g) * i / (length - 1),
                        colorA.b + (colorB.b - colorA.b) * i / (length - 1),
                        colorA.a + (colorB.a - colorA.a) * i / (length - 1)
                    )
                )
            );
        }
        return scheme;
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
    // var scheme_valid_3 = CH.Scheme.twoColorLinear(
    //     CH.ENCODING.HEX, new CH.Color(0.5, 0.2, 0.1), new CH.Color(0.6, 1.0, 0.3));
    // console.log(scheme_valid_3);

})();