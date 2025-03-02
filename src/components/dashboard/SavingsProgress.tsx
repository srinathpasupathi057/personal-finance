import React from 'react';
import { SavingsGoal } from '../../types';

interface SavingsProgressProps {
  goals: SavingsGoal[];
}

const SavingsProgress: React.FC<SavingsProgressProps> = ({ goals }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Savings Goals</h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          Add Goal
        </button>
      </div>
      
      <div className="space-y-5">
        {goals.map((goal) => {
          const progressPercent = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
          const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{goal.name}</h4>
                  <p className="text-xs text-gray-500">{daysLeft} days left</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{progressPercent.toFixed(0)}% complete</p>
                </div>
              </div>
              
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${progressPercent}%`,
                    backgroundColor: goal.color 
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsProgress;