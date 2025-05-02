const { explanationGenerator } = require("#root/src/shared/utils/explanations.js");
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
     * @param {string} input - Name of the item to explain
     * @returns {Promise<string>} - Explanation of the item
     */
    async explainItem(input) {
        // Simulate an explanation of the item
        return new Promise((resolve) => {
            setTimeout(async() => {
                const explanation = await explanationGenerator(input);
                resolve(explanation);
            }, 1000);
        });
    }
};
