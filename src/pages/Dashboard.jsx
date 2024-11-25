import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [timeframe, setTimeframe] = useState('all');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [summary, setSummary] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0
  });

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    // Calculate date range based on timeframe
    let start = new Date();
    let end = new Date();
    
    switch (timeframe) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'week':
        start.setDate(start.getDate() - start.getDay());
        end.setDate(end.getDate() + (6 - end.getDay()));
        break;
      case 'month':
        start = startOfMonth(new Date());
        end = endOfMonth(new Date());
        break;
      case 'custom':
        start = dateRange.start;
        end = dateRange.end;
        break;
      default:
        start = null;
        end = null;
    }

    // Filter transactions based on date range
    const filteredTransactions = transactions.filter(transaction => {
      if (timeframe === 'all') return true;
      const transactionDate = new Date(transaction.date);
      return isWithinInterval(transactionDate, { start, end });
    });

    // Calculate totals
    const totals = filteredTransactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      if (transaction.type === 'income') {
        acc.totalIncome += amount;
      } else {
        acc.totalExpenses += amount;
      }
      return acc;
    }, { totalIncome: 0, totalExpenses: 0 });

    setSummary({
      totalBalance: totals.totalIncome - totals.totalExpenses,
      monthlyIncome: totals.totalIncome,
      monthlyExpenses: totals.totalExpenses
    });
  }, [timeframe, dateRange]);

  const spendingData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Spending',
        data: [300, 150, 400, 450, 200, 600, 300],
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      
      <div className="card bg-purple-600 text-white">
        <div className="flex items-center gap-3 p-6">
          <CurrencyDollarIcon className="h-8 w-8" />
          <div>
            <p className="text-sm opacity-90">Total Balance</p>
            <p className="text-2xl font-bold">${summary.totalBalance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-green-100">
          <div className="flex items-center gap-2 p-4">
            <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Income</p>
              <p className="text-xl font-bold text-green-600">
                ${summary.monthlyIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-red-100">
          <div className="flex items-center gap-2 p-4">
            <ArrowTrendingDownIcon className="h-6 w-6 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Expenses</p>
              <p className="text-xl font-bold text-red-600">
                ${summary.monthlyExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Spend Frequency</h2>
        <Line data={spendingData} options={options} />
      </div>
    </div>
  );
}

export default Dashboard;