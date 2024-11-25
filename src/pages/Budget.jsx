import { useState } from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Budget() {
  const [timeframe, setTimeframe] = useState('week');

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
        <h1 className="text-2xl font-bold">Budget</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="select select-bordered w-auto"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="card bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Spend Frequency</h2>
        <Line data={spendingData} options={options} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-white p-4">
          <h3 className="text-sm text-gray-500">Monthly Budget</h3>
          <p className="text-2xl font-bold">$2,000</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">$600 remaining</p>
        </div>

        <div className="card bg-white p-4">
          <h3 className="text-sm text-gray-500">Total Spent</h3>
          <p className="text-2xl font-bold">$1,400</p>
          <p className="text-sm text-green-500 mt-2">Under budget</p>
        </div>
      </div>

      <div className="card bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">Category Budgets</h2>
        <div className="space-y-4">
          {[
            { category: 'Groceries', budget: 500, spent: 350 },
            { category: 'Transportation', budget: 300, spent: 280 },
            { category: 'Entertainment', budget: 200, spent: 150 }
          ].map((item) => (
            <div key={item.category}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.category}</span>
                <span>${item.spent} / ${item.budget}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${(item.spent / item.budget) * 100}%` }}
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