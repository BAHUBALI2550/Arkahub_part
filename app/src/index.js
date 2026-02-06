const { fetchAllDevices } = require("./services/device");

function generateSerialNumbers(count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(`SN-${String(i).padStart(3, "0")}`);
  }
  return list;
}

(async function main() {
  const serialNumbers = generateSerialNumbers(500);

  console.log("Starting device data aggregation...");
  const startTime = Date.now();

  const results = await fetchAllDevices(serialNumbers);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`Completed in ${duration}s`);
  console.log(`Fetched records: ${results.length}`);

  // Example: aggregated report
  const onlineCount = results.filter((r) => r.status === "Online").length;
  const offlineCount = results.length - onlineCount;

  console.log("Summary:");
  console.log("Online:", onlineCount);
  console.log("Offline:", offlineCount);
})();
