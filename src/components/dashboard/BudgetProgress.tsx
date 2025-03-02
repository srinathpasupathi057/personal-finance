import React from 'react';
import { BudgetCategory } from '../../types';

interface BudgetProgressProps {
  categories: BudgetCategory[];
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ categories }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Budget Progress</h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          Adjust Budget
        </button>
      </div>
      
      <div className="space-y-4">
        {categories.map((category) => {
          const progressPercent = Math.min(100, (category.spent / category.budgeted) * 100);
          const isOverBudget = category.spent > category.budgeted;
          
          return (
            <div key={category.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-800">{category.name}</h4>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                  </p>
                  <p className={`text-xs ${isOverBudget ? 'text-rose-500' : 'text-gray-500'}`}>
                    {isOverBudget ? 'Over budget' : `${progressPercent.toFixed(0)}% used`}
                  </p>
                </div>
              </div>
              
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isOverBudget ? 'bg-rose-500' : ''}`}
                  style={{ 
                    width: `${progressPercent}%`,
                    backgroundColor: isOverBudget ? undefined : category.color 
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

export default BudgetProgress;