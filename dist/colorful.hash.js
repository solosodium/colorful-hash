/* colorful.hash.js */
var CH = CH || {};

CH.hex = function(t, i, n, e) {
    return CH.create(t, i, n, e, CH.ENCODING.HEX);
};

CH.base64 = function(t, i, n, e) {
    return CH.create(t, i, n, e, CH.ENCODING.BASE64);
};

CH.uuid = function(t, i, n, e) {
    var r = i.replace(new RegExp("-", "g"), "");
    return CH.create(t, r, n, e, CH.ENCODING.HEX);
};

CH.create = function(t, i, n, e, r) {
    var o = new CH.Hash(i, r);
    var a = CH.Color.fromString(n);
    var s = CH.Color.fromString(e);
    var C = CH.Scheme.twoColorLinear(r, a, s);
    var h = new CH.Element(t, C, o);
    h.draw();
    return h;
};

(function() {
    CH.ENCODING = {
        HEX: "hex",
        BASE64: "base64"
    };
    CH.CHARSET = {
        HEX: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ],
        BASE64: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]
    };
    CH.EXCEPTION_PREFIX = "CH Exception: ";
})();

(function() {
    CH.Exception = function() {};
    CH.Exception.throw = function(t) {
        throw CH.EXCEPTION_PREFIX + t;
    };
})();

(function() {
    CH.Util = function() {};
    CH.Util.isNumber = function(t) {
        return typeof t === "number" && !isNaN(t) && isFinite(t);
    };
    CH.Util.isString = function(t) {
        return typeof t === "string" || t instanceof String;
    };
    CH.Util.isRGBAValue = function(t) {
        return CH.Util.isNumber(t) && (t >= 0 && t <= 1);
    };
    CH.Util.isRange = function(t) {
        return t instanceof CH.Range;
    };
    CH.Util.isColor = function(t) {
        return t instanceof CH.Color;
    };
    CH.Util.isMap = function(t) {
        return t instanceof CH.Map;
    };
    CH.Util.isScheme = function(t) {
        return t instanceof CH.Scheme;
    };
    CH.Util.isHash = function(t) {
        return t instanceof CH.Hash;
    };
    CH.Util.isNullOrUndefined = function(t) {
        return t === null || typeof t === "undefined";
    };
})();

(function() {
    CH.Hash = function(t, i) {
        if (!CH.Util.isString(t)) {
            CH.Exception.throw("Hash '" + t + "' is not a string.");
        }
        var n = t.replace(new RegExp(" ", "g"), "");
        switch (i) {
          case CH.ENCODING.HEX:
            n = n.toLowerCase();
            for (var e = 0; e < n.length; e++) {
                if (CH.CHARSET.HEX.indexOf(n.charAt(e)) < 0) {
                    CH.Exception.throw("'" + t + "' is invalid HEX hash.");
                }
            }
            break;

          case CH.ENCODING.BASE64:
            n = n.replace(new RegExp("=", "g"), "");
            for (var r = 0; r < n.length; r++) {
                if (CH.CHARSET.BASE64.indexOf(n.charAt(r)) < 0) {
                    console.log(n.charAt(r));
                    console.log(CH.CHARSET.BASE64.indexOf(n.charAt(r)));
                    CH.Exception.throw("'" + t + "' is invalid BASE64 hash.");
                }
            }
            break;

          default:
            CH.Exception.throw("Unknown encoding '" + i + "'.");
        }
        this.raw = t;
        this.encoding = i;
        this.processed = n;
    };
    CH.Hash.prototype.toNumbers = function() {
        var t = [];
        switch (this.encoding) {
          case CH.ENCODING.HEX:
            for (var i = 0; i < this.processed.length; i++) {
                t.push(CH.CHARSET.HEX.indexOf(this.processed.charAt(i)));
            }
            break;

          case CH.ENCODING.BASE64:
            for (var n = 0; n < this.processed.length; n++) {
                t.push(CH.CHARSET.BASE64.indexOf(this.processed.charAt(n)));
            }
            break;

          default:
            CH.Exception.throw("Unknown encoding '" + encoding + "'.");
            return [];
            break;
        }
        return t;
    };
    CH.Hash.prototype.toCharacters = function() {
        return Array.from(this.processed);
    };
})();

