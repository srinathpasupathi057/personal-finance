import React from 'react';
import { savingsGoals, monthlyOverview } from '../data/mockData';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Savings: React.FC = () => {
  // Calculate total savings
  const totalSavings = monthlyOverview.reduce((sum, month) => sum + month.savings, 0);
  const averageSavingsRate = Math.round(
    monthlyOverview.reduce((sum, month) => sum + (month.savings / month.income) * 100, 0) / 
    monthlyOverview.length
  );
  
  // Prepare chart data for savings trend
  const savingsTrendData = {
    labels: monthlyOverview.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Savings',
        data: monthlyOverview.map(item => item.savings),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Savings</h3>
          <p className="text-3xl font-bold text-gray-800">${totalSavings.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Last 6 months</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Average Savings Rate</h3>
          <p className="text-3xl font-bold text-gray-800">{averageSavingsRate}%</p>
          <p className="text-sm text-gray-500 mt-1">of monthly income</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Projected Annual Savings</h3>
          <p className="text-3xl font-bold text-gray-800">
            ${(totalSavings / monthlyOverview.length * 12).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">at current rate</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Savings Trend</h3>
        <div className="h-80">
          <Line data={savingsTrendData} options={chartOptions} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Savings Goals</h3>
            <p className="text-gray-500 text-sm">Track your progress towards financial goals</p>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Add New Goal
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsGoals.map((goal) => {
            const progressPercent = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
            const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const monthsLeft = Math.ceil(daysLeft / 30);
            
            return (
              <div 
                key={goal.id} 
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-medium text-gray-800 mb-2">{goal.name}</h4>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm font-medium">{progressPercent.toFixed(0)}%</span>
                </div>
                
                <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${progressPercent}%`,
                      backgroundColor: goal.color 
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-lg font-semibold">${goal.currentAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="text-lg font-semibold">${goal.targetAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Remaining</p>
                    <p className="text-lg font-semibold">
                      ${(goal.targetAmount - goal.currentAmount).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-500">Target Date: <span className="font-medium">{goal.targetDate}</span></p>
                  <p className="text-gray-500">{monthsLeft} months left</p>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700">
                    Add Funds
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Savings;