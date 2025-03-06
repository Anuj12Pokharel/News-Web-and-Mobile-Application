import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
const BACKEND_URL = 'http://localhost:8000/api/news/';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');

  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get(BACKEND_URL, {
        params: { category }
      });
      // GNews API returns articles under the "articles" key.
      setNews(response.data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }, [category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Featured article is the first news item (if available)
  // Split the remaining news evenly between left and right columns
  const remainingNews = news.slice(1);
  const leftNews = remainingNews.filter((_, index) => index % 2 === 0);
  const rightNews = remainingNews.filter((_, index) => index % 2 !== 0);

  return (
    <div className="app">
      {/* Header with clickable navigation */}
      <header className="top-header">
        <div className="logo">News App</div>
        <nav className="main-nav">
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setCategory(cat)}
                className={category === cat ? 'active' : ''}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Sub-navigation bar */}
      <div className="sub-nav">
        <div className="trending-topics">
          <span>Trending:</span>
          <a href="#!">OpenAI</a>
          <a href="#!">Target boycott</a>
          <a href="#!">Emma Raducanu</a>
          <a href="#!">Tiny island 'golden'</a>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="left-column">
          {/* Featured article */}
          {news.length > 0 && (
            <div className="featured-article">
              <img
                src={news[0].image || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={news[0].title}
              />
              <h2>{news[0].title}</h2>
              <p>
                {news[0].description
                  ? news[0].description.slice(0, 150) + '...'
                  : 'No description available.'}
              </p>
              <a href={news[0].url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          )}

          {/* Other Articles in Left Column */}
          <div className="other-articles">
            {leftNews.length > 0 ? (
              leftNews.map((article, index) => (
                <div key={index} className="news-card">
                  <img
                    src={article.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={article.title}
                  />
                  <div className="news-content">
                    <h3>{article.title}</h3>
                    <p>
                      {article.description
                        ? article.description.slice(0, 100) + '...'
                        : 'No description available.'}
                    </p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-news">No more news available.</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <aside className="right-column">
          <div className="more-news">
            <h3>More News</h3>
            {rightNews.length > 0 ? (
              rightNews.map((article, index) => (
                <div key={index} className="news-card small">
                  <img
                    src={article.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={article.title}
                  />
                  <div className="news-content">
                    <h3>{article.title}</h3>
                    <p>
                      {article.description
                        ? article.description.slice(0, 100) + '...'
                        : 'No description available.'}
                    </p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No additional news available.</p>
            )}
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 News App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
