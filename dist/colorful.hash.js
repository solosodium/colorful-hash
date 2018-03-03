/* colorful.hash.js */
var CH = CH || {};

CH.hex = function(t, n, i, e) {
    var r = new CH.Element(t);
};

(function() {
    CH.ENCODING = {
        HEX: "hex",
        BASE64: "base64"
    };
    CH.CHARSET = {
        HEX: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ],
        BASE64: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", " q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]
    };
    CH.UUID_REGEX = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$");
    CH.MSG_PREFIX = "[colorful-hash] ";
    CH.MSG_LEVEL = 3;
    CH.EXCEPTION_PREFIX = "Exception: ";
})();

(function() {
    CH.Exception = function() {};
    CH.Exception.throw = function(t) {
        throw CH.EXCEPTION_PREFIX + t;
    };
})();

(function() {
    CH.Msg = function() {};
    CH.Msg.log = function(t) {
        if (CH.MSG_LEVEL > 2) {
            console.log(CH.MSG_PREFIX + t);
        }
    };
    CH.Msg.warn = function(t) {
        if (CH.MSG_LEVEL > 1) {
            console.warn(CH.MSG_PREFIX + t);
        }
    };
    CH.Msg.error = function(t) {
        if (CH.MSG_LEVEL > 0) {
            console.error(CH.MSG_PREFIX + t);
        }
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
    CH.Hash = function(t, n) {
        if (!CH.Util.isString(t)) {
            CH.Exception.throw("Hash '" + t + "' is not a string.");
        }
        var i = t.replace(new RegExp(" ", "g"), "");
        switch (n) {
          case CH.ENCODING.HEX:
            i = i.toLowerCase();
            for (var e = 0; e < i.length; e++) {
                if (CH.CHARSET.HEX.indexOf(i.charAt(e)) < 0) {
                    CH.Exception.throw("'" + t + "' is invalid HEX hash.");
                }
            }
            break;

          case CH.ENCODING.BASE64:
            i = i.replace(new RegExp("=", "g"), "");
            for (var r = 0; r < i.length; r++) {
                if (CH.CHARSET.BASE64.indexOf(i.charAt(r)) < 0) {
                    CH.Exception.throw("'" + t + "' is invalid BASE64 hash.");
                }
            }
            break;

          default:
            CH.Exception.throw("Unknown encoding '" + n + "'.");
        }
        this.raw = t;
        this.encoding = n;
        this.processed = i;
    };
    CH.Hash.prototype.toNumbers = function() {
        var t = [];
        switch (this.encoding) {
          case CH.ENCODING.HEX:
            for (var n = 0; n < this.processed.length; n++) {
                t.push(CH.CHARSET.HEX.indexOf(this.processed.charAt(n)));
            }
            break;

          case CH.ENCODING.BASE64:
            for (var i = 0; i < this.processed.length; i++) {
                t.push(CH.CHARSET.BASE64.indexOf(this.processed.charAt(i)));
            }
            break;

          default:
            CH.Msg.error("Unknown encoding '" + encoding + "'.");
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
    CH.Uuid = function(t) {
        this.uuid = "";
        if (!(typeof t === "string") && !(t instanceof String)) {
            CH.Exception.throw("UUID '" + t + "' is not a string.");
        }
        var n = t.match(CH.UUID_REGEX);
        if (!n || n.length === 0) {
            CH.Exception.throw("UUID '" + t + "' doesn't match format.");
        }
        this.uuid = t;
    };
    CH.Uuid.prototype.toHash = function() {
        return new CH.Hash(this.uuid.replace(new RegExp("-", "g"), ""), CH.ENCODING.HEX);
    };
})();

(function() {
    CH.Range = function(t, n) {
        this.left = 0;
        this.right = 0;
        if (!CH.Util.isNumber(t)) {
            CH.Exception.throw("Left bound '" + t + "' is not a number.");
        }
        if (!CH.Util.isNumber(n)) {
            CH.Exception.throw("Right bound '" + n + "' is not a number.");
        }
        if (t >= n) {
            CH.Exception.throw("Right bound '" + n + "' is not larger than left bound '" + t + "'.");
        }
        this.left = t;
        this.right = n;
    };
    CH.Range.prototype.containsValue = function(t) {
        if (!CH.Util.isNumber(t)) {
            CH.Msg.error("Value '" + t + "' is not a number.");
            return false;
        }
        return t >= this.left && t < this.right;
    };
    CH.Range.prototype.containsRange = function(t) {
        if (!CH.Util.isRange(t)) {
            CH.Msg.error("Range '" + JSON.stringify(t) + "' is not a range.");
            return false;
        }
        return t.left >= this.left && t.right <= this.right;
    };
})();

(function() {
    CH.Color = function(t, n, i, e) {
        if (!CH.Util.isRGBAValue(t)) {
            CH.Exception.throw("Red '" + t + "' is not a valid value. Should between 0 and 1.");
        }
        if (!CH.Util.isRGBAValue(n)) {
            CH.Exception.throw("Green '" + n + "' is not a valid value. Should between 0 and 1.");
        }
        if (!CH.Util.isRGBAValue(i)) {
            CH.Exception.throw("Blue '" + i + "' is not a valid value. Should between 0 and 1.");
        }
        this.r = t;
        this.g = n;
        this.b = i;
        if (e) {
            if (!CH.Util.isRGBAValue(e)) {
                CH.Exception.throw("Alpha '" + e + "' is not a valid value. Should between 0 and 1.");
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
        var n;
        n = t.match(/^#([0-9a-f]{3})$/i);
        if (n && n.length > 1) {
            return new CH.Color(parseInt(n[1].charAt(0), 16) * 17 / 255, parseInt(n[1].charAt(1), 16) * 17 / 255, parseInt(n[1].charAt(2), 16) * 17 / 255);
        }
        n = t.match(/^#([0-9a-f]{6})$/i);
        if (n && n.length > 1) {
            return new CH.Color(parseInt(n[1].substring(0, 2), 16) / 255, parseInt(n[1].substring(2, 4), 16) / 255, parseInt(n[1].substring(4, 6), 16) / 255);
        }
        n = t.match(/^rgb\s*\(\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*\)$/i);
        if (n && n.length > 3) {
            return new CH.Color(Math.min(Math.max(n[1], 0), 255) / 255, Math.min(Math.max(n[2], 0), 255) / 255, Math.min(Math.max(n[3], 0), 255) / 255);
        }
        n = t.match(/^rgba\s*\(\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*,\s*(\d+|\d*.\d+)\s*\)$/i);
        if (n && n.length > 4) {
            return new CH.Color(Math.min(Math.max(n[1], 0), 255) / 255, Math.min(Math.max(n[2], 0), 255) / 255, Math.min(Math.max(n[3], 0), 255) / 255, Math.min(Math.max(n[4], 0), 1));
        }
        CH.Exception.throw("Invalid color string '" + t + "'.");
    };
    console.log(CH.Color.fromString("#3af"));
    console.log(CH.Color.fromString("#3aff34"));
    console.log(CH.Color.fromString("rgb(40, 255, 127.5)"));
    console.log(CH.Color.fromString("rgba(.2, 255, 127.5, .23)"));
    CH.Color.fromString("abcdf");
})();

(function() {
    CH.Map = function(t, n) {
        if (!CH.Util.isRange(t)) {
            CH.Exception.throw("Invalid range '" + JSON.stringify(t) + "'.");
        }
        if (!CH.Util.isColor(n)) {
            CH.Exception.throw("Invalid color '" + JSON.stringify(n) + "'.");
        }
        this.range = t;
        this.color = n;
    };
})();

(function() {
    CH.Scheme = function(t) {
        this.defaultColor = new CH.Color(0, 0, 0);
        this.range = new CH.Range(0, 1);
        this.maps = [];
        switch (t) {
          case CH.ENCODING.HEX:
            this.range.right = CH.CHARSET.HEX.length;
            break;

          case CH.ENCODING.BASE64:
            this.range.right = CH.CHARSET.BASE64.length;
            break;

          default:
            CH.Msg.error("Unknown encoding '" + t + "'.");
            break;
        }
        for (var n = this.range.left; n < this.range.right; n++) {
            this.maps.push(new CH.Map(new CH.Range(n, n + 1), CH.Color.copy(this.defaultColor)));
        }
    };
    CH.Scheme.prototype.addMap = function(t) {
        if (!CH.Util.isMap(t)) {
            CH.Msg.error("Invalid map '" + JSON.stringify(t) + "'.");
            return;
        }
        if (!this.range.containsRange(t.range)) {
            CH.Msg.error("Map '" + JSON.stringify(t) + "' is out of scheme's range.");
            return;
        }
        for (var n = 0; n < this.maps.length; n++) {
            if (t.range.containsRange(this.maps[n].range)) {
                this.maps[n].color = CH.Color.copy(t.color);
            }
        }
    };
    CH.Scheme.prototype.getColor = function(t) {
        if (!CH.Util.isNumber(t)) {
            CH.Msg.error("Value '" + t + "' is not a number.");
            return CH.Color.copy(this.defaultColor);
        }
        for (var n = 0; n < this.maps.length; n++) {
            if (this.maps[n].range.containsValue(t)) {
                return CH.Color.copy(this.maps[n].color);
            }
        }
        return new CH.Color.copy(this.defaultColor);
    };
    CH.Scheme.twoColorLinear = function(t, n, i) {
        if (!CH.Util.isColor(n)) {
            CH.Msg.error("Invalid colorA '" + JSON.stringify(n) + "'.");
            return;
        }
        if (!CH.Util.isColor(i)) {
            CH.Msg.error("Invalid colorB '" + JSON.stringify(i) + "'.");
            return;
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
            CH.Msg.error("Unknown encoding '" + t + "'.");
            return;
        }
        var r = new CH.Scheme(CH.ENCODING.HEX);
        for (var o = 0; o < e; o++) {
            r.addMap(new CH.Map(new CH.Range(o, o + 1), new CH.Color(n.r + (i.r - n.r) * o / (e - 1), n.g + (i.g - n.g) * o / (e - 1), n.b + (i.b - n.b) * o / (e - 1), n.a + (i.a - n.a) * o / (e - 1))));
        }
        return r;
    };
})();

(function() {
    CH.Element = function(t, n, i) {
        if (!CH.Util.isString(t)) {
            CH.Exception.throw("Element id '" + t + "' is not a string.");
        }
        this.id = t;
        this.element = document.getElementById(t);
        if (CH.Util.isNullOrUndefined(this.element)) {
            CH.Exception.throw("Can't find element with id '" + t + "'.");
        }
        if (!CH.Util.isScheme(n)) {
            CH.Exception.throw("Invalid scheme '" + JSON.stringify(n) + "'.");
        }
        this.scheme = n;
        if (!CH.Util.isHash(i)) {
            CH.Exception.throw("Invalid hash '" + JSON.stringify(i) + "'.");
        }
        this.hash = i;
    };
    CH.Element.prototype.draw = function() {
        var t = this.hash.toNumbers();
        for (var n = 0; n < t.length; n++) {
            var i = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            i.setAttribute("x", 100 / t.length * n + "%");
            i.setAttribute("y", 0);
            i.setAttribute("width", 100 / t.length * 1.02 + "%");
            i.setAttribute("height", "100%");
            i.setAttribute("fill", this.scheme.getColor(t[n]).toRGBAString());
            this.element.appendChild(i);
        }
    };
})();