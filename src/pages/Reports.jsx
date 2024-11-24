import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Reports() {
  const [timeframe, setTimeframe] = useState('month');

  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Income',
        data: [3000, 500, 1000, 2000],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Expenses',
        data: [1500, 700, 800, 1200],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
    ],
  };

  const pieData = {
    labels: ['Groceries', 'Utilities', 'Rent', 'Transportation', 'Entertainment'],
    datasets: [
      {
        data: [300, 200, 1000, 150, 250],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#6366F1',
          '#8B5CF6',
          '#EC4899',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="input-field w-auto"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Income vs Expenses</h2>
        <Bar
          data={barData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
        <div className="w-full max-w-md mx-auto">
          <Pie data={pieData} />
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Income:</span>
            <span className="font-semibold text-green-600">$6,500</span>
          </div>
          <div className="flex justify-between">
            <span>Total Expenses:</span>
            <span className="font-semibold text-red-600">$4,200</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span>Net Savings:</span>
            <span className="font-semibold text-primary-600">$2,300</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;