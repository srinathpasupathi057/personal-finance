import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5); // Show only the 5 most recent

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {sortedTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'income' ? 'bg-emerald-100' : 'bg-rose-100'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight size={18} className="text-emerald-600" />
                ) : (
                  <ArrowDownRight size={18} className="text-rose-600" />
                )}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                <p className="text-xs text-gray-500">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
              </p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;