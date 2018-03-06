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
                CH.Exception.throw("Unknown encoding '" + JSON.stringify(encoding) + "'.");
        }
        this.encoding = encoding;
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
            CH.Exception.throw("Value '" + JSON.stringify(value) + "' is not a number.");
        }
        for (var i=0; i<this.maps.length; i++) {
            if (this.maps[i].range.containsValue(value)) {
                return CH.Color.copy(this.maps[i].color);
            }
        }
        CH.Exception.throw("Value '" + value + "' is not in scheme range.");
    };

    /**
     * Create a scheme with a list of colors.
     * @param encoding
     * @param colors
     * @return {CH.Scheme}
     */
    CH.Scheme.fromColors = function(encoding, colors) {
        var eLength = 0;
        switch (encoding) {
            case CH.ENCODING.HEX:
                eLength = CH.CHARSET.HEX.length;
                break;
            case CH.ENCODING.BASE64:
                eLength = CH.CHARSET.BASE64.length;
                break;
            default:
                CH.Exception.throw("Unknown encoding '" + JSON.stringify(encoding) + "'.");
        }
        if (!CH.Util.isArray(colors)) {
            CH.Exception.throw("Colors '" + JSON.stringify(colors) + "' is not an array.");
        }
        if (colors.length < 2) {
            CH.Exception.throw("Length of colors '" + colors.length + "' is less than 2.");
        }
        if (colors.length > eLength) {
            colors.splice(eLength, colors.length - eLength);
        }
        var cs = [];
        for (var k=0; k<colors.length; k++) {
            cs.push(CH.Color.fromString(colors[k]));
        }
        var cLength = cs.length;
        var scheme = new CH.Scheme(encoding);
        var j = 0;
        for (var i=0; i<eLength; i++) {
            if (i > (j + 1) / (cLength - 1)  * (eLength - 1)) {
                j++;
            }
            // Interpolate between two colors.
            var a = j / (cLength - 1) * (eLength - 1);
            var b = (j + 1) / (cLength - 1) * (eLength - 1);
            scheme.addMap(
                new CH.Map(new CH.Range(i, i+1),
                    new CH.Color(
                        cs[j].r + (cs[j+1].r - cs[j].r) * (i - a) / (b - a),
                        cs[j].g + (cs[j+1].g - cs[j].g) * (i - a) / (b - a),
                        cs[j].b + (cs[j+1].b - cs[j].b) * (i - a) / (b - a),
                        cs[j].a + (cs[j+1].a - cs[j].a) * (i - a) / (b - a)
                    )
                )
            );
        }
        return scheme;
    };

})();
