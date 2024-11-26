import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryPicker from '../components/CategoryPicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-hot-toast';

function AddTransaction() {
  const navigate = useNavigate();
  const [type, setType] = useState('expense');
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date(),
    description: '',
    isShared: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const newTransaction = {
      id: Date.now(),
      type,
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date.toISOString()
    };

    const updatedTransactions = [newTransaction, ...existingTransactions];
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    
    toast.success('Transaction added successfully');
    navigate('/transactions');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 space-y-6 p-4 pb-32"> {/* Increased bottom padding */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Add {type === 'expense' ? 'Expense' : 'Income'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">৳</span>
              <input
                type="number"
                placeholder="0.00"
                className="input input-bordered input-lg text-center text-2xl pl-10"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <CategoryPicker
              type={type}
              value={formData.category}
              onChange={(category) => setFormData({ ...formData, category })}
            />
          </div>

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

          <button 
            type="submit" 
            className="btn btn-primary w-full h-12 text-lg"
            disabled={!formData.amount || !formData.category}
          >
            Save Transaction
          </button>
        </form>
      </div>

      {/* Compact fixed bottom transaction type selector */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          <button 
            type="button"
            className={`flex-1 py-2 text-base font-medium transition-all ${
              type === 'expense' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => {
              setType('expense');
              setFormData(prev => ({ ...prev, category: '' }));
            }}
          >
            <span className="text-xl mr-2">💸</span>
            Expense
          </button>
          <div className="w-px bg-gray-200"></div>
          <button 
            type="button"
            className={`flex-1 py-2 text-base font-medium transition-all ${
              type === 'income' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => {
              setType('income');
              setFormData(prev => ({ ...prev, category: '' }));
            }}
          >
            <span className="text-xl mr-2">💰</span>
            Income
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;