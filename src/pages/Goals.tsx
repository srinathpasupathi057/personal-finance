import React from 'react';
import { savingsGoals } from '../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Target, TrendingUp, Calendar, DollarSign, Plus } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Goals: React.FC = () => {
  // Calculate total goal amounts and progress
  const totalTargetAmount = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = Math.round((totalCurrentAmount / totalTargetAmount) * 100);
  
  // Prepare chart data
  const chartData = {
    labels: savingsGoals.map(goal => goal.name),
    datasets: [
      {
        data: savingsGoals.map(goal => goal.currentAmount),
        backgroundColor: savingsGoals.map(goal => goal.color),
        borderColor: savingsGoals.map(goal => goal.color),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
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
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Financial Goals</h2>
            <p className="text-gray-500">Track your progress towards your financial goals</p>
          </div>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus size={18} />
            <span>Create New Goal</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-64 w-64">
              <Doughnut data={chartData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-800">{overallProgress}%</span>
                <span className="text-sm text-gray-500">Overall Progress</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-500">Total Saved: <span className="font-medium">${totalCurrentAmount.toLocaleString()}</span></p>
              <p className="text-gray-500">Target: <span className="font-medium">${totalTargetAmount.toLocaleString()}</span></p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Goal Summary</h3>
            <div className="space-y-4">
              {savingsGoals.map((goal) => {
                const progressPercent = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
                
                return (
                  <div key={goal.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: goal.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-800">{goal.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium">${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}</span>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${progressPercent}%`,
                            backgroundColor: goal.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.map((goal) => {
          const progressPercent = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
          const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const monthsLeft = Math.ceil(daysLeft / 30);
          const amountLeft = goal.targetAmount - goal.currentAmount;
          const monthlyContributionNeeded = monthsLeft > 0 ? Math.ceil(amountLeft / monthsLeft) : 0;
          
          return (
            <div 
              key={goal.id} 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{goal.name}</h4>
                <div 
                  className="p-2 rounded-full" 
                  style={{ backgroundColor: `${goal.color}20` }}
                >
                  <Target size={20} style={{ color: goal.color }} />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm font-medium">{progressPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${progressPercent}%`,
                      backgroundColor: goal.color 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center text-gray-500 mb-1">
                    <DollarSign size={14} className="mr-1" />
                    <span className="text-xs">Current</span>
                  </div>
                  <p className="text-lg font-semibold">${goal.currentAmount.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Target size={14} className="mr-1" />
                    <span className="text-xs">Target</span>
                  </div>
                  <p className="text-lg font-semibold">${goal.targetAmount.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Calendar size={14} className="mr-1" />
                    <span className="text-xs">Timeline</span>
                  </div>
                  <p className="text-lg font-semibold">{monthsLeft} months</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center text-gray-500 mb-1">
                    <TrendingUp size={14} className="mr-1" />
                    <span className="text-xs">Monthly Need</span>
                  </div>
                  <p className="text-lg font-semibold">${monthlyContributionNeeded}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <p>Target Date: <span className="font-medium">{goal.targetDate}</span></p>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Add Funds
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;