import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Budget() {
  const [timeframe, setTimeframe] = useState('month');
  const [sharedFinances, setSharedFinances] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    userExpenses: 0,
    spouseExpenses: 0,
    categories: {},
    dailyExpenses: {
      user: [],
      spouse: []
    }
  });

  // Mock current user - in real app, this would come from auth context
  const currentUser = {
    id: '1',
    name: 'John',
    role: 'husband',
    spouseName: 'Jane'
  };

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    const dailyExpenses = daysInMonth.map(day => {
      const dayTransactions = filteredTransactions.filter(t => 
        isSameDay(new Date(t.date), day) && t.type === 'expense'
      );

      return {
        date: format(day, 'MMM d'),
        user: dayTransactions
          .filter(t => t.userId === currentUser.id)
          .reduce((sum, t) => sum + parseFloat(t.amount), 0),
        spouse: dayTransactions
          .filter(t => t.userId !== currentUser.id)
          .reduce((sum, t) => sum + parseFloat(t.amount), 0)
      };
    });

    const finances = filteredTransactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);

      if (transaction.type === 'income') {
        acc.totalIncome += amount;
      } else {
        acc.totalExpenses += amount;
        if (transaction.userId === currentUser.id) {
          acc.userExpenses += amount;
        } else {
          acc.spouseExpenses += amount;
        }
        acc.categories[transaction.category] = (acc.categories[transaction.category] || 0) + amount;
      }

      return acc;
    }, {
      totalIncome: 0,
      totalExpenses: 0,
      userExpenses: 0,
      spouseExpenses: 0,
      categories: {},
      dailyExpenses: {
        user: dailyExpenses.map(d => d.user),
        spouse: dailyExpenses.map(d => d.spouse)
      }
    });

    finances.balance = finances.totalIncome - finances.totalExpenses;
    setSharedFinances(finances);
  }, [timeframe]);

  const spendingData = {
    labels: eachDayOfInterval({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date())
    }).map(date => format(date, 'MMM d')),
    datasets: [
      {
        label: 'Your Expenses',
        data: sharedFinances.dailyExpenses.user,
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: `${currentUser.spouseName}'s Expenses`,
        data: sharedFinances.dailyExpenses.spouse,
        borderColor: '#EC4899',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const categoryData = {
    labels: Object.keys(sharedFinances.categories),
    datasets: [{
      data: Object.values(sharedFinances.categories),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
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

  const calculateProgress = (spent, total) => {
    return Math.min((spent / total) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shared Budget</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="card bg-purple-600 text-white p-6">
        <h2 className="text-lg mb-2">Shared Balance</h2>
        <p className="text-3xl font-bold">৳{sharedFinances.balance.toFixed(2)}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm opacity-75">Total Income</p>
            <p className="text-xl">+৳{sharedFinances.totalIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Total Expenses</p>
            <p className="text-xl">-৳{sharedFinances.totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-white p-4">
          <h3 className="text-sm text-gray-500">Your Expenses</h3>
          <p className="text-2xl font-bold">৳{sharedFinances.userExpenses.toFixed(2)}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${calculateProgress(sharedFinances.userExpenses, sharedFinances.totalIncome)}%` }}
            ></div>
          </div>
        </div>

        <div className="card bg-white p-4">
          <h3 className="text-sm text-gray-500">{currentUser.spouseName}'s Expenses</h3>
          <p className="text-2xl font-bold">৳{sharedFinances.spouseExpenses.toFixed(2)}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${calculateProgress(sharedFinances.spouseExpenses, sharedFinances.totalIncome)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="card bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Daily Expense Comparison</h2>
        <Line data={spendingData} options={options} />
      </div>

      <div className="card bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Expense Categories</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Doughnut 
              data={categoryData}
              options={{
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      boxWidth: 12
                    }
                  }
                }
              }}
            />
          </div>
          <div className="space-y-4">
            {Object.entries(sharedFinances.categories).map(([category, amount]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{category}</span>
                  <span>৳{amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${calculateProgress(amount, sharedFinances.totalExpenses)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Shared Savings Goals</h2>
        <div className="space-y-4">
          {[
            { name: 'Emergency Fund', target: 100000, current: 50000 },
            { name: 'Vacation', target: 50000, current: 20000 },
            { name: 'Home Improvement', target: 150000, current: 30000 }
          ].map((goal) => (
            <div key={goal.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{goal.name}</span>
                <span>৳{goal.current} / ৳{goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Budget;