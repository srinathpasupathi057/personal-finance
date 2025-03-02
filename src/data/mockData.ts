import { Transaction, BudgetCategory, SavingsGoal, MonthlyOverview } from '../types';
import { format } from 'date-fns';

// Helper to generate random dates within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.setDate(now.getDate() - daysAgo));
  return format(date, 'yyyy-MM-dd');
};

export const transactions: Transaction[] = [
  {
    id: '1',
    date: getRandomDate(),
    amount: 2500,
    category: 'Salary',
    description: 'Monthly salary',
    type: 'income',
  },
  {
    id: '2',
    date: getRandomDate(),
    amount: 500,
    category: 'Freelance',
    description: 'Website design project',
    type: 'income',
  },
  {
    id: '3',
    date: getRandomDate(),
    amount: 800,
    category: 'Rent',
    description: 'Monthly rent payment',
    type: 'expense',
  },
  {
    id: '4',
    date: getRandomDate(),
    amount: 120,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    type: 'expense',
  },
  {
    id: '5',
    date: getRandomDate(),
    amount: 65,
    category: 'Dining',
    description: 'Dinner with friends',
    type: 'expense',
  },
  {
    id: '6',
    date: getRandomDate(),
    amount: 200,
    category: 'Utilities',
    description: 'Electricity bill',
    type: 'expense',
  },
  {
    id: '7',
    date: getRandomDate(),
    amount: 50,
    category: 'Entertainment',
    description: 'Movie tickets',
    type: 'expense',
  },
  {
    id: '8',
    date: getRandomDate(),
    amount: 35,
    category: 'Transportation',
    description: 'Fuel',
    type: 'expense',
  },
];

export const budgetCategories: BudgetCategory[] = [
  {
    id: '1',
    name: 'Housing',
    budgeted: 1000,
    spent: 800,
    color: '#FF6384',
  },
  {
    id: '2',
    name: 'Food',
    budgeted: 400,
    spent: 350,
    color: '#36A2EB',
  },
  {
    id: '3',
    name: 'Transportation',
    budgeted: 200,
    spent: 180,
    color: '#FFCE56',
  },
  {
    id: '4',
    name: 'Entertainment',
    budgeted: 150,
    spent: 120,
    color: '#4BC0C0',
  },
  {
    id: '5',
    name: 'Utilities',
    budgeted: 300,
    spent: 280,
    color: '#9966FF',
  },
  {
    id: '6',
    name: 'Healthcare',
    budgeted: 200,
    spent: 50,
    color: '#FF9F40',
  },
];

export const savingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 5000,
    targetDate: '2024-12-31',
    color: '#FF6384',
  },
  {
    id: '2',
    name: 'Vacation',
    targetAmount: 3000,
    currentAmount: 1500,
    targetDate: '2024-08-15',
    color: '#36A2EB',
  },
  {
    id: '3',
    name: 'New Laptop',
    targetAmount: 2000,
    currentAmount: 800,
    targetDate: '2024-10-01',
    color: '#FFCE56',
  },
];

export const monthlyOverview: MonthlyOverview[] = [
  { month: 'Jan', income: 3000, expenses: 2200, savings: 800 },
  { month: 'Feb', income: 3200, expenses: 2400, savings: 800 },
  { month: 'Mar', income: 3100, expenses: 2300, savings: 800 },
  { month: 'Apr', income: 3300, expenses: 2100, savings: 1200 },
  { month: 'May', income: 3400, expenses: 2500, savings: 900 },
  { month: 'Jun', income: 3200, expenses: 2400, savings: 800 },
];

// Calculate totals
export const calculateTotals = () => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const savings = income - expenses;
  const savingsRate = income > 0 ? (savings / income) * 100 : 0;
  
  return {
    income,
    expenses,
    savings,
    savingsRate: Math.round(savingsRate),
  };
};