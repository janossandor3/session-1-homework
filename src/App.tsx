import { useState } from 'react'
import './App.css'
import { useMovies } from './features/movies'
import type { Movie } from './features/movies'

function App() {
  const { movies, setMovies } = useMovies()

  const handleAddMovie = (newMovie: Movie) => {
    setMovies([...movies, newMovie])
  }

  return (
    <div className="container">
      <h1>Film Katalógus</h1>
      <MovieForm onAddMovie={handleAddMovie} />
      <MovieList movies={movies} />
    </div>
  )
}

function MovieForm({ onAddMovie }: { onAddMovie: (movie: Movie) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    rating: 5,
    category: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value, // Erre ki kéne találni valamit, hogy ne legyen ilyen "if" a kódban
    }))
  }

  // Form submit - új film hozzáadása
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.category.trim()) {
      alert('Kérlek töltsd ki az összes mezőt!')
      return
    }

    const newMovie: Movie = {
      id: crypto.randomUUID(),
      created: new Date(),
      title: formData.title,
      rating: formData.rating,
      category: formData.category,
    }

    onAddMovie(newMovie)
    setFormData({ title: '', rating: 5, category: '' })
  }

  return (
    <div>
      <h2>Új Film Hozzáadása</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Cím:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Add meg a film címét..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Értékelés (0-10):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="10"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategória:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">-- Válassz kategóriát --</option>
            <option value="akcio">Akció</option>
            <option value="drama">Dráma</option>
            <option value="komediar">Komédia</option>
            <option value="horror">Horror</option>
            <option value="romantika">Romantika</option>
            <option value="scifi">Sci-Fi</option>
          </select>
        </div>

        <button type="submit">Hozzáadás</button>
      </form>
    </div>
  )
}

function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <div>
      <h2>Filmek ({movies.length})</h2>
      {movies.length === 0 ? (
        <p>Nincs még film a katalógusban.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
