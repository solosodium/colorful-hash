(function() {

    /**
     * Message class.
     * @constructor
     */
    ColorfulHash.Msg = function() {
        /** Do nothing. */
    };

    /**
     * Log.
     * @param msg log message
     */
    ColorfulHash.Msg.log = function(msg) {
        if (ColorfulHash.MSG_LEVEL > 2) {
            console.log(ColorfulHash.MSG_PREFIX + msg);
        }
    };

    /**
     * Warn.
     * @param msg warning message
     */
    ColorfulHash.Msg.warn = function(msg) {
        if (ColorfulHash.MSG_LEVEL > 1) {
            console.warn(ColorfulHash.MSG_PREFIX + msg);
        }
    };

    /**
     * Error.
     * @param msg error message
     */
    ColorfulHash.Msg.error = function(msg) {
        if (ColorfulHash.MSG_LEVEL > 0) {
            console.error(ColorfulHash.MSG_PREFIX + msg);
        }
    };

    /** Simple tests. */
    // ColorfulHash.Msg.log("What");
    // ColorfulHash.Msg.warn("What");
    // ColorfulHash.Msg.error("What");

})();
