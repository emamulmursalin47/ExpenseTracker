import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CategoryPicker from './CategoryPicker';
import { format } from 'date-fns';

function TransactionForm({ type = 'expense', onSubmit, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date(),
    description: '',
    isShared: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const steps = [
    {
      title: 'Amount',
      content: (
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter Amount</span>
            </label>
            <input
              type="number"
              placeholder="0.00"
              className="input input-bordered input-lg text-center text-3xl"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              autoFocus
            />
          </div>
        </div>
      )
    },
    {
      title: 'Category',
      content: (
        <div className="space-y-4">
          <CategoryPicker
            type={type}
            value={formData.category}
            onChange={(category) => {
              setFormData({ ...formData, category });
              setStep(3);
            }}
          />
        </div>
      )
    },
    {
      title: 'Details',
      content: (
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="MMMM d, yyyy"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              placeholder="Add a note"
              className="input input-bordered"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          {type === 'expense' && (
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Shared expense</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={formData.isShared}
                  onChange={(e) => setFormData({ ...formData, isShared: e.target.checked })}
                />
              </label>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        className="relative w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-base-100 p-6"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
      >
        <div className="mb-6">
          <div className="w-12 h-1 bg-base-300 rounded-full mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-center">
            Add {type === 'income' ? 'Income' : 'Expense'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {steps[step - 1].content}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2">
            {step > 1 && (
              <button
                type="button"
                className="btn btn-outline flex-1"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
            {step < steps.length ? (
              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !formData.amount || step === 2 && !formData.category}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={!formData.amount || !formData.category}
              >
                Save
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default TransactionForm;