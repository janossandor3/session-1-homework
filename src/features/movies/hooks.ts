import { useState, useEffect } from 'react'
import type { Movie } from './types'

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies')
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
  }, [movies])

  return { movies, setMovies }
}
