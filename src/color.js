(function() {

    /**
     * Color class.
     * @param r red 0~1
     * @param g green 0~1
     * @param b blue 0~1
     * @param a alpha 0~1
     * @constructor
     */
    CH.Color = function(r, g, b, a) {
        if (!CH.Util.isRGBAValue(r)) {
            CH.Exception.throw("Red '" + r + "' is not a valid color value..");
        }
        if (!CH.Util.isRGBAValue(g)) {
            CH.Exception.throw("Green '" + g + "' is not a valid color value.");
        }
        if (!CH.Util.isRGBAValue(b)) {
            CH.Exception.throw("Blue '" + b + "' is not a valid color value.");
        }
        this.r = r;
        this.g = g;
        this.b = b;
        if (a) {
            if (!CH.Util.isRGBAValue(a)) {
                CH.Exception.throw("Alpha '" + a + "' is not a valid color value.");
            }
            this.a = a;
        } else {
            // Just set to default value if a is not provided.
            this.a = 1;
        }
    };

    /**
     * Color to rgba(r, g, b, a) string.
     * @return {string}
     */
    CH.Color.prototype.toRGBAString = function() {
        return 'rgba('
            + Math.floor(this.r * 255) + ' ,'
            + Math.floor(this.g * 255) + ' ,'
            + Math.floor(this.b * 255) + ' ,'
            + this.a + ')';
    };

    /**
     * /**
     * Copy constructor of color.
     * @param color
     * @return {CH.Color}
     */
    CH.Color.copy = function(color) {
        if (!CH.Util.isColor(color)) {
            CH.Exception.throw("Invalid color '" + JSON.stringify(color) + "'.");
        }
        return new CH.Color(color.r, color.g, color.b, color.a);
    };

    /**
     * Parse color from a color string, which could be the following cases:
     * 1) '#5AF'
     * 2) '#55AAFF'
     * 3) 'rgb(128, 0, 255)'
     * 4) 'rgba(128, 0, 255, 0.5)'
     * @param string
     */
    CH.Color.fromString = function(string) {
        var m;
        // 1) '#5AF'
        m = string.match(/^#([0-9a-f]{3})$/i);
        if(m && m.length > 1) {
            return new CH.Color(
                parseInt(m[1].charAt(0), 16) * 0x11 / 255,
                parseInt(m[1].charAt(1), 16) * 0x11 / 255,
                parseInt(m[1].charAt(2), 16) * 0x11 / 255
            );
        }
        // 2) '#55AAFF'
        m = string.match(/^#([0-9a-f]{6})$/i);
        if(m && m.length > 1) {
            return new CH.Color(
                parseInt(m[1].substring(0, 2), 16) / 255,
                parseInt(m[1].substring(2, 4), 16) / 255,
                parseInt(m[1].substring(4, 6), 16) / 255
            );
        }
        // 3) 'rgb(128, 0, 255)'
        m = string.match(/^rgb\s*\(\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*\)$/i);
        if(m && m.length > 3) {
            return new CH.Color(
                Math.min(Math.max(m[1], 0), 255) / 255,
                Math.min(Math.max(m[2], 0), 255) / 255,
                Math.min(Math.max(m[3], 0), 255) / 255
            );
        }
        // 4) 'rgba(128, 0, 255, 0.5)'
        m = string.match(/^rgba\s*\(\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*\)$/i);
        if(m && m.length > 4) {
            return new CH.Color(
                Math.min(Math.max(m[1], 0), 255) / 255,
                Math.min(Math.max(m[2], 0), 255) / 255,
                Math.min(Math.max(m[3], 0), 255) / 255,
                Math.min(Math.max(m[4], 0), 1)
            );
        }
        CH.Exception.throw("Invalid color string '" + string + "'.");
    };

    /** Simple tests. */
    // var color_invalid_1 = new CH.Color('r', 0, 0, 0);
    // var color_invalid_2 = new CH.Color(0, 'g', 0, 0);
    // var color_invalid_3 = new CH.Color(0, 0, 'b', 0);
    // var color_invalid_4 = new CH.Color(0, 0, 0, 'a');
    // var color_invalid_5 = new CH.Color(2, 0, 0, 0);
    // var color_invalid_6 = new CH.Color(0, 2, 0, 0);
    // var color_invalid_7 = new CH.Color(0, 0, 2, 0);
    // var color_invalid_8 = new CH.Color(0, 0, 0, 2);
    // var color_valid_1 = new CH.Color(0.5, 0.1, 0.3, 0.9);
    // console.log(color_valid_1);
    // var color_valid_2 = new CH.Color(0.5, 0.1, 0.3);
    // console.log(color_valid_2);
    // console.log(CH.Color.fromString('#3af'));
    // console.log(CH.Color.fromString('#3aff34'));
    // console.log(CH.Color.fromString('rgb(40, 255, 127.5)'));
    // console.log(CH.Color.fromString('rgba(.2, 255, 127.5, .23)'));
    // CH.Color.fromString("abcdf");

})();