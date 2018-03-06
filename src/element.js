(function() {

    /**
     * Element class.
     * @param id
     * @param scheme
     * @param hash
     * @constructor
     */
    CH.Element = function(id, scheme, hash) {
        // Initialize id.
        if (!CH.Util.isString(id)) {
            CH.Exception.throw("Element id '" + JSON.stringify(id) + "' is not a string.");
        }
        this.id = id;
        // Initialize element with id.
        this.element = document.getElementById(id);
        if (CH.Util.isNullOrUndefined(this.element)) {
            CH.Exception.throw("Can't find element with id '" + JSON.stringify(id) + "'.");
        }
        // Initialize scheme.
        if (!CH.Util.isScheme(scheme)) {
            CH.Exception.throw("Invalid scheme '" + JSON.stringify(scheme) + "'.");
        }
        this.scheme = scheme;
        // Initialize hash.
        if (!CH.Util.isHash(hash)) {
            CH.Exception.throw("Invalid hash '" + JSON.stringify(hash) + "'.");
        }
        this.hash = hash;
    };

    /**
     * Draw the hash with SVG element.
     */
    CH.Element.prototype.draw = function() {
        // Clear child elements.
        while (this.element.lastChild) {
            this.element.removeChild(this.element.lastChild);
        }
        // Get numbers from hash.
        var numbers = this.hash.toNumbers();
        // Draw numbers one by one.
        var prevX = 0;
        for (var i=0; i<numbers.length; i++) {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute('x', prevX + '%');
            var nextX = 100 / numbers.length * (i + 1);
            rect.setAttribute('y', 0 + '%');
            // Use 105% width to cover artifact lines.
            rect.setAttribute('width', (nextX - prevX) * 1.05 + '%');
            rect.setAttribute('height', '100%');
            rect.setAttribute('fill', this.scheme.getColor(numbers[i]).toRGBAString());
            this.element.appendChild(rect);
            prevX = nextX;
        }
    };

    /**
     * Set a new hash to the element.
     * @param hash
     */
    CH.Element.prototype.setHash = function(hash) {
        this.hash = new CH.Hash(hash, this.hash.encoding);
        this.draw();
    };

    /**
     * Set a new scheme with a list of colors.
     * @param colors
     */
    CH.Element.prototype.setColors = function(colors) {
        this.scheme = CH.Scheme.fromColors(this.scheme.encoding, colors);
        this.draw();
    };

})();
