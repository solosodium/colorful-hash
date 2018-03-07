/**
 * Global namespace.
 */
var CH = CH || {};

/**
 * Public interface to create a HEX encoding hash.
 * @param id SVG element id
 * @param hash hash code in string
 * @param colors a list of colors
 */
CH.hex = function(id, hash, colors) {
    return CH.create(id, hash, colors, CH.ENCODING.HEX);
};

(function() {

    /**
     * Public interface to create a BASE64 encoding hash.
     * @param id SVG element id
     * @param hash hash code in string
     * @param colors a list of colors
     */
    CH.base64 = function(id, hash, colors) {
        return CH.create(id, hash, colors, CH.ENCODING.BASE64);
    };

    /**
     * Public interface to create a HEX encoding UUID.
     * @param id SVG element id
     * @param uuid a UUID string
     * @param colors a list of colors
     */
    CH.uuid = function(id, uuid, colors) {
        var hash = uuid.replace(new RegExp('-', 'g'), '');
        return CH.create(id, hash, colors, CH.ENCODING.HEX);
    };

    /**
     * Delegate function to create element.
     */
    CH.create = function(id, hash, colors, encoding) {
        var element = new CH.Element(id, CH.Scheme.fromColors(encoding, colors), new CH.Hash(hash, encoding));
        element. draw();
        return element;
    };

})();
