import type { Movie } from '../../types'
import { useI18n } from '../../../../i18n/useI18n'
import './MovieItem.css'

interface MovieItemProps {
  movie: Movie
  onEdit: (movie: Movie) => void
  onDelete: (id: string) => void
}

export function MovieItem({ movie, onEdit, onDelete }: MovieItemProps) {
  const { localized } = useI18n()

  const renderRating = (rating: number) => {
    const stars = Math.round(rating / 2)
    const emptyStars = 5 - stars
    return '⭐'.repeat(stars) + '☆'.repeat(emptyStars)
  }

  return (
    <div className="movie-item">
      <div className="movie-header">
        <h3>{movie.title}</h3>
        <span className="movie-rating">
          {renderRating(movie.rating)} {movie.rating}/10
        </span>
      </div>

      {movie.description && (
        <p className="movie-description">{movie.description}</p>
      )}

      <div className="movie-buttons">
        <span className="category-badge">{movie.category}</span>
        <div className="action-buttons">
          <button className="edit-button" onClick={() => onEdit(movie)}>
            {localized('list.editButton')}
          </button>
          <button className="delete-button" onClick={() => onDelete(movie.id)}>
            {localized('list.deleteButton')}
          </button>
        </div>
      </div>
    </div>
  )
}