(function() {
    CH.Range = function(t, i) {
        this.left = 0;
        this.right = 0;
        if (!CH.Util.isNumber(t)) {
            CH.Exception.throw("Left bound '" + t + "' is not a number.");
        }
        if (!CH.Util.isNumber(i)) {
            CH.Exception.throw("Right bound '" + i + "' is not a number.");
        }
        if (t >= i) {
            CH.Exception.throw("Right bound '" + i + "' is not larger than left bound '" + t + "'.");
        }
        this.left = t;
        this.right = i;
    };
    CH.Range.prototype.containsValue = function(t) {
        if (!CH.Util.isNumber(t)) {
            CH.Exception.throw("Value '" + t + "' is not a number.");
        }
        return t >= this.left && t < this.right;
    };
    CH.Range.prototype.containsRange = function(t) {
        if (!CH.Util.isRange(t)) {
            CH.Exception.throw("Range '" + JSON.stringify(t) + "' is not a range.");
        }
        return t.left >= this.left && t.right <= this.right;
    };
})();

(function() {
    CH.Color = function(t, i, n, e) {
        if (!CH.Util.isRGBAValue(t)) {
            CH.Exception.throw("Red '" + t + "' is not a valid color value..");
        }
        if (!CH.Util.isRGBAValue(i)) {
            CH.Exception.throw("Green '" + i + "' is not a valid color value.");
        }
        if (!CH.Util.isRGBAValue(n)) {
            CH.Exception.throw("Blue '" + n + "' is not a valid color value.");
        }
        this.r = t;
        this.g = i;
        this.b = n;
        if (e) {
            if (!CH.Util.isRGBAValue(e)) {
                CH.Exception.throw("Alpha '" + e + "' is not a valid color value.");
            }
            this.a = e;
        } else {
            this.a = 1;
        }
    };
    CH.Color.prototype.toRGBAString = function() {
        return "rgba(" + Math.floor(this.r * 255) + " ," + Math.floor(this.g * 255) + " ," + Math.floor(this.b * 255) + " ," + this.a + ")";
    };
    CH.Color.copy = function(t) {
        if (!CH.Util.isColor(t)) {
            CH.Exception.throw("Invalid color '" + JSON.stringify(t) + "'.");
        }
        return new CH.Color(t.r, t.g, t.b, t.a);
    };
    CH.Color.fromString = function(t) {
        var i;
        i = t.match(/^#([0-9a-f]{3})$/i);
        if (i && i.length > 1) {
            return new CH.Color(parseInt(i[1].charAt(0), 16) * 17 / 255, parseInt(i[1].charAt(1), 16) * 17 / 255, parseInt(i[1].charAt(2), 16) * 17 / 255);
        }
        i = t.match(/^#([0-9a-f]{6})$/i);
        if (i && i.length > 1) {
            return new CH.Color(parseInt(i[1].substring(0, 2), 16) / 255, parseInt(i[1].substring(2, 4), 16) / 255, parseInt(i[1].substring(4, 6), 16) / 255);
        }
        i = t.match(/^rgb\s*\(\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*\)$/i);
        if (i && i.length > 3) {
            return new CH.Color(Math.min(Math.max(i[1], 0), 255) / 255, Math.min(Math.max(i[2], 0), 255) / 255, Math.min(Math.max(i[3], 0), 255) / 255);
        }
        i = t.match(/^rgba\s*\(\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*\)$/i);
        if (i && i.length > 4) {
            return new CH.Color(Math.min(Math.max(i[1], 0), 255) / 255, Math.min(Math.max(i[2], 0), 255) / 255, Math.min(Math.max(i[3], 0), 255) / 255, Math.min(Math.max(i[4], 0), 1));
        }
        CH.Exception.throw("Invalid color string '" + t + "'.");
    };
})();

(function() {
    CH.Map = function(t, i) {
        if (!CH.Util.isRange(t)) {
            CH.Exception.throw("Invalid range '" + JSON.stringify(t) + "'.");
        }
        if (!CH.Util.isColor(i)) {
            CH.Exception.throw("Invalid color '" + JSON.stringify(i) + "'.");
        }
        this.range = t;
        this.color = i;
    };
})();

(function() {
    CH.Scheme = function(t) {
        this.range = new CH.Range(0, 1);
        switch (t) {
          case CH.ENCODING.HEX:
            this.range.right = CH.CHARSET.HEX.length;
            break;

          case CH.ENCODING.BASE64:
            this.range.right = CH.CHARSET.BASE64.length;
            break;

          default:
            CH.Exception.throw("Unknown encoding '" + t + "'.");
        }
        this.maps = [];
        for (var i = this.range.left; i < this.range.right; i++) {
            this.maps.push(new CH.Map(new CH.Range(i, i + 1), CH.Color.copy(new CH.Color(0, 0, 0))));
        }
    };
    CH.Scheme.prototype.addMap = function(t) {
        if (!CH.Util.isMap(t)) {
            CH.Exception.throw("Invalid map '" + JSON.stringify(t) + "'.");
        }
        if (!this.range.containsRange(t.range)) {
            CH.Exception.throw("Map '" + JSON.stringify(t) + "' is out of scheme's range.");
        }
        for (var i = 0; i < this.maps.length; i++) {
            if (t.range.containsRange(this.maps[i].range)) {
                this.maps[i].color = CH.Color.copy(t.color);
            }
        }
    };
    CH.Scheme.prototype.getColor = function(t) {
        if (!CH.Util.isNumber(t)) {
            CH.Exception.throw("Value '" + t + "' is not a number.");
        }
        for (var i = 0; i < this.maps.length; i++) {
            if (this.maps[i].range.containsValue(t)) {
                return CH.Color.copy(this.maps[i].color);
            }
        }
        CH.Exception.throw("Value '" + t + "' is not in scheme range.");
    };
    CH.Scheme.twoColorLinear = function(t, i, n) {
        if (!CH.Util.isColor(i)) {
            CH.Exception.throw("Invalid colorA '" + JSON.stringify(i) + "'.");
        }
        if (!CH.Util.isColor(n)) {
            CH.Exception.throw("Invalid colorB '" + JSON.stringify(n) + "'.");
        }
        var e = 0;
        switch (t) {
          case CH.ENCODING.HEX:
            e = CH.CHARSET.HEX.length;
            break;

          case CH.ENCODING.BASE64:
            e = CH.CHARSET.BASE64.length;
            break;

          default:
            CH.Exception.throw("Unknown encoding '" + t + "'.");
        }
        var r = new CH.Scheme(t);
        for (var o = 0; o < e; o++) {
            r.addMap(new CH.Map(new CH.Range(o, o + 1), new CH.Color(i.r + (n.r - i.r) * o / (e - 1), i.g + (n.g - i.g) * o / (e - 1), i.b + (n.b - i.b) * o / (e - 1), i.a + (n.a - i.a) * o / (e - 1))));
        }
        return r;
    };
})();

(function() {
    CH.Element = function(t, i, n) {
        if (!CH.Util.isString(t)) {
            CH.Exception.throw("Element id '" + t + "' is not a string.");
        }
        this.id = t;
        this.element = document.getElementById(t);
        if (CH.Util.isNullOrUndefined(this.element)) {
            CH.Exception.throw("Can't find element with id '" + t + "'.");
        }
        if (!CH.Util.isScheme(i)) {
            CH.Exception.throw("Invalid scheme '" + JSON.stringify(i) + "'.");
        }
        this.scheme = i;
        if (!CH.Util.isHash(n)) {
            CH.Exception.throw("Invalid hash '" + JSON.stringify(n) + "'.");
        }
        this.hash = n;
    };
    CH.Element.prototype.draw = function() {
        while (this.element.lastChild) {
            this.element.removeChild(this.element.lastChild);
        }
        var t = this.hash.toNumbers();
        var i = 0;
        for (var n = 0; n < t.length; n++) {
            var e = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            e.setAttribute("x", i + "%");
            var r = 100 / t.length * (n + 1);
            e.setAttribute("y", 0 + "%");
            e.setAttribute("width", (r - i) * 1.05 + "%");
            e.setAttribute("height", "100%");
            e.setAttribute("fill", this.scheme.getColor(t[n]).toRGBAString());
            this.element.appendChild(e);
            i = r;
        }
    };
})();