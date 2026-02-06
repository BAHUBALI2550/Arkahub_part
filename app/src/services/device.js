const RateLimiter = require("../utils/rateLimit");
const { postDeviceBatch } = require("../api/energyGridApi");

const rateLimiter = new RateLimiter(1000);

async function fetchAllDevices(serialNumbers) {
  const batches = createBatches(serialNumbers, 10);
  const aggregatedResults = [];

  for (const batch of batches) {
    let success = false;
    let attempts = 0;

    while (!success && attempts < 3) {
      try {
        await rateLimiter.wait();
        const response = await postDeviceBatch(batch);
        aggregatedResults.push(...response.data);
        success = true;
      } catch (err) {
        attempts++;

        if (err.status === 429) {
          await new Promise((r) => setTimeout(r, 1000));
        } else if (attempts >= 3) {
          console.error("Failed batch:", batch, err);
        }
      }
    }
  }

  return aggregatedResults;
}

function createBatches(items, batchSize) {
  const batches = [];

  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  return batches;
}

module.exports = {
  fetchAllDevices,
};
