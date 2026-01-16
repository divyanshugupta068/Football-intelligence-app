require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const { recommend } = require("./ai/recommendationEngine");
const comparePlayer = require("./ai/playerComparison");

const topSeedFallback = require("./data/seed/topNews.json");
const transferSeed = require("./data/seed/transferNews.json");
const forYouSeed = require("./data/seed/forYou.json");

console.log("🔥 FOOTBALL INTELLIGENCE BACKEND STARTING");
console.log("NEWS_API_KEY:", process.env.NEWS_API_KEY);
console.log("FOOTBALL_API_KEY:", process.env.FOOTBALL_API_KEY);

/* -------------------------------- */
/* APP INIT */
/* -------------------------------- */
const app = express();
app.use(cors());
app.use(express.json());

/* -------------------------------- */
/* CONSTANTS */
/* -------------------------------- */
const TEAM_MAP = {
  "Barcelona": 529,
  "Real Madrid": 541,
  "Man City": 50,
  "Arsenal": 42,
  "Bayern": 157,
  "PSG": 85
};

/* -------------------------------- */
/* LOAD STATIC DATA */
/* -------------------------------- */
const PLAYERS_PATH = path.join(__dirname, "data/players.json");
const ENHANCED_PLAYERS_PATH = path.join(__dirname, "data/enhanced_players.json");
const VALUATION_PATH = path.join(__dirname, "data/player_valuation.json");
const SHOTS_PATH = path.join(__dirname, "data/processed/shots.json");
const USERS_PATH = path.join(__dirname, "data/users.json");

let PLAYERS = [];
let ENHANCED_PLAYERS = [];
let PLAYER_VALUATION = [];
let shots = [];
let users = {};

try {
  PLAYERS = JSON.parse(fs.readFileSync(PLAYERS_PATH, "utf-8"));
  PLAYER_VALUATION = JSON.parse(fs.readFileSync(VALUATION_PATH, "utf-8"));
  shots = JSON.parse(fs.readFileSync(SHOTS_PATH, "utf-8"));

  // Load enhanced players
  if (fs.existsSync(ENHANCED_PLAYERS_PATH)) {
    ENHANCED_PLAYERS = JSON.parse(fs.readFileSync(ENHANCED_PLAYERS_PATH, "utf-8"));
    console.log("✅ Enhanced players loaded:", ENHANCED_PLAYERS.length);
  }

  if (fs.existsSync(USERS_PATH)) {
    users = JSON.parse(fs.readFileSync(USERS_PATH, "utf-8"));
  }

  console.log("✅ Players loaded:", PLAYERS.length);
  console.log("✅ Player valuations loaded:", PLAYER_VALUATION.length);
  console.log("✅ Shots loaded:", shots.length);
} catch (e) {
  console.error("❌ Data load error:", e);
}

/* -------------------------------- */
/* ROOT */
/* -------------------------------- */
app.get("/", (req, res) => {
  res.send("Football Intelligence API running ⚽");
});

/* -------------------------------- */
/* HELPERS */
/* -------------------------------- */

// Load FIFA attributes
const FIFA_ATTRIBUTES = require("./data/fifa_attributes");

function computeAttributes(player) {
  const playerName = player.player || player;

  // Use FIFA database if available
  if (typeof playerName === 'string' && FIFA_ATTRIBUTES[playerName]) {
    return FIFA_ATTRIBUTES[playerName];
  }

  // Fallback to calculated attributes (for any players not in FIFA database)
  const pace = Math.min(99, (player.shotsPer90 || 0) * 12);
  const dribbling = Math.min(99, (player.avgXGPerShot || 0) * 140);
  const shooting = Math.min(99, (player.totalXG || 0) * 2);
  const passing = Math.min(99, (player.xGPer90 || 0) * 15);
  const defending = Math.min(99, 30 + (player.matches || 0));
  const physical = Math.min(99, 40 + (player.matches || 0) * 1.5);

  const overall = Math.round(
    pace * 0.15 +
    dribbling * 0.2 +
    shooting * 0.25 +
    passing * 0.2 +
    defending * 0.1 +
    physical * 0.1
  );

  return { pace, dribbling, shooting, passing, defending, physical, overall };
}

