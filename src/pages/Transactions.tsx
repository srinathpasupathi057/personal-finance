import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { transactions as allTransactions } from '../data/mockData';
import { Transaction } from '../types';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(allTransactions);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (newFilter: 'all' | 'income' | 'expense') => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setTransactions(allTransactions.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setTransactions(allTransactions.filter(t => 
        t.type === newFilter && (
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (filter === 'all') {
      setTransactions(allTransactions.filter(t => 
        t.description.toLowerCase().includes(term.toLowerCase()) ||
        t.category.toLowerCase().includes(term.toLowerCase())
      ));
    } else {
      setTransactions(allTransactions.filter(t => 
        t.type === filter && (
          t.description.toLowerCase().includes(term.toLowerCase()) ||
          t.category.toLowerCase().includes(term.toLowerCase())
        )
      ));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Transactions</h2>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg border ${
                  filter === 'all' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-lg border ${
                  filter === 'income' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleFilterChange('income')}
              >
                Income
              </button>
              <button 
                className={`px-4 py-2 rounded-lg border ${
                  filter === 'expense' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleFilterChange('expense')}
              >
                Expenses
              </button>
              <button className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                <Filter size={20} />
              </button>
            </div>
            
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.type === 'income' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight size={12} className="mr-1" />
                    ) : (
                      <ArrowDownRight size={12} className="mr-1" />
                    )}
                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-emerald-600 hover:text-emerald-900 mr-3">Edit</button>
                  <button className="text-rose-600 hover:text-rose-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {transactions.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No transactions found.</p>
        </div>
      )}
      
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{transactions.length}</span> transactions
        </p>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;