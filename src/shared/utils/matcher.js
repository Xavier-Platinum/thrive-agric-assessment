const { distance } = require('fastest-levenshtein');

const knownItems = [
  'Fertilizer - Urea',
  'Fertilizer - NPK',
  'Pesticide - Cypermethrin',
  'Herbicide - Glyphosate',
  'Seed - Maize',
  'Seed - Rice'
];

exports.suggest = input => {
  let minDist = Infinity;
  let bestMatch = null;

  for (const item of knownItems) {
    const dist = distance(input.toLowerCase(), item.toLowerCase());
    if (dist < minDist) {
      minDist = dist;
      bestMatch = item;
    }
  }

  return bestMatch;
};
