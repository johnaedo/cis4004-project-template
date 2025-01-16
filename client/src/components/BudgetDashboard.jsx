import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBudgetSummary, getTransactionSummary, getTransactions } from '../api';
import Spinner from './Spinner';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, Target, AlertTriangle, CheckCircle } from 'lucide-react';

const BudgetDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: budgetSummary, isLoading: isLoadingBudgets } = useQuery({
    queryKey: ['budgetSummary', selectedMonth, selectedYear],
    queryFn: () => getBudgetSummary({ month: selectedMonth, year: selectedYear })
  });

  const { data: transactionSummary, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactionSummary', selectedMonth, selectedYear],
    queryFn: () => getTransactionSummary({
      startDate: `${selectedYear}-${selectedMonth}-01`,
      endDate: `${selectedYear}-${selectedMonth}-31`
    })
  });

  const { data: recentTransactions, isLoading: isLoadingRecent } = useQuery({
    queryKey: ['recentTransactions'],
    queryFn: () => getTransactions({ limit: 5 })
  });

  if (isLoadingBudgets || isLoadingTransactions || isLoadingRecent) {
    return <Spinner />;
  }

  const totalIncome = transactionSummary?.find(s => s.type === 'income')?.total || 0;
  const totalExpenses = transactionSummary?.find(s => s.type === 'expense')?.total || 0;
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const getHealthStatus = (spent, budget) => {
    const ratio = spent / budget;
    if (ratio > 1) return { icon: AlertTriangle, color: 'text-red-500', text: 'Over Budget' };
    if (ratio > 0.9) return { icon: AlertTriangle, color: 'text-yellow-500', text: 'Near Limit' };
    if (ratio > 0.7) return { icon: Target, color: 'text-blue-500', text: 'On Track' };
    return { icon: CheckCircle, color: 'text-green-500', text: 'Healthy' };
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Month Selector */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Financial Dashboard</h2>
        <div className="flex gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>{month}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[2023, 2024].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-200 hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Income</h3>
            <ArrowUpCircle className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Monthly earnings</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-200 hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Expenses</h3>
            <ArrowDownCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Monthly spending</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-200 hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Balance</h3>
            <TrendingUp className="w-6 h-6 text-blue-500" />
          </div>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Net balance</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 transform transition-all duration-200 hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Savings Rate</h3>
            <Target className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{savingsRate.toFixed(1)}%</p>
          <p className="text-sm text-gray-500 mt-2">Of total income</p>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6">Budget Health</h3>
        <div className="space-y-6">
          {budgetSummary?.map((budget) => {
            const health = getHealthStatus(budget.spent_amount, budget.budget_amount);
            const HealthIcon = health.icon;
            return (
              <div key={budget.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <HealthIcon className={`w-5 h-5 ${health.color}`} />
                    <span className="font-medium">{budget.category_name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">
                      ${budget.spent_amount.toFixed(2)} / ${budget.budget_amount.toFixed(2)}
                    </span>
                    <p className={`text-xs ${health.color}`}>{health.text}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      budget.status === 'over' ? 'bg-red-500' :
                      budget.status === 'warning' ? 'bg-yellow-400' :
                      'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.min((budget.spent_amount / budget.budget_amount) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category_name}</p>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard; 