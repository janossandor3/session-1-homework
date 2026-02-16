import type { Movie } from '../types'
import { useI18n } from '../../../i18n/useI18n'
import { MovieItem } from './MovieItem'

interface MovieListProps {
  movies: Movie[]
  onDeleteMovie: (id: string) => void
}

export function MovieList({ movies, onDeleteMovie }: MovieListProps) {
  const { t } = useI18n()

  return (
    <div>
      <h2>{t('list.title')} ({movies.length})</h2>
      {movies.length === 0 ? (
        <p>{t('list.empty')}</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} onDelete={onDeleteMovie} />
          ))}
        </div>
      )}
    </div>
  )
}
