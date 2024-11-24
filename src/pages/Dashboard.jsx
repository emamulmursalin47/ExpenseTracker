import { useState } from 'react';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  // Temporary mock data
  const [summary] = useState({
    totalBalance: 5000,
    monthlyIncome: 3000,
    monthlyExpenses: 2000
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="card bg-primary-600 text-white">
        <div className="flex items-center gap-3">
          <CurrencyDollarIcon className="h-8 w-8" />
          <div>
            <p className="text-sm opacity-90">Total Balance</p>
            <p className="text-2xl font-bold">${summary.totalBalance}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-green-100">
          <div className="flex items-center gap-2">
            <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Monthly Income</p>
              <p className="text-xl font-bold text-green-600">
                ${summary.monthlyIncome}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-red-100">
          <div className="flex items-center gap-2">
            <ArrowTrendingDownIcon className="h-6 w-6 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Monthly Expenses</p>
              <p className="text-xl font-bold text-red-600">
                ${summary.monthlyExpenses}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;