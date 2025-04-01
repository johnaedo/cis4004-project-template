import React, { useState } from 'react';
import { Target, Trophy, Sparkles, AlertCircle } from 'lucide-react';

const SavingsGoals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 3500,
      deadline: "2024-12-31",
      priority: "high",
      milestones: [2500, 5000, 7500, 10000],
      icon: "🛡️"
    },
    {
      id: 2,
      name: "Vacation Fund",
      target: 5000,
      current: 2000,
      deadline: "2024-08-01",
      priority: "medium",
      milestones: [1000, 2500, 3750, 5000],
      icon: "✈️"
    },
    {
      id: 3,
      name: "New Car",
      target: 25000,
      current: 5000,
      deadline: "2025-06-30",
      priority: "low",
      milestones: [5000, 10000, 15000, 25000],
      icon: "🚗"
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateNextMilestone = (current, milestones) => {
    return milestones.find(milestone => milestone > current) || milestones[milestones.length - 1];
  };

  const handleContribution = (id, amount) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        return {
          ...goal,
          current: Math.min(goal.current + parseFloat(amount || 0), goal.target)
        };
      }
      return goal;
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Savings Goals</h3>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600">Track your progress</span>
        </div>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const daysLeft = calculateDaysLeft(goal.deadline);
          const nextMilestone = calculateNextMilestone(goal.current, goal.milestones);

          return (
            <div key={goal.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{goal.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(goal.priority)}`}>
                      {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Target: ${goal.target.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{daysLeft} days left</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden bg-teal-200 rounded">
                  <div
                    style={{ width: `${progress}%` }}
                    className="flex flex-col justify-center overflow-hidden bg-teal-500 shadow-none transition-all duration-500"
                  ></div>
                </div>
                {/* Milestone Markers */}
                <div className="flex justify-between px-1">
                  {goal.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full -mt-3 ${
                        goal.current >= milestone ? 'bg-teal-500' : 'bg-gray-300'
                      }`}
                      style={{ marginLeft: `${(milestone / goal.target) * 100 - 2}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Current Amount and Quick Add */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current: ${goal.current.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    Next milestone: ${nextMilestone.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-24 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleContribution(goal.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = e.target.previousSibling;
                      handleContribution(goal.id, input.value);
                      input.value = '';
                    }}
                    className="px-3 py-1 text-sm text-white bg-teal-500 rounded hover:bg-teal-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals; 