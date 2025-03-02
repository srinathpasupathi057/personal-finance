import React from 'react';
import OverviewCards from '../components/dashboard/OverviewCards';
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown';
import MonthlyTrend from '../components/dashboard/MonthlyTrend';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import SavingsProgress from '../components/dashboard/SavingsProgress';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import { 
  transactions, 
  budgetCategories, 
  savingsGoals, 
  monthlyOverview,
  calculateTotals
} from '../data/mockData';

const Dashboard: React.FC = () => {
  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <OverviewCards 
        income={totals.income}
        expenses={totals.expenses}
        savings={totals.savings}
        savingsRate={totals.savingsRate}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseBreakdown categories={budgetCategories} />
        <MonthlyTrend data={monthlyOverview} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecentTransactions transactions={transactions} />
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SavingsProgress goals={savingsGoals} />
            <BudgetProgress categories={budgetCategories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;