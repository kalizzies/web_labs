import { useState } from 'react'
import './App.css'

function App() {
  const [articles, setArticles] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event){
    event.preventDefault()
    const newArticle = { 
      id: Date.now(),
      title: title,
      content: content
    }
    setArticles([...articles, newArticle])
    setTitle('')
    setContent('')
  }

  async function handleFetchPosts() {
    setLoading(true)
    setError('')
    try{
      const response=await fetch('https://jsonplaceholder.typicode.com/posts')
      if(!response.ok){
        throw new Error('Ошибка при загрузке публикаций')
      }
      const data=await response.json()
      setPosts(data)
    } catch {
      setError("Не удалось загрузить публикации. Попробуйте еще раз.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header>
        <h1>Моя вики</h1>
      </header>

      <main>
        <section>
          <h2>Добавить статью</h2>

          <form id="article-form" onSubmit={handleSubmit}>
            <label htmlFor="article-title">Заголовок:</label>
            <input
              type="text"
              id="article-title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <label htmlFor="article-content">Содержание:</label>
            <textarea
              id="article-content"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />

            <button type="submit">Добавить статью</button>
          </form>
        </section>

        <section>
          <h2>Мои статьи</h2>
          <ul id="article-list">
            {articles.map((article)=>(
              <li key={article.id}>
                <article>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p> 
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Публикации JSONPlaceholder</h2>
          <button type="button" id="fetch-posts" onClick={handleFetchPosts} disabled={loading}>
            Загрузить публикации
          </button>

          {loading && <p>Загрузка...</p>}
          {error && <p role="alert">{error}</p>}

          <ul id="api-posts">
            {posts.map((post)=>(
              <li key={post.id}>
                <article>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p> 
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
