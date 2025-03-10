import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  // Common currencies - you can expand this list
  const currencies = [
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CNY', name: 'Chinese Yuan' },
  ];

  const { data: exchangeData, isLoading } = useQuery({
    queryKey: ['exchangeRate', selectedCurrency],
    queryFn: async () => {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/af4641a7948adba158496bd9/latest/USD`);
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const convertedAmount = exchangeData?.conversion_rates?.[selectedCurrency] * amount;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Currency Converter</h3>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Converted Amount</div>
          {isLoading ? (
            <div className="text-lg font-semibold">Loading...</div>
          ) : (
            <div className="text-lg font-semibold">
              {convertedAmount?.toFixed(2)} {selectedCurrency}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">
            1 USD = {exchangeData?.conversion_rates?.[selectedCurrency]} {selectedCurrency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter; 