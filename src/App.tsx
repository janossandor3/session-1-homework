import './App.css'
import { useState } from 'react'
import { useMovies } from './features/movies'
import type { Movie } from './features/movies'
import { MovieForm } from './features/movies/components/MovieForm'
import { MovieList } from './features/movies/components/MovieList'
import { useI18n } from './i18n/useI18n'

function App() {
  const { movies, setMovies } = useMovies()
  const { t } = useI18n()
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)

  const handleAddMovie = (newMovie: Movie) => {
    setMovies([...movies, newMovie])
    setEditingMovie(null)
  }

  const handleUpdateMovie = (updatedMovie: Movie) => {
    setMovies(movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)))
    setEditingMovie(null)
  }

  const handleDeleteMovie = (id: string) => {
    setMovies(movies.filter((movie) => movie.id !== id))
  }

  const handleEditClick = (movie: Movie) => {
    setEditingMovie(movie)
  }

  const handleCancelEdit = () => {
    setEditingMovie(null)
  }

  return (
    <div className="container">
      <h1>{t('app.title')}</h1>
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
