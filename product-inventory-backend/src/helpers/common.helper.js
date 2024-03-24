const commonHelper = {

    validateNameString(name) {
        // Validate name: no special characters allowed
        const nameRegex = /^[a-zA-Z\s]*$/; // Only alphabets and spaces allowed
        return nameRegex.test(name);
    },

};

module.exports = commonHelper;
