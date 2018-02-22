(function() {

    /**
     * Scheme class for a collection of maps within a range defined by encoding.
     * @param encoding hash encoding (hex or base64)
     * @constructor
     */
    ColorfulHash.Scheme = function(encoding) {
        this.range = new ColorfulHash.Range(0, 0);
        this.maps = [];
        switch (encoding) {
            case ColorfulHash.ENCODING.HEX:
                this.range.right = ColorfulHash.CHARSET.HEX.length - 1;
                break;
            case ColorfulHash.ENCODING.BASE64:
                this.range.right = ColorfulHash.CHARSET.BASE64.length - 1;
                break;
            default:
                ColorfulHash.Msg.error("Unknown encoding '" + encoding + "'.");
                break;
        }
    };

    /**
     * Add a map to scheme map list.
     * @param map
     */
    ColorfulHash.Scheme.prototype.addMap = function(map) {
        if (!ColorfulHash.Util.isMap(map)) {
            ColorfulHash.Msg.error("Invalid map '" + map + "'.");
        } else {
            this.maps.push(map);
        }
    };

    

})();