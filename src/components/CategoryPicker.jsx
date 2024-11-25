import { motion } from 'framer-motion';

const categories = {
  income: [
    { id: 'salary', label: 'Salary', icon: '💰' },
    { id: 'freelance', label: 'Freelance', icon: '💻' },
    { id: 'investment', label: 'Investment', icon: '📈' },
    { id: 'other', label: 'Other', icon: '🔄' }
  ],
  expense: [
    { id: 'groceries', label: 'Groceries', icon: '🛒' },
    { id: 'utilities', label: 'Utilities', icon: '💡' },
    { id: 'rent', label: 'Rent', icon: '🏠' },
    { id: 'transport', label: 'Transport', icon: '🚗' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'other', label: 'Other', icon: '📝' }
  ]
};

function CategoryPicker({ type = 'expense', value, onChange }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {categories[type].map((category) => (
        <motion.button
          key={category.id}
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(category.id)}
          className={`flex flex-col items-center p-3 rounded-xl transition-colors ${
            value === category.id
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <span className="text-2xl mb-1">{category.icon}</span>
          <span className="text-xs">{category.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

export default CategoryPicker;