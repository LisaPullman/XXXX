import React, { useState } from 'react';
import { Solar, Lunar } from 'lunar-typescript';
import { cn } from '../../utils/cn';

interface DatePickerProps {
  label?: string;
  onDateChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, onDateChange }) => {
  const [isLunar, setIsLunar] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());

  const handleDateChange = () => {
    try {
      let solarDate;
      if (isLunar) {
        // Note: lunar-typescript might have specific validation for leap months
        const lunar = Lunar.fromYmd(year, month, day);
        solarDate = lunar.getSolar();
      } else {
        solarDate = Solar.fromYmd(year, month, day);
      }
      console.log('Inspecting solarDate object:', solarDate);
      // onDateChange(solarDate.toDate()); // Temporarily disabled
    } catch (e) {
      console.error("Invalid date:", e);
    }
  };

  // Effect to call handleDateChange whenever date parts change
  React.useEffect(() => {
    handleDateChange();
  }, [year, month, day, isLunar]);

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="flex items-center space-x-2">
        <select value={isLunar ? 'lunar' : 'solar'} onChange={(e) => setIsLunar(e.target.value === 'lunar')} className="rounded-md border-gray-300 shadow-sm">
          <option value="solar">公历</option>
          <option value="lunar">农历</option>
        </select>
        <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} placeholder="年" className="w-24 rounded-md border-gray-300 shadow-sm" />
        <input type="number" value={month} onChange={(e) => setMonth(parseInt(e.target.value, 10))} placeholder="月" className="w-16 rounded-md border-gray-300 shadow-sm" />
        <input type="number" value={day} onChange={(e) => setDay(parseInt(e.target.value, 10))} placeholder="日" className="w-16 rounded-md border-gray-300 shadow-sm" />
      </div>
    </div>
  );
};
