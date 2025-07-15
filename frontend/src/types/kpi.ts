export type DateRangeType = 'week' | 'month' | '3months' | 'custom';

export interface DateRangeOptions {
  type: DateRangeType;
  startDate?: Date;
  endDate?: Date;
}

export const PRESET_OPTIONS = [
  { value: 'week', label: 'Last Week' },
  { value: 'month', label: 'Last Month' },
  { value: '3months', label: 'Last 3M' }
] as const;

export type DataPoint = {
    x: Date;
    y: number;
  };
  
  export type GraphOption = {
    label: string;
    key: string;
    data: DataPoint[];
  };