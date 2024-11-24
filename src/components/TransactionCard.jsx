import { motion } from 'framer-motion';
import { format } from 'date-fns';

function TransactionCard({ transaction, type = 'expense' }) {
  const { amount, category, date, description } = transaction;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card bg-base-100 shadow-md"
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`text-lg ${type === 'income' ? 'text-primary-600' : 'text-red-600'}`}>
              {type === 'income' ? '+' : '-'}${amount}
            </div>
          </div>
          <div className="text-sm opacity-70">
            {format(new Date(date), 'MMM d, yyyy')}
          </div>
        </div>
        <div className="mt-2">
          <div className="text-sm font-medium capitalize">{category}</div>
          {description && (
            <div className="text-sm opacity-70 mt-1">{description}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TransactionCard;