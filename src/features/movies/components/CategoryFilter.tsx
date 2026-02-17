import { useI18n } from '../../../i18n/useI18n'

const CATEGORY_EMOJIS: Record<string, string> = {
  action: '💥',
  drama: '🎭',
  comedy: '😂',
  horror: '🎃',
  romance: '💕',
  scifi: '🚀',
}

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { t } = useI18n()

  const categories = [
    { value: '', label: t('form.options.no_filter'), emoji: t('form.options.no_filter') },
    { value: 'action', label: t('form.options.action'), emoji: CATEGORY_EMOJIS.action },
    { value: 'drama', label: t('form.options.drama'), emoji: CATEGORY_EMOJIS.drama },
    { value: 'comedy', label: t('form.options.comedy'), emoji: CATEGORY_EMOJIS.comedy },
    { value: 'horror', label: t('form.options.horror'), emoji: CATEGORY_EMOJIS.horror },
    { value: 'romance', label: t('form.options.romance'), emoji: CATEGORY_EMOJIS.romance },
    { value: 'scifi', label: t('form.options.scifi'), emoji: CATEGORY_EMOJIS.scifi },
  ]

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`filter-button ${selectedCategory === category.value ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.value)}
          title={category.label}
        >
          <span className="filter-emoji">{category.emoji}</span>
        </button>
      ))}
    </div>
  )
}
