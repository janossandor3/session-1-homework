import { useState } from 'react'
import type { Movie } from '../types'
import { useI18n } from '../../../i18n/useI18n'

interface MovieFormProps {
  onAddMovie: (movie: Movie) => void
}

export function MovieForm({ onAddMovie }: MovieFormProps) {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    title: '',
    rating: 5,
    category: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const newMovie: Movie = {
      id: crypto.randomUUID(),
      created: new Date(),
      title: formData.title,
      rating: formData.rating,
      category: formData.category,
    }

    onAddMovie(newMovie)

    setFormData({ title: '', rating: 5, category: '' })
  }

  return (
    <div>
      <h2>{t('form.title')}</h2>
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

        <button type="submit">{t('form.button')}</button>
      </form>
    </div>
  )
}
