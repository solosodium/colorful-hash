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
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        if (!CH.Util.isRGBAValue(r)) {
            CH.Msg.error("Red '" + r + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        if (!CH.Util.isRGBAValue(g)) {
            CH.Msg.error("Green '" + g + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        if (!CH.Util.isRGBAValue(b)) {
            CH.Msg.error("Blue '" + b + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        this.r = r;
        this.g = g;
        this.b = b;
        if (a) {
            if (!CH.Util.isRGBAValue(a)) {
                CH.Msg.error("Alpha '" + a + "' is not a valid value. Should between 0 and 1.");
                return;
            } else {
                this.a = a;
            }
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
     * Copy constructor of color.
     * @param color
     */
    CH.Color.copy = function(color) {
        if (!CH.Util.isColor(color)) {
            CH.Msg.error("Invalid color '" + JSON.stringify(color) + "'.");
            return;
        }
        return new CH.Color(color.r, color.g, color.b, color.a);
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

})();