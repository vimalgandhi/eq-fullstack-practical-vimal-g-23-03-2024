const commonHelper = {

    validateNameString(name) {
        // Validate name: allow alphabets, spaces, and digits
        const nameRegex = /^[a-zA-Z0-9\s]*$/; // Alphabets, digits, and spaces allowed
        return nameRegex.test(name);
    },

};

module.exports = commonHelper;
