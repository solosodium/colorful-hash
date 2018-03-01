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
        // Get numbers from hash.
        var numbers = this.hash.toNumbers();
        // Draw numbers one by one.
        for (var i=0; i<numbers.length; i++) {
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute('x', 100 / numbers.length * i + '%');
            rect.setAttribute('y', 0);
            // Adjust width by 2 percent to prevent artifact lines.
            rect.setAttribute('width', (100 / numbers.length * 1.02) + '%');
            rect.setAttribute('height', '100%');
            rect.setAttribute('fill', this.scheme.getColor(numbers[i]).toRGBAString());
            this.element.appendChild(rect);
        }
    };

    /** Simple tests. */
    // var element_invalid_1 = new CH.Element(12, null, null);
    // var element_invalid_2 = new CH.Element('test', null, null);

})();