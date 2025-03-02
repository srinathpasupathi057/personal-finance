import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BudgetCategory } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseBreakdownProps {
  categories: BudgetCategory[];
}

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ categories }) => {
  const data = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: categories.map(cat => cat.spent),
        backgroundColor: categories.map(cat => cat.color),
        borderColor: categories.map(cat => cat.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: $${value}`;
          }
        }
      }
    },
    cutout: '70%',
  };

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Breakdown</h3>
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 h-64 relative">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-gray-800">${totalSpent}</span>
            <span className="text-sm text-gray-500">Total Spent</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">${category.spent}</span>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-1.5 rounded-full" 
                      style={{ 
                        width: `${Math.min(100, (category.spent / category.budgeted) * 100)}%`,
                        backgroundColor: category.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;