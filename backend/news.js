let cache = null;
let lastFetch = 0;

async function getNews() {
  if (cache && Date.now() - lastFetch < 5 * 60 * 1000) {
    return cache;
  }

  const res = await fetch(
    "https://newsapi.org/v2/everything?q=football&language=en&pageSize=10",
    {
      headers: { "X-Api-Key": process.env.FOOTBALL_API_KEY }
    }
  );

  const data = await res.json();

  cache = data.articles.map(a => ({
    title: a.title,
    image: a.urlToImage,
    source: a.source.name,
    time: "Just now"
  }));

  lastFetch = Date.now();
  return cache;
}

module.exports = getNews;