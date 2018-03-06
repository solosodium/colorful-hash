(function() {

    /**
     * Exception class.
     * @constructor
     */
    CH.Exception = function() {
        // Do nothing.
    };

    /**
     * Throw an exception with message.
     * @param msg exception message
     */
    CH.Exception.throw = function(msg) {
        throw CH.EXCEPTION_PREFIX + msg;
    };

})();
