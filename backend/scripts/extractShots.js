const fs = require("fs");
const path = require("path");

const EVENTS_DIR = path.join(__dirname, "../data/raw/events");
const OUTPUT_FILE = path.join(__dirname, "../data/processed/shots.json");

const shots = [];

function normalizeX(x) {
  return x / 120; // StatsBomb pitch length
}

function normalizeY(y) {
  return y / 80; // StatsBomb pitch width
}

const files = fs.readdirSync(EVENTS_DIR);

files.forEach(file => {
  const filePath = path.join(EVENTS_DIR, file);
  const events = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  events.forEach(e => {
    if (e.type?.name === "Shot" && e.location && e.shot) {
      shots.push({
        player: e.player?.name || "Unknown",
        team: e.team?.name || "Unknown",
        x: normalizeX(e.location[0]),
        y: normalizeY(e.location[1]),
        xG: e.shot.statsbomb_xg || 0,
        outcome: e.shot.outcome?.name || "Unknown",
        bodyPart: e.shot.body_part?.name || "Unknown",
        matchId: e.match_id || null
      });
    }
  });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(shots, null, 2));

console.log(`✅ Extracted ${shots.length} shots`);
console.log(`📁 Saved to ${OUTPUT_FILE}`);
