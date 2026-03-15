const fs = require("fs/promises");

function getHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

const MAX_PER_DOMAIN = 2;

async function main() {
  const raw = await fs.readFile("relics.json", "utf8");
  const relics = JSON.parse(raw);

  const domainCounts = new Map();
  const filtered = [];

  for (const item of relics) {
    const url = item.url || item;
    const hostname = getHostname(url);

    if (!hostname) continue;

    const count = domainCounts.get(hostname) || 0;

    if (count >= MAX_PER_DOMAIN) continue;

    domainCounts.set(hostname, count + 1);
    filtered.push(typeof item === "string" ? { url } : item);
  }

  await fs.writeFile("relics.json", JSON.stringify(filtered, null, 2), "utf8");

  console.log(`Kept ${filtered.length} URLs across ${domainCounts.size} domains.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});