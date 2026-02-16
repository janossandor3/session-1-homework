import type { Movie } from '../types'

interface MovieListProps {
  movies: Movie[]
}

export function MovieList({ movies }: MovieListProps) {
  return (
    <div>
      <h2>Filmek ({movies.length})</h2>
      {movies.length === 0 ? (
        <p>Nincs még film a katalógusban.</p>
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
