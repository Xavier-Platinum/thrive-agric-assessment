const Queue = require('bull');
const model = require('#root/src/domain/inventory/model.js');
const { suggest } = require('#root/src/shared/utils/matcher.js');

const dupQueue = new Queue('dup-check', process.env.REDIS_URL);
dupQueue.on('completed', job => {
  console.log(`Job ${job.id} completed!`);
});

dupQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});
exports.setupJobProcessor = () => {
  dupQueue.process(async job => {
    const all = await model.find();
    const map = {};

    all.forEach(item => {
      const suggestion = suggest(item.name);
      map[suggestion] = map[suggestion] || [];
      map[suggestion].push(item);
    });

    for (const [key, list] of Object.entries(map)) {
      if (list.length > 1) {
        console.log(`🔍 Duplicate candidates for "${key}":`, list.map(i => i.name));
      }
    }
  });

  setInterval(() => {
    dupQueue.add({});
  }, 1000 * 60 * 5); // every 5 min
};
