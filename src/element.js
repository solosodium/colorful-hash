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
            CH.Exception.throw("Element id '" + id + "' is not a string.");
        }
        this.id = id;
        // Initialize element with id.
        this.element = document.getElementById(id);
        if (CH.Util.isNullOrUndefined(this.element)) {
            CH.Exception.throw("Can't find element with id '" + id + "'.");
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
            rect.setAttribute('width', (nextX - prevX) * 1.05 + '%');
            rect.setAttribute('height', '100%');
            rect.setAttribute('fill', this.scheme.getColor(numbers[i]).toRGBAString());
            this.element.appendChild(rect);
            prevX = nextX;
        }
    };

    /** Simple tests. */
    // var element_invalid_1 = new CH.Element(12, null, null);
    // var element_invalid_2 = new CH.Element('test', null, null);

})();