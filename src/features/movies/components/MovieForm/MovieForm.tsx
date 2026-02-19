import { useState, useEffect } from 'react'
import type { Movie } from '../../types'
import { useI18n } from '../../../../i18n/useI18n'
import './MovieForm.css'

interface MovieFormProps {
  editingMovie: Movie | null
  onAddMovie: (movie: Movie) => void
  onUpdateMovie: (movie: Movie) => void
  onCancel: () => void
}

export function MovieForm({ editingMovie, onAddMovie, onUpdateMovie, onCancel }: MovieFormProps) {
  const { localized } = useI18n()

  const [formData, setFormData] = useState({
    title: '',
    rating: '',
    category: '',
    description: '',
  })

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        rating: String(editingMovie.rating),
        category: editingMovie.category,
        description: editingMovie.description,
      })
    } else {
      setFormData({ title: '', rating: '', category: '', description: '' })
    }
  }, [editingMovie])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formData.title.trim() || !formData.category.trim() || !formData.rating) {
      alert(localized('form.validation'))
      return
    }

    if (editingMovie) {
      onUpdateMovie({
        id: editingMovie.id,
        title: formData.title,
        rating: Number(formData.rating),
        category: formData.category,
        description: formData.description,
      })
    } else {
      const newMovie: Movie = {
        id: crypto.randomUUID(),
        title: formData.title,
        rating: Number(formData.rating),
        category: formData.category,
        description: formData.description,
      }
      onAddMovie(newMovie)
    }

    setFormData({ title: '', rating: '', category: '', description: '' })
  }

  return (
    <div>
      <h2>{editingMovie ? localized('form.editTitle') : localized('form.addTitle')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">{localized('form.labels.movieTitle')}</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder={localized('form.placeholders.movieTitle')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">{localized('form.labels.rating')}</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="10"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">{localized('form.labels.category')}</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">{localized('form.options.selectCategory')}</option>
            <option value="action">{localized('form.options.action')}</option>
            <option value="drama">{localized('form.options.drama')}</option>
            <option value="comedy">{localized('form.options.comedy')}</option>
            <option value="horror">{localized('form.options.horror')}</option>
            <option value="romance">{localized('form.options.romance')}</option>
            <option value="scifi">{localized('form.options.scifi')}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">{localized('form.labels.description')}</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder={localized('form.placeholders.description')}
            rows={4}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            {editingMovie ? localized('form.saveButton') : localized('form.addButton')}
          </button>
          {editingMovie && (
            <button type="button" className="cancel-button" onClick={onCancel}>
              {localized('form.cancelButton')}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

