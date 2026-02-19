import './App.css'
import { useMovies, useEditingMovie } from './features/movies'
import type { Movie } from './features/movies'
import { MovieForm } from './features/movies/components/MovieForm/MovieForm'
import { MovieList } from './features/movies/components/MovieList/MovieList'
import { useI18n } from './i18n/useI18n'

function App() {
  const { movies, setMovies } = useMovies()
  const { editingMovie, startEditing, stopEditing } = useEditingMovie()
  const { localized } = useI18n()

  function handleAddMovie(newMovie: Movie) {
    setMovies([...movies, newMovie])
    stopEditing()
  }
 
  function handleUpdateMovie(updatedMovie: Movie) {
    setMovies(movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)))
    stopEditing()
  }

  function handleDeleteMovie(id: string) {
    setMovies(movies.filter((movie) => movie.id !== id))
  }

  function handleEditClick(movie: Movie) {
    startEditing(movie)
  }

  function handleCancelEdit() {
    stopEditing()
  }

  return (
    <div className="container">
      <h1>{localized('app.title')}</h1>
      <div className="app-layout">
        <div className="form-section">
          <MovieForm
            editingMovie={editingMovie}
            onAddMovie={handleAddMovie}
            onUpdateMovie={handleUpdateMovie}
            onCancel={handleCancelEdit}
          />
        </div>
        <div className="list-section">
          <MovieList
            movies={movies}
            onEditMovie={handleEditClick}
            onDeleteMovie={handleDeleteMovie}
          />
        </div>
      </div>
    </div>
  )
}

export default App
