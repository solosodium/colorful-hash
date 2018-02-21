/* colorful.hash.js */
var ColorfulHash = ColorfulHash || {};

ColorfulHash.ENCODING = {
    HEX: "hex",
    BASE64: "base64"
}, ColorfulHash.CHARSET = {
    HEX: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ],
    BASE64: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", " q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]
}, ColorfulHash.UUID_REGEX = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"), 
ColorfulHash.MSG_PREFIX = "[colorful-hash] ", ColorfulHash.MSG_LEVEL = 3, ColorfulHash.DOM = "colorful-hash", 
ColorfulHash.Msg = function() {}, ColorfulHash.Msg.log = function(o) {
    ColorfulHash.MSG_LEVEL > 2 && console.log(ColorfulHash.MSG_PREFIX + o);
}, ColorfulHash.Msg.warn = function(o) {
    ColorfulHash.MSG_LEVEL > 1 && console.warn(ColorfulHash.MSG_PREFIX + o);
}, ColorfulHash.Msg.error = function(o) {
    ColorfulHash.MSG_LEVEL > 0 && console.error(ColorfulHash.MSG_PREFIX + o);
}, ColorfulHash.Util = function() {}, ColorfulHash.Util.isNumber = function(o) {
    return !isNaN(o) && isFinite(o);
}, ColorfulHash.Util.isString = function(o) {
    return "string" == typeof o || o instanceof String;
}, ColorfulHash.Util.isRGBA = function(o) {
    return ColorfulHash.Util.isNumber(o) && o >= 0 && o <= 1;
}, ColorfulHash.Util.isRange = function(o) {
    return o instanceof ColorfulHash.Range;
}, ColorfulHash.Util.isColor = function(o) {
    return o instanceof ColorfulHash.Color;
}, ColorfulHash.Hash = function(o, r) {
    if (this.hash = "", this.processed = "", this.encoding = "", ColorfulHash.Util.isString(o)) {
        switch (this.processed = o.replace(new RegExp(" ", "g"), ""), r) {
          case ColorfulHash.ENCODING.HEX:
            this.processed = this.processed.toLowerCase();
            for (var s = 0; s < this.processed.length; s++) if (ColorfulHash.CHARSET.HEX.indexOf(this.processed.charAt(s)) < 0) return void ColorfulHash.Msg.error("'" + o + "' is invalid HEX hash.");
            break;

          case ColorfulHash.ENCODING.BASE64:
            this.processed = this.processed.replace(new RegExp("=", "g"), "");
            for (var l = 0; l < this.processed.length; l++) if (ColorfulHash.CHARSET.BASE64.indexOf(this.processed.charAt(l)) < 0) return void ColorfulHash.Msg.error("'" + o + "' is invalid BASE64 hash.");
            break;

          default:
            return void ColorfulHash.Msg.error("Unknown encoding '" + r + "'.");
        }
        this.hash = o, this.encoding = r;
    } else ColorfulHash.Msg.error("Hash '" + o + "' is not a string.");
}, ColorfulHash.Hash.prototype.toNumbers = function() {
    var o = [];
    switch (this.encoding) {
      case ColorfulHash.ENCODING.HEX:
        for (var r = 0; r < this.processed.length; r++) o.push(ColorfulHash.CHARSET.HEX.indexOf(this.processed.charAt(r)));
        break;

      case ColorfulHash.ENCODING.BASE64:
        for (var s = 0; s < this.processed.length; s++) o.push(ColorfulHash.CHARSET.BASE64.indexOf(this.processed.charAt(s)));
        break;

      default:
        return ColorfulHash.Msg.error("Unknown encoding '" + encoding + "'."), [];
    }
    return o;
}, ColorfulHash.Uuid = function(o) {
    if (this.uuid = "", "string" == typeof o || o instanceof String) {
        var r = o.match(ColorfulHash.UUID_REGEX);
        r && 0 !== r.length ? this.uuid = o : ColorfulHash.Msg.error("UUID '" + o + "' doesn't match format.");
    } else ColorfulHash.Msg.error("UUID '" + o + "' is not a string.");
}, ColorfulHash.Uuid.prototype.toHash = function() {
    return this.uuid.replace(new RegExp("-", "g"), "");
}, ColorfulHash.Range = function(o, r) {
    this.left = 0, this.right = 0, ColorfulHash.Util.isNumber(o) ? ColorfulHash.Util.isNumber(r) ? o > r ? ColorfulHash.Msg.error("Left bound '" + o + "' is larger than right bound '" + r + "'.") : (this.left = o, 
    this.right = r) : ColorfulHash.Msg.error("Right bound '" + r + "' is not a number.") : ColorfulHash.Msg.error("Left bound '" + o + "' is not a number.");
}, ColorfulHash.Range.prototype.contains = function(o) {
    return ColorfulHash.Util.isNumber(o) ? o >= this.left && o <= this.right : (ColorfulHash.Msg.error("Value '" + o + "' is not a number."), 
    !1);
}, function() {
    ColorfulHash.Color = function(o, r, s, l) {
        if (this.r = 0, this.g = 0, this.b = 0, this.a = 0, ColorfulHash.Util.isRGBA(o)) if (ColorfulHash.Util.isRGBA(r)) if (ColorfulHash.Util.isRGBA(s)) if (this.r = o, 
        this.g = r, this.b = s, l) {
            if (!ColorfulHash.Util.isRGBA(l)) return void ColorfulHash.Msg.error("Alpha '" + l + "' is not a valid value. Should between 0 and 1.");
            this.a = l;
        } else this.a = 1; else ColorfulHash.Msg.error("Blue '" + s + "' is not a valid value. Should between 0 and 1."); else ColorfulHash.Msg.error("Green '" + r + "' is not a valid value. Should between 0 and 1."); else ColorfulHash.Msg.error("Red '" + o + "' is not a valid value. Should between 0 and 1.");
    };
    var o = new ColorfulHash.Color(.5, .1, .3, .9);
    console.log(o);
    var r = new ColorfulHash.Color(.5, .1, .3);
    console.log(r);
}(), ColorfulHash.Map = function(o, r) {
    ColorfulHash.Util.isRange(o) ? ColorfulHash.Util.isColor(r) ? (this.range = o, this.color = r) : ColorfulHash.Msg.error("Invalid color '" + r + "'.") : ColorfulHash.Msg.error("Invalid range '" + o + "'.");
}, ColorfulHash.Element = function(o) {
    this.element = document.getElementById(o);
};