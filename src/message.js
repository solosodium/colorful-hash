var coha = coha || {};

coha.message = {

    PREFIX: '[colorful.hash]: ',

    log: function(msg) {
        console.log(this.PREFIX + msg);
    },

    warn: function(msg) {
        console.warn(this.PREFIX + msg);
    },

    error: function(msg) {
        console.error(this.PREFIX + msg);
    }
};
