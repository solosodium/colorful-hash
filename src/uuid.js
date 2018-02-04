var coha = coha || {};

(function() {

    coha.uuid = {

        /**
         * Check if UUID is valid.
         * @param uuid input UUID
         * @return {boolean}
         */
        isValid: function(uuid) {
            // Expect uuid to be a string.
            if (!(typeof uuid === 'string') && !(uuid instanceof String)) {
                coha.msg.error("UUID '" + uuid + "' is not a string.");
                return false;
            }
            var match = uuid.match(coha.UUID_REGEX);
            if (!match || match.length === 0) {
                coha.msg.error("UUID '" + uuid + "' doesn't match format.");
                return false;
            }
            return true;
        },

        /**
         * Convert UUID to hash (without '-').
         * @param uuid input UUID
         * @return {string}
         */
        toHash: function(uuid) {
            return uuid.replace(new RegExp('-', 'g'), '');
        }

    };

})();
