import './App.css'
import { useMovies } from './features/movies'
import type { Movie } from './features/movies'
import { MovieForm } from './features/movies/components/MovieForm'
import { MovieList } from './features/movies/components/MovieList'

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

export default App
