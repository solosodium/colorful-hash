(function() {

    /**
     * Color class.
     * @param r red 0~1
     * @param g green 0~1
     * @param b blue 0~1
     * @param a alpha 0~1
     * @constructor
     */
    ColorfulHash.Color = function (r, g, b, a) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        if (!ColorfulHash.Util.isRGBA(r)) {
            ColorfulHash.Msg.error("Red '" + r + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        if (!ColorfulHash.Util.isRGBA(g)) {
            ColorfulHash.Msg.error("Green '" + g + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        if (!ColorfulHash.Util.isRGBA(b)) {
            ColorfulHash.Msg.error("Blue '" + b + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        this.r = r;
        this.g = g;
        this.b = b;
        if (a) {
            if (!ColorfulHash.Util.isRGBA(a)) {
                ColorfulHash.Msg.error("Alpha '" + a + "' is not a valid value. Should between 0 and 1.");
                return;
            } else {
                this.a = a;
            }
        } else {
            // Just set to default value if a is not provided.
            this.a = 1;
        }
    };

    /** Simple tests. */
    // var color_invalid_1 = new ColorfulHash.Color('r', 0, 0, 0);
    // var color_invalid_2 = new ColorfulHash.Color(0, 'g', 0, 0);
    // var color_invalid_3 = new ColorfulHash.Color(0, 0, 'b', 0);
    // var color_invalid_4 = new ColorfulHash.Color(0, 0, 0, 'a');
    // var color_invalid_5 = new ColorfulHash.Color(2, 0, 0, 0);
    // var color_invalid_6 = new ColorfulHash.Color(0, 2, 0, 0);
    // var color_invalid_7 = new ColorfulHash.Color(0, 0, 2, 0);
    // var color_invalid_8 = new ColorfulHash.Color(0, 0, 0, 2);
    // var color_valid_1 = new ColorfulHash.Color(0.5, 0.1, 0.3, 0.9);
    // console.log(color_valid_1);
    // var color_valid_2 = new ColorfulHash.Color(0.5, 0.1, 0.3);
    // console.log(color_valid_2);

})();