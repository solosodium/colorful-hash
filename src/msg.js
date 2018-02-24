(function() {

    /**
     * Message class.
     * @constructor
     */
    CH.Msg = function() {
        /** Do nothing. */
    };

    /**
     * Log.
     * @param msg log message
     */
    CH.Msg.log = function(msg) {
        if (CH.MSG_LEVEL > 2) {
            console.log(CH.MSG_PREFIX + msg);
        }
    };

    /**
     * Warn.
     * @param msg warning message
     */
    CH.Msg.warn = function(msg) {
        if (CH.MSG_LEVEL > 1) {
            console.warn(CH.MSG_PREFIX + msg);
        }
    };

    /**
     * Error.
     * @param msg error message
     */
    CH.Msg.error = function(msg) {
        if (CH.MSG_LEVEL > 0) {
            console.error(CH.MSG_PREFIX + msg);
        }
    };

    /** Simple tests. */
    // CH.Msg.log("What");
    // CH.Msg.warn("What");
    // CH.Msg.error("What");

})();
