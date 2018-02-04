var coha = coha || {};

(function() {

    coha.color = {

        /**
         * Color class.
         * @param r red 0~255
         * @param g green 0~255
         * @param b blue 0~255
         * @param a alpha 0.0~1.0
         * @constructor
         */
        Color: function(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            a ? this.a = a : this.a = 1.0;
        },

        /**
         * Range class.
         * @param min minimum integer value (inclusive)
         * @param max maximum integer value (inclusive)
         * @constructor
         */
        Range: function(min, max) {
            this.min = min;
            this.max = max;
        },

        /**
         * Mapping class for color to range.
         * @param range number range color is mapped to
         * @param color just the color
         * @constructor
         */
        Mapping: function(range, color) {
            this.range = range;
            this.color = color;
        },

        /**
         * Create value to color array base on an array of mappings.
         * @param range number range
         * @param mappings an array of mappings
         * @return {Array}
         */
        create: function(range, mappings) {
            var colors = [];
            for (var i = 0; i < mappings.length; i++) {
                var mapping = mappings[i];
                for (var j = mapping.range.min; j <= mapping.range.max; j++) {
                    colors[j] = mapping.color;
                }
            }
            return colors;
        }

    };

})();