/* -------------------------------- */
/* PLAYERS */
/* -------------------------------- */
app.get("/players", (req, res) => {
  const map = {};

  shots.forEach(s => {
    if (!map[s.player]) {
      map[s.player] = {
        player: s.player,
        club: s.team || null,
        shots: 0,
        totalXG: 0,
        matches: new Set()
      };
    }
    map[s.player].shots++;
    map[s.player].totalXG += s.xG;
    if (s.match_id) map[s.player].matches.add(s.match_id);
  });

  const result = Object.values(map).map(p => {
    const matches = p.matches.size || 1;
    const minutes = matches * 90;

    const base = {
      player: p.player,
      club: p.club,
      shots: p.shots,
      totalXG: p.totalXG,
      matches,
      shotsPer90: (p.shots / minutes) * 90,
      xGPer90: (p.totalXG / minutes) * 90,
      avgXGPerShot: p.shots ? p.totalXG / p.shots : 0
    };

    const attributes = computeAttributes(base);
    return { ...base, attributes, overall: attributes.overall };
  });

  res.json(result);
});

/* -------------------------------- */
/* ENHANCED PLAYERS WITH LEAGUES */
/* -------------------------------- */
app.get("/players/enhanced", (req, res) => {
  const { league } = req.query;

  // Merge enhanced players with shot data
  const enhancedWithAttributes = ENHANCED_PLAYERS.map(p => {
    const attributes = computeAttributes(p); // Pass full player object
    return {
      ...p,
      attributes,
      overall: attributes.overall
    };
  });

  // Filter by league if specified
  if (league && league !== 'all') {
    const filtered = enhancedWithAttributes.filter(p =>
      p.league.toLowerCase() === league.toLowerCase()
    );
    return res.json(filtered);
  }

  res.json(enhancedWithAttributes);
});

/* -------------------------------- */
/* GET LEAGUES */
/* -------------------------------- */
app.get("/leagues", (req, res) => {
  const leagues = [...new Set(ENHANCED_PLAYERS.map(p => p.league))];
  res.json(leagues);
});

/* -------------------------------- */
/* PLAYER DETAIL */
/* -------------------------------- */
app.get("/player/:name", (req, res) => {
  const playerName = decodeURIComponent(req.params.name);

  // First check enhanced players
  const enhancedPlayer = ENHANCED_PLAYERS.find(p => p.player === playerName);
  if (enhancedPlayer) {
    const attributes = computeAttributes(enhancedPlayer); // Pass full player object

    // Generate shot data for visualization
    const shotData = [];
    const numShots = enhancedPlayer.stats.shots || 50;
    for (let i = 0; i < Math.min(numShots, 100); i++) {
      shotData.push({
        x: Math.random() * 0.6 + 0.2,
        y: Math.random() * 0.6 + 0.2,
        xG: Math.random() * 0.3
      });
    }

    return res.json({
      ...enhancedPlayer,
      attributes,
      overall: attributes.overall,
      shots: shotData
    });
  }

  // Fallback to original shot-based data
  const playerShots = shots.filter(s => s.player === playerName);
  res.json({ shots: playerShots });
});

/* -------------------------------- */
/* AI PLAYER INSIGHTS */
/* -------------------------------- */
app.get("/ai/player/:name", (req, res) => {
  const playerName = decodeURIComponent(req.params.name);

  const player = ENHANCED_PLAYERS.find(p => p.player === playerName);
  if (!player) {
    return res.json({ insights: [] });
  }

  const attributes = computeAttributes(player); // Pass full player object
  const insights = [];

  // Generate insights based on stats
  if (player.stats.goals > 20) {
    insights.push(`Exceptional goal scorer with ${player.stats.goals} goals this season`);
  }

  if (player.stats.assists > 10) {
    insights.push(`Creative playmaker with ${player.stats.assists} assists`);
  }

  if (attributes.pace > 85) {
    insights.push("Lightning-fast pace makes them a constant threat");
  }

  if (attributes.shooting > 85) {
    insights.push("Clinical finisher with exceptional shooting ability");
  }

  if (attributes.passing > 80) {
    insights.push("Excellent vision and passing range");
  }

  if (player.stats.shotsPer90 > 4) {
    insights.push("High volume shooter, constantly testing the goalkeeper");
  }

  if (player.stats.xGPer90 > 0.8) {
    insights.push("Gets into dangerous positions regularly");
  }

  res.json({ insights });
});


