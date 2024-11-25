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

    // Get existing transactions from localStorage or initialize empty array
    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    // Create new transaction
    const newTransaction = {
      id: Date.now(),
      type,
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date.toISOString()
    };

    // Add new transaction to beginning of array
    const updatedTransactions = [newTransaction, ...existingTransactions];
    
    // Save to localStorage
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    
    toast.success('Transaction added successfully');
    navigate('/transactions');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Transaction</h1>
      </div>

      <div className="flex gap-2 mb-6">
        <button 
          type="button"
          className={`flex-1 py-2 rounded-full text-sm ${
            type === 'expense' ? 'bg-purple-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => {
            setType('expense');
            setFormData(prev => ({ ...prev, category: '' }));
          }}
        >
          Expense
        </button>
        <button 
          type="button"
          className={`flex-1 py-2 rounded-full text-sm ${
            type === 'income' ? 'bg-purple-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => {
            setType('income');
            setFormData(prev => ({ ...prev, category: '' }));
          }}
        >
          Income
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="number"
            placeholder="0.00"
            className="input input-bordered input-lg text-center text-3xl"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
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
          className="btn btn-primary w-full"
          disabled={!formData.amount || !formData.category}
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;