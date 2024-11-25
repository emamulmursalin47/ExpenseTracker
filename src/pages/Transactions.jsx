import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TransactionCard from '../components/TransactionCard';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [customDateRange, setCustomDateRange] = useState({
    startDate: null,
    endDate: null
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(savedTransactions);
  }, []);

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      // Type filter
      if (filter !== 'all' && transaction.type !== filter) return false;

      // Search filter
      if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Date filter
      if (dateFilter !== 'all') {
        const transactionDate = new Date(transaction.date);
        const today = new Date();

        switch (dateFilter) {
          case 'today':
            return isWithinInterval(transactionDate, {
              start: startOfDay(today),
              end: endOfDay(today)
            });
          case 'week':
            const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
            const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
            return isWithinInterval(transactionDate, { start: weekStart, end: weekEnd });
          case 'month':
            return transactionDate.getMonth() === today.getMonth() &&
                   transactionDate.getFullYear() === today.getFullYear();
          case 'custom':
            if (!customDateRange.startDate || !customDateRange.endDate) return true;
            return isWithinInterval(transactionDate, {
              start: startOfDay(customDateRange.startDate),
              end: endOfDay(customDateRange.endDate)
            });
          default:
            return true;
        }
      }

      return true;
    });
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <div className="space-y-4">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search transactions..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Type filter */}
        <div className="flex gap-2">
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'income' ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setFilter('income')}
          >
            Income
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'expense' ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setFilter('expense')}
          >
            Expense
          </button>
        </div>

        {/* Date filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>

          {dateFilter === 'custom' && (
            <div className="flex gap-2">
              <DatePicker
                selected={customDateRange.startDate}
                onChange={(date) => setCustomDateRange(prev => ({ ...prev, startDate: date }))}
                placeholderText="Start Date"
                className="input input-bordered input-sm"
              />
              <DatePicker
                selected={customDateRange.endDate}
                onChange={(date) => setCustomDateRange(prev => ({ ...prev, endDate: date }))}
                placeholderText="End Date"
                className="input input-bordered input-sm"
              />
            </div>
          )}
        </div>
      </div>

      <motion.div layout className="space-y-4">
        <AnimatePresence>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                type={transaction.type}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-gray-500"
            >
              No transactions found
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Transactions;