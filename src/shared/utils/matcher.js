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
  const term = input.trim().toLowerCase();
  if (!term) return null;

  const exact = knownItems.find(it => it.toLowerCase() === term);
  if (exact) return exact;

  const substring = knownItems.find(it => it.toLowerCase().includes(term));
  if (substring) return substring;

  let best = null;
  let bestScore = Infinity;

  for (const item of knownItems) {
    const lower = item.toLowerCase();
    const dist  = distance(term, lower);

    const score = dist / Math.max(term.length, lower.length);
    if (score < bestScore) {
      bestScore  = score;
      best       = item;
    }
  }

  return best;
};
