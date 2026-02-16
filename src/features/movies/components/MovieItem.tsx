import type { Movie } from '../types'
import { useI18n } from '../../../i18n/useI18n'

interface MovieItemProps {
  movie: Movie
}

export function MovieItem({ movie }: MovieItemProps) {
  const { t } = useI18n()

  const renderRating = (rating: number) => {
    const stars = Math.round(rating / 2)
    const emptyStars = 5 - stars
    return '⭐'.repeat(stars) + '☆'.repeat(emptyStars)
  }

  return (
    <div className="movie-item">
      <div className="movie-header">
        <h3>{movie.title}</h3>
        <span className="movie-rating">{renderRating(movie.rating)} {movie.rating}/10</span>
      </div>
      <div className="movie-category">
        <span className="category-badge">{movie.category}</span>
      </div>
    </div>
  )
}
