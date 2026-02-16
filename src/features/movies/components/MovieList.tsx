import type { Movie } from '../types'
import { useI18n } from '../../../i18n/useI18n'

interface MovieListProps {
  movies: Movie[]
}

export function MovieList({ movies }: MovieListProps) {
  const { t } = useI18n()

  return (
    <div>
      <h2>{t('list.title')} ({movies.length})</h2>
      {movies.length === 0 ? (
        <p>{t('list.empty')}</p>
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
