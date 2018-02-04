var coha = coha || {};

(function() {

    coha.msg = {

        log: function(msg) {
            if (coha.MSG_LEVEL > 2) {
                console.log(coha.MSG_PREFIX + msg);
            }
        },

        warn: function(msg) {
            if (coha.MSG_LEVEL > 1) {
                console.warn(coha.MSG_PREFIX + msg);
            }
        },

        error: function(msg) {
            if (coha.MSG_LEVEL > 0) {
                console.error(coha.MSG_PREFIX + msg);
            }
        }
    };

})();
