/* colorful.hash.js */
var CH = CH || {};

CH.ENCODING = {
    HEX: "hex",
    BASE64: "base64"
}, CH.CHARSET = {
    HEX: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ],
    BASE64: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", " q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]
}, CH.UUID_REGEX = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"), 
CH.MSG_PREFIX = "[colorful-hash] ", CH.MSG_LEVEL = 3, CH.Msg = function() {}, CH.Msg.log = function(e) {
    CH.MSG_LEVEL > 2 && console.log(CH.MSG_PREFIX + e);
}, CH.Msg.warn = function(e) {
    CH.MSG_LEVEL > 1 && console.warn(CH.MSG_PREFIX + e);
}, CH.Msg.error = function(e) {
    CH.MSG_LEVEL > 0 && console.error(CH.MSG_PREFIX + e);
}, CH.Util = function() {}, CH.Util.isNumber = function(e) {
    return !isNaN(e) && isFinite(e);
}, CH.Util.isString = function(e) {
    return "string" == typeof e || e instanceof String;
}, CH.Util.isRGBA = function(e) {
    return CH.Util.isNumber(e) && e >= 0 && e <= 1;
}, CH.Util.isRange = function(e) {
    return e instanceof CH.Range;
}, CH.Util.isColor = function(e) {
    return e instanceof CH.Color;
}, CH.Util.isMap = function(e) {
    return e instanceof CH.Map;
}, CH.Util.isScheme = function(e) {
    return e instanceof CH.Scheme;
}, CH.Hash = function(e, r) {
    if (this.hash = "", this.processed = "", this.encoding = "", CH.Util.isString(e)) {
        switch (this.processed = e.replace(new RegExp(" ", "g"), ""), r) {
          case CH.ENCODING.HEX:
            this.processed = this.processed.toLowerCase();
            for (var n = 0; n < this.processed.length; n++) if (CH.CHARSET.HEX.indexOf(this.processed.charAt(n)) < 0) return void CH.Msg.error("'" + e + "' is invalid HEX hash.");
            break;

          case CH.ENCODING.BASE64:
            this.processed = this.processed.replace(new RegExp("=", "g"), "");
            for (var t = 0; t < this.processed.length; t++) if (CH.CHARSET.BASE64.indexOf(this.processed.charAt(t)) < 0) return void CH.Msg.error("'" + e + "' is invalid BASE64 hash.");
            break;

          default:
            return void CH.Msg.error("Unknown encoding '" + r + "'.");
        }
        this.hash = e, this.encoding = r;
    } else CH.Msg.error("Hash '" + e + "' is not a string.");
}, CH.Hash.prototype.toNumbers = function() {
    var e = [];
    switch (this.encoding) {
      case CH.ENCODING.HEX:
        for (var r = 0; r < this.processed.length; r++) e.push(CH.CHARSET.HEX.indexOf(this.processed.charAt(r)));
        break;

      case CH.ENCODING.BASE64:
        for (var n = 0; n < this.processed.length; n++) e.push(CH.CHARSET.BASE64.indexOf(this.processed.charAt(n)));
        break;

      default:
        return CH.Msg.error("Unknown encoding '" + encoding + "'."), [];
    }
    return e;
}, CH.Uuid = function(e) {
    if (this.uuid = "", "string" == typeof e || e instanceof String) {
        var r = e.match(CH.UUID_REGEX);
        r && 0 !== r.length ? this.uuid = e : CH.Msg.error("UUID '" + e + "' doesn't match format.");
    } else CH.Msg.error("UUID '" + e + "' is not a string.");
}, CH.Uuid.prototype.toHash = function() {
    return this.uuid.replace(new RegExp("-", "g"), "");
}, CH.Range = function(e, r) {
    this.left = 0, this.right = 0, CH.Util.isNumber(e) ? CH.Util.isNumber(r) ? e >= r ? CH.Msg.error("Right bound '" + r + "' is not larger than left bound '" + e + "'.") : (this.left = e, 
    this.right = r) : CH.Msg.error("Right bound '" + r + "' is not a number.") : CH.Msg.error("Left bound '" + e + "' is not a number.");
}, CH.Range.prototype.containsValue = function(e) {
    return CH.Util.isNumber(e) ? e >= this.left && e < this.right : (CH.Msg.error("Value '" + e + "' is not a number."), 
    !1);
}, CH.Range.prototype.containsRange = function(e) {
    return CH.Util.isRange(e) ? e.left >= this.left && e.right <= this.right : (CH.Msg.error("Range '" + JSON.stringify(e) + "' is not a range."), 
    !1);
}, CH.Color = function(e, r, n, t) {
    if (this.r = 0, this.g = 0, this.b = 0, this.a = 0, CH.Util.isRGBA(e)) if (CH.Util.isRGBA(r)) if (CH.Util.isRGBA(n)) if (this.r = e, 
    this.g = r, this.b = n, t) {
        if (!CH.Util.isRGBA(t)) return void CH.Msg.error("Alpha '" + t + "' is not a valid value. Should between 0 and 1.");
        this.a = t;
    } else this.a = 1; else CH.Msg.error("Blue '" + n + "' is not a valid value. Should between 0 and 1."); else CH.Msg.error("Green '" + r + "' is not a valid value. Should between 0 and 1."); else CH.Msg.error("Red '" + e + "' is not a valid value. Should between 0 and 1.");
}, CH.Color.copy = function(e) {
    if (CH.Util.isColor(e)) return new CH.Color(e.r, e.g, e.b, e.a);
    CH.Msg.error("Invalid color '" + JSON.stringify(e) + "'.");
}, CH.Map = function(e, r) {
    CH.Util.isRange(e) ? CH.Util.isColor(r) ? (this.range = e, this.color = r) : CH.Msg.error("Invalid color '" + JSON.stringify(r) + "'.") : CH.Msg.error("Invalid range '" + JSON.stringify(e) + "'.");
}, function() {
    CH.Scheme = function(e) {
        switch (this.defaultColor = new CH.Color(0, 0, 0), this.range = new CH.Range(0, 1), 
        this.maps = [], e) {
          case CH.ENCODING.HEX:
            this.range.right = CH.CHARSET.HEX.length;
            break;

          case CH.ENCODING.BASE64:
            this.range.right = CH.CHARSET.BASE64.length;
            break;

          default:
            CH.Msg.error("Unknown encoding '" + e + "'.");
        }
        for (var r = this.range.left; r < this.range.right; r++) this.maps.push(new CH.Map(new CH.Range(r, r + 1), CH.Color.copy(this.defaultColor)));
    }, CH.Scheme.prototype.addMap = function(e) {
        if (CH.Util.isMap(e)) if (this.range.containsRange(e.range)) for (var r = 0; r < this.maps.length; r++) e.range.containsRange(this.maps[r].range) && (this.maps[r].color = CH.Color.copy(e.color)); else CH.Msg.error("Map '" + JSON.stringify(e) + "' is out of scheme's range."); else CH.Msg.error("Invalid map '" + JSON.stringify(e) + "'.");
    }, CH.Scheme.prototype.getColor = function(e) {
        if (!CH.Util.isNumber(e)) return CH.Msg.error("Value '" + e + "' is not a number."), 
        CH.Color.copy(this.defaultColor);
        for (var r = 0; r < this.maps.length; r++) if (this.maps[r].range.containsValue(e)) return CH.Color.copy(this.maps[r].color);
        return new CH.Color.copy(this.defaultColor);
    };
    var e = new CH.Scheme(CH.ENCODING.HEX);
    e.addMap(new CH.Map(new CH.Range(4, 7), new CH.Color(1, 0, 0))), e.addMap(new CH.Map(new CH.Range(0, 3), new CH.Color(0, 1, 0))), 
    e.addMap(new CH.Map(new CH.Range(6, 9), new CH.Color(0, 0, 1))), console.log(JSON.stringify(e.maps)), 
    console.log(e.getColor(8));
}(), CH.Element = function(e) {
    this.element = document.getElementById(e);
}, CH.Element.setScheme;