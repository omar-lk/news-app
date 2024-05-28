// App.js
import { useEffect, useState } from 'react'
import './App.css'
import { translateToArabic } from './translation-helpers/translate-to-arabic'

const categories = [
  'business',
  'crime',
  'domestic',
  'education',
  'entertainment',
  'environment',
  'food',
  'health',
  'lifestyle',
  'other',
  'politics',
  'science',
  'sports',
  'technology',
  'top',
  'tourism',
  'world'
]

function App() {
  const [articles, setArticles] = useState([])
  const [language, setLanguage] = useState('en')
  const [category, setCategory] = useState('sports')

  useEffect(() => {
    fetch(
      `https://newsdata.io/api/1/news?apikey=pub_450211b5965a7f7db0e3f76eb2c40d99dc815&q=Breaking%20News&language=${language}&category=${category}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setArticles(res.results)
        localStorage.setItem(
          `${language}-${category}-articles`,
          JSON.stringify(res.results)
        )
        if (language === 'ar') {
          translateToArabic(res.results)
        }
      })
      .catch((error) => console.log('err', error))
  }, [language, category])

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Latest News</h1>
        <div className="controls">
          <div className="language-switcher">
            <button onClick={() => handleLanguageChange('en')}>EN</button>
            <button onClick={() => handleLanguageChange('ar')}>AR</button>
          </div>
          <div className="category-selector">
            <select onChange={handleCategoryChange} value={category}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
      <main>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.article_id} className="article">
              <h2>{article.title}</h2>
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="article-image"
                />
              )}
              <p>{article.description}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              <p>
                <strong>Category:</strong>{' '}
                {article.category ? article.category.join(', ') : 'N/A'}
              </p>
              <p>
                <strong>Published on:</strong>{' '}
                {new Date(article.pubDate).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>Loading articles...</p>
        )}
      </main>
    </div>
  )
}

export default App
