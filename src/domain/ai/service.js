const { suggest } = require("#root/src/shared/utils/matcher.js");

module.exports = {
    /**
     * Suggest a name based on the input
     * @param {string} input - Input string to suggest a name for
     * @returns {Promise<string>} - Suggested name
     */
    async suggestName(input) {
        // Simulate a suggestion based on the name
        return new Promise((resolve) => {
            setTimeout(() => {
                const suggestion = suggest(input);
                resolve(suggestion);
            }, 1000);
        });
    },

    /**
     * Explain the item based on its name
     * @param {string} itemName - Name of the item to explain
     * @returns {Promise<string>} - Explanation of the item
     */
    async explainItem(itemName) {
        // Simulate an explanation of the item
        return new Promise((resolve) => {
            setTimeout(() => {
                const explanation = `The item "${itemName}" is used in agricultural operations to boost productivity.`;
                resolve(explanation);
            }, 1000);
        });
    }
};
