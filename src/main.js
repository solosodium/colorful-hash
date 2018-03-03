/**
 * Global namespace.
 */
var CH = CH || {};

/**
 * Public interface to create a HEX encoding hash.
 * @param id SVG element id
 * @param hash hash code in string
 * @param colorA color corresponds the lowest hash character value
 * @param colorB color corresponds the highest hash character value
 */
CH.hex = function(id, hash, colorA, colorB) {
    return CH.create(id, hash, colorA, colorB, CH.ENCODING.HEX);
};

/**
 * Public interface to create a BASE64 encoding hash.
 * @param id SVG element id
 * @param hash hash code in string
 * @param colorA color corresponds the lowest hash character value
 * @param colorB color corresponds the highest hash character value
 */
CH.base64 = function(id, hash, colorA, colorB) {
    return CH.create(id, hash, colorA, colorB, CH.ENCODING.BASE64);
};

/**
 * Public interface to create a HEX encoding UUID.
 * @param id SVG element id
 * @param uuid a UUID string
 * @param colorA color corresponds the lowest hash character value
 * @param colorB color corresponds the highest hash character value
 */
CH.uuid = function(id, uuid, colorA, colorB) {
    var hash = uuid.replace(new RegExp('-', 'g'), '');
    return CH.create(id, hash, colorA, colorB, CH.ENCODING.HEX);
};

/**
 * Delegate function to create element.
 */
CH.create = function(id, hash, colorA, colorB, encoding) {
    var h = new CH.Hash(hash, encoding);
    var ca = CH.Color.fromString(colorA);
    var cb = CH.Color.fromString(colorB);
    var s = CH.Scheme.twoColorLinear(encoding, ca, cb);
    var e = new CH.Element(id, s, h);
    e. draw();
    return e;
};