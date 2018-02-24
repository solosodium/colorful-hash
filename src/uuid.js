(function() {

    /**
     * UUID class.
     * @param uuid string of a valid UUID
     * @constructor
     */
    CH.Uuid = function (uuid) {
        // Set default value to be empty string.
        this.uuid = '';
        // Expect uuid to be a string.
        if (!(typeof uuid === 'string') && !(uuid instanceof String)) {
            CH.Msg.error("UUID '" + uuid + "' is not a string.");
            return;
        }
        var match = uuid.match(CH.UUID_REGEX);
        if (!match || match.length === 0) {
            CH.Msg.error("UUID '" + uuid + "' doesn't match format.");
            return;
        }
        // Cache uuid.
        this.uuid = uuid;
    };

    /**
     * Gets processed version (remove '-') of UUID.
     * @return {string}
     */
    CH.Uuid.prototype.toHash = function() {
        return this.uuid.replace(new RegExp('-', 'g'), '');
    };

    /** Simple tests. */
    // var uuid_invalid_1 = new CH.Uuid(1);
    // var uuid_invalid_2 = new CH.Uuid('ae');
    // var uuid_invalid_3 = new CH.Uuid('123e4567-e89b-12d3-a456-42665544000x');
    // var uuid_valid = new CH.Uuid('123e4567-e89b-12d3-a456-426655440000');
    // console.log(uuid_valid.toHash());

})();
