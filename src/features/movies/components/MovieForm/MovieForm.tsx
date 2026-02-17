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
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    title: '',
    rating: 5,
    category: '',
    description: '',
  })

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        rating: editingMovie.rating,
        category: editingMovie.category,
        description: editingMovie.description,
      })
    } else {
      setFormData({ title: '', rating: 5, category: '', description: '' })
    }
  }, [editingMovie])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.category.trim()) {
      alert(t('form.validation'))
      return
    }

    if (editingMovie) {
      onUpdateMovie({
        id: editingMovie.id,
        title: formData.title,
        rating: formData.rating,
        category: formData.category,
        description: formData.description,
      })
    } else {
      const newMovie: Movie = {
        id: crypto.randomUUID(),
        title: formData.title,
        rating: formData.rating,
        category: formData.category,
        description: formData.description,
      }
      onAddMovie(newMovie)
    }

    setFormData({ title: '', rating: 5, category: '', description: '' })
  }

  return (
    <div>
      <h2>{editingMovie ? t('form.editTitle') : t('form.addTitle')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">{t('form.labels.movieTitle')}</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder={t('form.placeholders.movieTitle')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">{t('form.labels.rating')}</label>
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
          <label htmlFor="category">{t('form.labels.category')}</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">{t('form.options.selectCategory')}</option>
            <option value="action">{t('form.options.action')}</option>
            <option value="drama">{t('form.options.drama')}</option>
            <option value="comedy">{t('form.options.comedy')}</option>
            <option value="horror">{t('form.options.horror')}</option>
            <option value="romance">{t('form.options.romance')}</option>
            <option value="scifi">{t('form.options.scifi')}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">{t('form.labels.description')}</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder={t('form.placeholders.description')}
            rows={4}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            {editingMovie ? t('form.saveButton') : t('form.addButton')}
          </button>
          {editingMovie && (
            <button type="button" className="cancel-button" onClick={onCancel}>
              {t('form.cancelButton')}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
