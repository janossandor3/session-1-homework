import { useState, useEffect } from 'react'
import './App.css'

interface Movie {
  id: string
  title: string
  rating: number
  category: string
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies')
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
  }, [movies])

  return (
    <div className="container">
      <h1>Film Katalógus</h1>
      <MovieForm onAddMovie={() => {}} />
      <MovieList movies={movies} />
    </div>
  )
}

function MovieForm({ onAddMovie }: { onAddMovie: () => void }) {
  return (
    <div>
      <h2>Új Film Hozzáadása</h2>
      <p>Itt lesz a forma...</p>
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
