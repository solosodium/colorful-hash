// Global namespaces.
var coha = coha || {};

coha.hash = {

    /**
     * Check if a hash string is valid.
     * @param hash input hash string
     * @return {boolean} if hash string is valid
     */
    parse: function(hash, encoding) {
        // Expect hash to be a string.
        if (!(typeof hash === 'string') && !(hash instanceof String)) {
            coha.message.error("Hash " + hash + " is not a string.");
        }
        // Check if encoding is available.
        if (!encoding) {
            return true;
        }
    }
};