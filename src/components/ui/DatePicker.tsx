import React, { useState } from 'react';

interface DatePickerProps {
  label: string;
  onChange: (value: string) => void;
  supportLunar?: boolean;
  error?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ 
  label, 
  onChange, 
  supportLunar = false, 
  error = '',
  className = ''
}) => {
  const [value, setValue] = useState('');
  const [isLunar, setIsLunar] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      <div className="space-y-3">
        <input
          type="date"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        
        {supportLunar && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="lunar-calendar"
              checked={isLunar}
              onChange={(e) => setIsLunar(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="lunar-calendar" className="text-sm text-gray-600 dark:text-gray-400">
              使用农历日期
            </label>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
