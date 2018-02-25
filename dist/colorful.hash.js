/* colorful.hash.js */
var CH = CH || {};

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
        return !isNaN(t) && isFinite(t);
    };
    CH.Util.isString = function(t) {
        return typeof t === "string" || t instanceof String;
    };
    CH.Util.isRGBA = function(t) {
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
    CH.Hash = function(t, e) {
        this.raw = "";
        this.processed = "";
        this.encoding = "";
        if (!CH.Util.isString(t)) {
            CH.Msg.error("Hash '" + t + "' is not a string.");
            return;
        }
        this.processed = t.replace(new RegExp(" ", "g"), "");
        switch (e) {
          case CH.ENCODING.HEX:
            this.processed = this.processed.toLowerCase();
            for (var r = 0; r < this.processed.length; r++) {
                if (CH.CHARSET.HEX.indexOf(this.processed.charAt(r)) < 0) {
                    CH.Msg.error("'" + t + "' is invalid HEX hash.");
                    return;
                }
            }
            break;

          case CH.ENCODING.BASE64:
            this.processed = this.processed.replace(new RegExp("=", "g"), "");
            for (var i = 0; i < this.processed.length; i++) {
                if (CH.CHARSET.BASE64.indexOf(this.processed.charAt(i)) < 0) {
                    CH.Msg.error("'" + t + "' is invalid BASE64 hash.");
                    return;
                }
            }
            break;

          default:
            CH.Msg.error("Unknown encoding '" + e + "'.");
            return;
        }
        this.raw = t;
        this.encoding = e;
    };
    CH.Hash.prototype.toNumbers = function() {
        var t = [];
        switch (this.encoding) {
          case CH.ENCODING.HEX:
            for (var e = 0; e < this.processed.length; e++) {
                t.push(CH.CHARSET.HEX.indexOf(this.processed.charAt(e)));
            }
            break;

          case CH.ENCODING.BASE64:
            for (var r = 0; r < this.processed.length; r++) {
                t.push(CH.CHARSET.BASE64.indexOf(this.processed.charAt(r)));
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
            CH.Msg.error("UUID '" + t + "' is not a string.");
            return;
        }
        var e = t.match(CH.UUID_REGEX);
        if (!e || e.length === 0) {
            CH.Msg.error("UUID '" + t + "' doesn't match format.");
            return;
        }
        this.uuid = t;
    };
    CH.Uuid.prototype.toHash = function() {
        return this.uuid.replace(new RegExp("-", "g"), "");
    };
})();

(function() {
    CH.Range = function(t, e) {
        this.left = 0;
        this.right = 0;
        if (!CH.Util.isNumber(t)) {
            CH.Msg.error("Left bound '" + t + "' is not a number.");
            return;
        }
        if (!CH.Util.isNumber(e)) {
            CH.Msg.error("Right bound '" + e + "' is not a number.");
            return;
        }
        if (t >= e) {
            CH.Msg.error("Right bound '" + e + "' is not larger than left bound '" + t + "'.");
            return;
        }
        this.left = t;
        this.right = e;
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
    CH.Color = function(t, e, r, i) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        if (!CH.Util.isRGBA(t)) {
            CH.Msg.error("Red '" + t + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        if (!CH.Util.isRGBA(e)) {
            CH.Msg.error("Green '" + e + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        if (!CH.Util.isRGBA(r)) {
            CH.Msg.error("Blue '" + r + "' is not a valid value. Should between 0 and 1.");
            return;
        }
        this.r = t;
        this.g = e;
        this.b = r;
        if (i) {
            if (!CH.Util.isRGBA(i)) {
                CH.Msg.error("Alpha '" + i + "' is not a valid value. Should between 0 and 1.");
                return;
            } else {
                this.a = i;
            }
        } else {
            this.a = 1;
        }
    };
    CH.Color.prototype.toRGBAString = function() {
        return "rgba(" + Math.floor(this.r * 255) + " ," + Math.floor(this.g * 255) + " ," + Math.floor(this.b * 255) + " ," + this.a + ")";
    };
    CH.Color.copy = function(t) {
        if (!CH.Util.isColor(t)) {
            CH.Msg.error("Invalid color '" + JSON.stringify(t) + "'.");
            return;
        }
        return new CH.Color(t.r, t.g, t.b, t.a);
    };
})();

(function() {
    CH.Map = function(t, e) {
        if (!CH.Util.isRange(t)) {
            CH.Msg.error("Invalid range '" + JSON.stringify(t) + "'.");
            return;
        }
        if (!CH.Util.isColor(e)) {
            CH.Msg.error("Invalid color '" + JSON.stringify(e) + "'.");
            return;
        }
        this.range = t;
        this.color = e;
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
        for (var e = this.range.left; e < this.range.right; e++) {
            this.maps.push(new CH.Map(new CH.Range(e, e + 1), CH.Color.copy(this.defaultColor)));
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
        for (var e = 0; e < this.maps.length; e++) {
            if (t.range.containsRange(this.maps[e].range)) {
                this.maps[e].color = CH.Color.copy(t.color);
            }
        }
    };
    CH.Scheme.prototype.getColor = function(t) {
        if (!CH.Util.isNumber(t)) {
            CH.Msg.error("Value '" + t + "' is not a number.");
            return CH.Color.copy(this.defaultColor);
        }
        for (var e = 0; e < this.maps.length; e++) {
            if (this.maps[e].range.containsValue(t)) {
                return CH.Color.copy(this.maps[e].color);
            }
        }
        return new CH.Color.copy(this.defaultColor);
    };
})();

(function() {
    CH.Element = function(t, e, r) {
        if (!CH.Util.isString(t)) {
            CH.Msg.error("Element id '" + t + "' is not a string.");
            return;
        }
        this.id = t;
        this.element = document.getElementById(t);
        if (CH.Util.isNullOrUndefined(this.element)) {
            CH.Msg.error("Can't find element with id '" + t + "'.");
            return;
        }
        if (!CH.Util.isHash(e)) {
            CH.Msg.error("Invalid hash '" + JSON.stringify(e) + "'.");
            return;
        }
        this.hash = e;
        if (!CH.Util.isScheme(r)) {
            CH.Msg.error("Invalid scheme '" + JSON.stringify(r) + "'.");
            return;
        }
        this.scheme = r;
    };
    CH.Element.prototype.draw = function() {
        var t = parseInt(this.element.getAttribute("width"), 10);
        var e = this.element.getAttribute("width").replace(t.toString(), "");
        var r = this.element.getAttribute("height");
        var i = this.hash.toNumbers();
        for (var n = 0; n < i.length; n++) {
            var s = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            s.setAttribute("x", t / i.length * n + e);
            s.setAttribute("y", 0);
            s.setAttribute("width", t / i.length * 1.02 + e);
            s.setAttribute("height", r);
            s.setAttribute("fill", this.scheme.getColor(i[n]).toRGBAString());
            this.element.appendChild(s);
        }
    };
})();