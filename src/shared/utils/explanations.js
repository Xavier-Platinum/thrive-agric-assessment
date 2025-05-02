const explanationGenerators = {
    Fertilizer: item => {
        const [, type] = item.split(' - ');
        switch (type) {
            case 'Urea':
                return 'Urea is a high‑nitrogen fertilizer (46% N) used to promote vigorous leaf and stem growth; it’s water‑soluble and quickly taken up by plants.';
            case 'NPK':
                return 'NPK fertilizers contain a balanced ratio of Nitrogen (N), Phosphorus (P), and Potassium (K), supporting overall plant health: foliage development, root growth, and fruiting.';
            default:
                return `${item} is a fertilizer product used to supply essential nutrients to crops.`;
        }
    },

    Pesticide: item => {
        const [, type] = item.split(' - ');
        if (type === 'Cypermethrin') {
            return 'Cypermethrin is a broad‑spectrum pyrethroid insecticide effective against a wide range of pests, inhibiting their nervous system and providing long‑lasting protection.';
        }
        return `${item} is a pesticide formulated to control or kill agricultural pests.`;
    },

    Herbicide: item => {
        const [, type] = item.split(' - ');
        if (type === 'Glyphosate') {
            return 'Glyphosate is a systemic, non‑selective herbicide that inhibits the EPSP synthase enzyme, blocking amino acid synthesis in weeds and grasses.';
        }
        return `${item} is a herbicide used to manage unwanted vegetation in crop fields.`;
    },

    Seed: item => {
        const [, type] = item.split(' - ');
        switch (type) {
            case 'Maize':
                return 'Maize seed produces corn plants prized for their high‑yield grain, rich in carbohydrates and used for food, feed, and industrial products.';
            case 'Rice':
                return 'Rice seed yields paddy rice, a staple cereal crop in many regions; carefully selected varieties optimize yield, taste, and climate resilience.';
            default:
                return `${item} is an agricultural seed used for sowing and crop production.`;
        }
    }
};

function generateExplanation(item) {
    const [category] = item.split(' - ');
    const gen = explanationGenerators[category];
    return gen ? gen(item) : null;
}

// 
exports.explanationGenerator = input => {
    if (typeof input === 'string') {
        return generateExplanation(input)
    } else if (Array.isArray(input)) {
        return items.map(item => ({ item, explanation: generateExplanation(item) }));
    }
};
