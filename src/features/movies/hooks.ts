import { useState, useEffect } from 'react'
import type { Movie } from './types'

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('movies')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
  }, [movies])

  return { movies, setMovies }
}

export function useEditingMovie() {
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  
  function startEditing(movie: Movie) {
    setEditingMovie(movie)
  }

  function stopEditing() {
    setEditingMovie(null)
  }

  return { editingMovie, startEditing, stopEditing }
}