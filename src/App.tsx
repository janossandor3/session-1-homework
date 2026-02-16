import './App.css'
import { useMovies } from './features/movies'
import type { Movie } from './features/movies'
import { MovieForm } from './features/movies/components/MovieForm'
import { MovieList } from './features/movies/components/MovieList'
import { useI18n } from './i18n/useI18n'

function App() {
  const { movies, setMovies } = useMovies()
  const { t } = useI18n()

  const handleAddMovie = (newMovie: Movie) => {
    setMovies([...movies, newMovie])
  }

  return (
    <div className="container">
      <h1>{t('app.title')}</h1>
      <div className="app-layout">
        <div className="form-section">
          <MovieForm onAddMovie={handleAddMovie} />
        </div>
        <div className="list-section">
          <MovieList movies={movies} />
        </div>
      </div>
    </div>
  )
}

export default App
