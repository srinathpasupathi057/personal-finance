import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { budgetCategories } from '../data/mockData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Budget: React.FC = () => {
  // Calculate total budget and spent
  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;
  const percentUsed = Math.round((totalSpent / totalBudgeted) * 100);
  
  // Prepare chart data
  const chartData = {
    labels: budgetCategories.map(cat => cat.name),
    datasets: [
      {
        label: 'Budget',
        data: budgetCategories.map(cat => cat.budgeted),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Spent',
        data: budgetCategories.map(cat => cat.spent),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: $${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      }
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Monthly Budget</h2>
            <p className="text-gray-500">Track your spending against your budget</p>
          </div>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus size={18} />
            <span>Add Category</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Budget</h3>
            <p className="text-2xl font-bold text-gray-800">${totalBudgeted.toLocaleString()}</p>
          </div>
          
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Spent</h3>
            <p className="text-2xl font-bold text-gray-800">${totalSpent.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">{percentUsed}% of budget used</p>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Remaining</h3>
            <p className="text-2xl font-bold text-gray-800">${remainingBudget.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="h-80 mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Categories</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budgeted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgetCategories.map((category) => {
                const remaining = category.budgeted - category.spent;
                const percentUsed = Math.round((category.spent / category.budgeted) * 100);
                const isOverBudget = category.spent > category.budgeted;
                
                return (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${category.budgeted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${category.spent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={isOverBudget ? 'text-rose-600 font-medium' : 'text-gray-500'}>
                        {isOverBudget ? '-' : ''}${Math.abs(remaining)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${isOverBudget ? 'bg-rose-500' : ''}`}
                            style={{ 
                              width: `${Math.min(100, percentUsed)}%`,
                              backgroundColor: isOverBudget ? undefined : category.color 
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">{percentUsed}%</span>
                        {isOverBudget && (
                          <AlertCircle size={16} className="ml-1 text-rose-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-emerald-600 hover:text-emerald-900 mr-3">Edit</button>
                      <button className="text-rose-600 hover:text-rose-900">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Budget;