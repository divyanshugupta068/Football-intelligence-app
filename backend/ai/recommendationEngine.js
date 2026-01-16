const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/* -------------------------------- */
/* EMBEDDING CACHE */
/* -------------------------------- */
const CACHE_PATH = path.join(__dirname, "../data/embeddingCache.json");

let embeddingCache = {};
if (fs.existsSync(CACHE_PATH)) {
  embeddingCache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
}

function saveCache() {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(embeddingCache, null, 2));
}

/* -------------------------------- */
/* ---------- EMBEDDING ---------- */
/* -------------------------------- */
async function embed(text) {
  if (embeddingCache[text]) {
    return embeddingCache[text];
  }

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "text-embedding-3-large",
      input: text
    })
  });

  const data = await res.json();
  const vector = data.data[0].embedding;

  embeddingCache[text] = vector;
  saveCache();

  return vector;
}

/* -------------------------------- */
/* ---------- COSINE SIMILARITY ---------- */
/* -------------------------------- */
function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/* -------------------------------- */
/* ---------- GPT EXPLANATION ---------- */
/* -------------------------------- */
async function explain(item, profile) {
  try {
    const prompt = `
User interests:
${profile.join(", ")}

Content:
${item.title}

Explain in one short sentence why this is relevant.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Recommended based on your interests.";
  } catch (err) {
    return "Recommended based on your interests.";
  }
}

/* -------------------------------- */
/* ---------- MAIN RECOMMENDER ---------- */
/* -------------------------------- */
async function recommend(news, userProfile) {
  if (!news || !news.length) return [];

  const profileEmbedding = await embed(userProfile.join(" "));

  const scored = [];

  for (const item of news) {
    const emb = await embed(item.title);
    const score = cosineSimilarity(profileEmbedding, emb);

    scored.push({ ...item, score });
  }

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 6);

  for (const item of top) {
    item.reason = await explain(item, userProfile);
  }

  return top;
}

module.exports = { recommend };