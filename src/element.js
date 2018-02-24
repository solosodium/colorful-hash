(function() {

    /**
     * Element class.
     * @param id
     * @param hash
     * @param scheme
     * @constructor
     */
    CH.Element = function(id, hash, scheme) {
        this.id = 0;
        this.hash = null;
        this.scheme = null;
        if (!CH.Util.isString(id)) {
            CH.Msg.error("Element id '" + id + "' is not a string.");
            return;
        }


        this.element = document.getElementById(id);
    };

})();