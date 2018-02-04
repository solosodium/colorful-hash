/* colorful.hash.js */
var coha;

(coha = coha || {}).color = {
    Color: function(a, o, r, n) {
        this.r = a, this.g = o, this.b = r, this.a = n || 1;
    },
    Range: function(a, o) {
        this.min = a, this.max = o;
    },
    Mapping: function(a, o) {
        this.range = a, this.color = o;
    },
    create: function(a, o) {
        for (var r = [], n = 0; n < o.length; n++) for (var h = o[n], c = h.range.min; c <= h.range.max; c++) r[c] = h.color;
        return r;
    }
}, (coha = coha || {}).ENCODING = {
    HEX: "hex",
    BASE64: "base64"
}, coha.CHARSET = {
    HEX: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ],
    BASE64: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", " q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]
}, coha.RANGE = {
    HEX: {
        MIN: 0,
        MAX: coha.CHARSET.HEX.length - 1,
        LENGTH: coha.CHARSET.HEX.length
    },
    BASE64: {
        MIN: 0,
        MAX: coha.CHARSET.BASE64.length - 1,
        LENGTH: coha.CHARSET.BASE64.length
    }
}, coha.UUID_REGEX = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"), 
coha.MSG_PREFIX = "[coha] ", coha.MSG_LEVEL = 3, (coha = coha || {}).hash = {
    isValid: function(a, o) {
        if ("string" != typeof a && !(a instanceof String)) return coha.msg.error("Hash '" + a + "' is not a string."), 
        !1;
        switch (o) {
          case coha.ENCODING.HEX:
            a = a.toLowerCase();
            for (var r = 0; r < a.length; r++) if (coha.CHARSET.HEX.indexOf(a.charAt(r)) < 0) return coha.msg.error("'" + a + "' is invalid HEX hash."), 
            !1;
            break;

          case coha.ENCODING.BASE64:
            for (var n = 0; n < a.length; n++) if (coha.CHARSET.BASE64.indexOf(a.charAt(n)) < 0) return coha.msg.error("'" + a + "' is invalid BASE64 hash."), 
            !1;
            break;

          default:
            return coha.msg.error("Unknown encoding '" + o + "'."), !1;
        }
        return !0;
    },
    toNumbers: function(a, o) {
        var r = [];
        switch (o) {
          case coha.ENCODING.HEX:
            for (var n = 0; n < a.length; n++) r.push(coha.CHARSET.HEX.indexOf(a.charAt(n)));
            break;

          case coha.ENCODING.BASE64:
            for (n = 0; n < a.length; n++) r.push(coha.CHARSET.BASE64.indexOf(a.charAt(n)));
            break;

          default:
            return coha.msg.error("Unknown encoding '" + o + "'."), [];
        }
        return r;
    }
}, (coha = coha || {}).msg = {
    log: function(a) {
        coha.MSG_LEVEL > 2 && console.log(coha.MSG_PREFIX + a);
    },
    warn: function(a) {
        coha.MSG_LEVEL > 1 && console.warn(coha.MSG_PREFIX + a);
    },
    error: function(a) {
        coha.MSG_LEVEL > 0 && console.error(coha.MSG_PREFIX + a);
    }
}, (coha = coha || {}).uuid = {
    isValid: function(a) {
        if ("string" != typeof a && !(a instanceof String)) return coha.msg.error("UUID '" + a + "' is not a string."), 
        !1;
        var o = a.match(coha.UUID_REGEX);
        return !(!o || 0 === o.length) || (coha.msg.error("UUID '" + a + "' doesn't match format."), 
        !1);
    },
    toHash: function(a) {
        return a.replace(new RegExp("-", "g"), "");
    }
};