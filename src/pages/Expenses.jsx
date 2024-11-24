import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import TransactionForm from '../components/TransactionForm';
import TransactionCard from '../components/TransactionCard';

function Expenses() {
  const [showForm, setShowForm] = useState(false);
  const [expenseList, setExpenseList] = useState([
    { id: 1, amount: 500, category: 'groceries', date: '2024-03-10', description: 'Weekly groceries' },
    { id: 2, amount: 100, category: 'utilities', date: '2024-03-15', description: 'Electricity bill' }
  ]);

  const handleAddExpense = (data) => {
    setExpenseList([
      { id: Date.now(), ...data },
      ...expenseList
    ]);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-circle btn-primary"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>

        <motion.div layout className="space-y-4">
          <AnimatePresence>
            {expenseList.map((expense) => (
              <TransactionCard
                key={expense.id}
                transaction={expense}
                type="expense"
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <TransactionForm
            type="expense"
            onSubmit={handleAddExpense}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Expenses;