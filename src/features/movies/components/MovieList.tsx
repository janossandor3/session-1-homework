import type { Movie } from '../types'
import { useI18n } from '../../../i18n/useI18n'
import { MovieItem } from './MovieItem'

interface MovieListProps {
  movies: Movie[]
  onEditMovie: (movie: Movie) => void
  onDeleteMovie: (id: string) => void
}

export function MovieList({ movies, onEditMovie, onDeleteMovie }: MovieListProps) {
  const { t } = useI18n()

  return (
    <div>
      <h2>{t('list.title')} ({movies.length})</h2>
      {movies.length === 0 ? (
        <p>{t('list.empty')}</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} onEdit={onEditMovie} onDelete={onDeleteMovie} />
          ))}
        </div>
      )}
    </div>
  )
}
