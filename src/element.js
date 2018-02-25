(function() {

    /**
     * Element class.
     * @param id
     * @param hash
     * @param scheme
     * @constructor
     */
    CH.Element = function(id, hash, scheme) {
        // Get id and SVG element.
        if (!CH.Util.isString(id)) {
            CH.Msg.error("Element id '" + id + "' is not a string.");
            return;
        }
        this.id = id;
        this.element = document.getElementById(id);
        if (CH.Util.isNullOrUndefined(this.element)) {
            CH.Msg.error("Can't find element with id '" + id + "'.");
            return;
        }
        // Get hash.
        if (!CH.Util.isHash(hash)) {
            CH.Msg.error("Invalid hash '" + JSON.stringify(hash) + "'.");
            return;
        }
        this.hash = hash;
        // Get scheme.
        if (!CH.Util.isScheme(scheme)) {
            CH.Msg.error("Invalid scheme '" + JSON.stringify(scheme) + "'.");
            return;
        }
        this.scheme = scheme;
    };

    /**
     * Draw the hash with SVG element.
     */
    CH.Element.prototype.draw = function() {
        // Get width ans height SVG element dimensions.
        var width = parseInt(this.element.getAttribute('width'), 10);
        var unit = this.element.getAttribute('width').replace(width.toString(), '');
        var height = this.element.getAttribute('height');
        // Get numbers from hash.
        var numbers = this.hash.toNumbers();
        for (var i=0; i<numbers.length; i++) {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute('x', width / numbers.length * i + unit);
            rect.setAttribute('y', 0);
            // Adjust width by 2 percent to prevent artifact lines.
            rect.setAttribute('width', (width / numbers.length * 1.02) + unit);
            rect.setAttribute('height', height);
            rect.setAttribute('fill', this.scheme.getColor(numbers[i]).toRGBAString());
            this.element.appendChild(rect);
        }
    };

})();