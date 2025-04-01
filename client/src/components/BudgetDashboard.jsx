import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBudgetSummary } from '../api';
import Spinner from './Spinner';
import { Target, Trophy, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SavingsGoals from './SavingsGoals';

const BudgetDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: budgetSummary, isLoading: isLoadingBudgets } = useQuery({
    queryKey: ['budgetSummary', selectedMonth, selectedYear],
    queryFn: () => {
      const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
      return getBudgetSummary({
        startDate: `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-01`,
        endDate: `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${lastDay}`
      });
    }
  });

  if (isLoadingBudgets) {
    return <Spinner />;
  }

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
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="appearance-none bg-white pl-10 pr-8 py-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-gray-700 cursor-pointer"
            >
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>{month}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none bg-white pl-10 pr-8 py-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-gray-700 cursor-pointer"
            >
              {Array.from({ length: 11 }, (_, i) => 2020 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6">Budget Health</h3>
        <div className="space-y-6">
          {!budgetSummary || budgetSummary.length === 0 ? (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No budgets set up yet</p>
              <Link 
                to="/budgets" 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Set up your first budget →
              </Link>
            </div>
          ) : (
            budgetSummary.map((budget) => (
              <div key={budget.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: budget.category_color }} />
                    <span className="font-medium">{budget.category_name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">
                      ${Number(budget.spent_amount).toFixed(2)} / ${Number(budget.budget_amount).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((Number(budget.spent_amount) / Number(budget.budget_amount)) * 100, 100)}%`,
                      backgroundColor: budget.status === 'over' ? '#ef4444' : 
                                     budget.status === 'warning' ? '#f59e0b' : 
                                     budget.category_color
                    }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Savings Goals */}
      <SavingsGoals />
    </div>
  );
};

export default BudgetDashboard; 