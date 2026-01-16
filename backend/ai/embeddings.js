const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const EMBEDDINGS_PATH = path.join(__dirname, "../data/embeddings.json");

async function embedTexts(texts) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "text-embedding-3-large",
      input: texts
    })
  });

  const data = await response.json();
  return data.data.map(d => d.embedding);
}

async function generateEmbeddings(items) {
  const texts = items.map(i => i.title);
  const vectors = await embedTexts(texts);

  const payload = items.map((item, i) => ({
    ...item,
    embedding: vectors[i]
  }));

  fs.writeFileSync(EMBEDDINGS_PATH, JSON.stringify(payload, null, 2));
  return payload;
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB);
}

module.exports = {
  generateEmbeddings,
  cosineSimilarity,
  EMBEDDINGS_PATH
};