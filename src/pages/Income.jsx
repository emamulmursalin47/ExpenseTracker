import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import TransactionForm from '../components/TransactionForm';
import TransactionCard from '../components/TransactionCard';

function Income() {
  const [showForm, setShowForm] = useState(false);
  const [incomeList, setIncomeList] = useState([
    { id: 1, amount: 3000, category: 'salary', date: '2024-03-01', description: 'Monthly salary' },
    { id: 2, amount: 500, category: 'freelance', date: '2024-03-15', description: 'Web design project' }
  ]);

  const handleAddIncome = (data) => {
    setIncomeList([
      { id: Date.now(), ...data },
      ...incomeList
    ]);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Income</h1>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-circle btn-primary"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>

        <motion.div layout className="space-y-4">
          <AnimatePresence>
            {incomeList.map((income) => (
              <TransactionCard
                key={income.id}
                transaction={income}
                type="income"
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <TransactionForm
            type="income"
            onSubmit={handleAddIncome}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Income;