/* -------------------------------- */
/* NEWS */
/* -------------------------------- */
app.get("/news/top", async (_, res) => {
  try {
    const r = await fetch(
      "https://newsapi.org/v2/top-headlines?q=football&language=en&pageSize=15",
      { headers: { "X-Api-Key": process.env.NEWS_API_KEY } }
    );
    const d = await r.json();
    if (Array.isArray(d.articles) && d.articles.length) {
      return res.json(
        d.articles.map(a => ({
          title: a.title,
          image: a.urlToImage,
          source: a.source?.name || "Football News",
          time: a.publishedAt
        }))
      );
    }
    res.json(topSeedFallback);
  } catch {
    res.json(topSeedFallback);
  }
});

app.get("/news/transfers", async (_, res) => {
  try {
    const r = await fetch(
      "https://newsapi.org/v2/everything?q=football transfer&language=en&pageSize=15",
      { headers: { "X-Api-Key": process.env.NEWS_API_KEY } }
    );
    const d = await r.json();
    if (Array.isArray(d.articles) && d.articles.length) {
      return res.json(
        d.articles.map(a => ({
          title: a.title,
          image: a.urlToImage,
          source: a.source?.name || "Transfer News",
          time: a.publishedAt
        }))
      );
    }
    res.json(transferSeed);
  } catch {
    res.json(transferSeed);
  }
});

/* -------------------------------- */
/* FOR YOU */
/* -------------------------------- */
app.get("/for-you", async (_, res) => {
  try {
    const user = users["1"] || { clubs: ["Barcelona"], interests: ["tactics"] };
    const profile = [...user.clubs, ...user.interests];

    const r = await fetch(
      "https://newsapi.org/v2/everything?q=football tactics&pageSize=25",
      { headers: { "X-Api-Key": process.env.NEWS_API_KEY } }
    );

    const d = await r.json();
    if (Array.isArray(d.articles)) {
      const candidates = d.articles.map(a => ({ title: a.title }));
      const aiFeed = await recommend(candidates, profile);
      if (aiFeed.length) return res.json(aiFeed);
    }
    res.json(forYouSeed);
  } catch {
    res.json(forYouSeed);
  }
});

/* -------------------------------- */
/* CLUB SQUAD */
/* -------------------------------- */
app.get("/club/:club/squad", async (req, res) => {
  const TEAM_MAP = {
    Barcelona: 529,
    "Real Madrid": 541,
    "Man City": 50,
    Arsenal: 42,
    Bayern: 157,
    PSG: 85
  };

  const teamId = TEAM_MAP[req.params.club];
  if (!teamId) return res.json([]);

  try {
    const r = await fetch(
      `https://v3.football.api-sports.io/players/squads?team=${teamId}`,
      {
        headers: {
          "x-apisports-key": process.env.FOOTBALL_API_KEY
        }
      }
    );

    const data = await r.json();
    const players = data.response?.[0]?.players || [];

    // Normalize for frontend
    res.json(
      players.map(p => ({
        id: p.id,
        name: p.name,
        age: p.age,
        position: p.position,
        nationality: p.nationality,
        photo: p.photo
      }))
    );
  } catch (e) {
    res.json([]);
  }
});

/* -------------------------------- */
/* STANDINGS */
/* -------------------------------- */
app.get("/standings/:league", async (req, res) => {
  const LEAGUE_MAP = {
    epl: 39,
    laliga: 140,
    bundesliga: 78,
    ligue1: 61
  };

  const leagueId = LEAGUE_MAP[req.params.league];
  if (!leagueId) return res.json([]);

  try {
    const r = await fetch(
      `https://v3.football.api-sports.io/standings?league=${leagueId}&season=2024`,
      {
        headers: {
          "x-apisports-key": process.env.FOOTBALL_API_KEY
        }
      }
    );

    const data = await r.json();
    const table = data.response?.[0]?.league?.standings?.[0] || [];

    res.json(
      table.map(t => ({
        rank: t.rank,
        team: t.team.name,
        logo: t.team.logo,
        played: t.all.played,
        points: t.points,
        goalDiff: t.goalsDiff
      }))
    );
  } catch {
    res.json([]);
  }
});

/* -------------------------------- */
/* SERVER */
/* -------------------------------- */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});