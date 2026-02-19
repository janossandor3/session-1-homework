import { useState } from 'react'
import type { Movie } from '../../types'
import { useI18n } from '../../../../i18n/useI18n'
import { MovieItem } from '../MovieItem/MovieItem'
import { CategoryFilter } from '../CategoryFilter/CategoryFilter'
import './MovieList.css'

interface MovieListProps {
  movies: Movie[]
  onEditMovie: (movie: Movie) => void
  onDeleteMovie: (id: string) => void
}

export function MovieList({ movies, onEditMovie, onDeleteMovie }: MovieListProps) {
  const { localized } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState('')
  const filteredMovies = selectedCategory
    ? movies.filter((movie) => movie.category === selectedCategory)
    : movies

  return (
    <div>
      <h2>{localized('list.title')} ({filteredMovies.length})</h2>

      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {filteredMovies.length === 0 ? (
        <p>{localized('list.empty')}</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onEdit={onEditMovie}
              onDelete={onDeleteMovie}
            />
          ))}
        </div>
      )}
    </div>
  )
}
