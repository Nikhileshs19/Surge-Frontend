import { useState } from 'react';
import { DateRangeType, DateRangeOptions } from '../types/kpi';

export const useDateRange = (initialRange: DateRangeOptions) => {
  const [dateRange, setDateRange] = useState<DateRangeType>(initialRange.type);
  const [startDate, setStartDate] = useState<Date | null>(initialRange.startDate || new Date());
  const [endDate, setEndDate] = useState<Date | null>(initialRange.endDate || new Date());
  const [showDateMenu, setShowDateMenu] = useState(false);

  const handlePresetSelect = (preset: DateRangeType) => {
    const end = new Date();
    const start = new Date();
    
    switch(preset) {
      case 'week':
        start.setDate(start.getDate() - 7);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 1);
        break;
      case '3months':
        start.setMonth(start.getMonth() - 3);
        break;
    }
    
    setStartDate(start);
    setEndDate(end);
    setDateRange(preset);
    setShowDateMenu(false);
  };
  const handleCustomRange = () => {
    setDateRange('custom');
    setShowDateMenu(false);
  };

  return {
    dateRange,
    startDate,
    endDate,
    showDateMenu,
    setStartDate,
    setEndDate,
    setDateRange,
    setShowDateMenu,
    handlePresetSelect,
    handleCustomRange
  };
};