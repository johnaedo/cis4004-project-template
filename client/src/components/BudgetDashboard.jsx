import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBudgetSummary, getTransactionSummary, getTransactions } from '../api';
import Spinner from './Spinner';

const BudgetDashboard = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data: budgetSummary, isLoading: isLoadingBudgets } = useQuery({
    queryKey: ['budgetSummary', currentMonth, currentYear],
    queryFn: () => getBudgetSummary({ month: currentMonth, year: currentYear })
  });

  const { data: transactionSummary, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactionSummary'],
    queryFn: () => getTransactionSummary({
      startDate: `${currentYear}-${currentMonth}-01`,
      endDate: `${currentYear}-${currentMonth}-31`
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

  return (
    <div className="p-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Income</h3>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Expenses</h3>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Balance</h3>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Budget Progress</h3>
        <div className="space-y-4">
          {budgetSummary?.map((budget) => (
            <div key={budget.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{budget.category_name}</span>
                <span className="text-sm text-gray-600">
                  ${budget.spent_amount} / ${budget.budget_amount}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    budget.status === 'over' ? 'bg-red-600' :
                    budget.status === 'warning' ? 'bg-yellow-400' :
                    'bg-green-600'
                  }`}
                  style={{
                    width: `${Math.min((budget.spent_amount / budget.budget_amount) * 100, 100)}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-600">{transaction.category_name}</p>
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