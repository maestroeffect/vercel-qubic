import { useEffect, useState } from "react";
import Parser from "rss-parser";

const QubicwebFeed = () => {
  const [articles, setArticles] = useState([]);
  const parser = new Parser();
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // Replace with your Qubicbox RSS feed URL
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const feedUrl = "https://yourqubicboxdomain.com/feed/rss";
        const response = await fetch(
          `${proxyUrl}${encodeURIComponent(feedUrl)}`
        );
        const { contents } = await response.json();

        const feed = await parser.parseString(contents);
        setArticles(feed.items);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div>
      <h1>Qubicbox Articles</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.contentSnippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QubicwebFeed;
