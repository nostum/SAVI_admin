"use client";

import { DateRangePickerValue } from "@tremor/react";
import { ReactNode, createContext, useContext, useState } from "react";

interface DashboardContextProps {
  setDateRange: (value: DateRangePickerValue) => void;
  dateRangePicker: DateRangePickerValue;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
	const [dateRangePicker, setDateRangePicker] = useState<DateRangePickerValue>({
		from: new Date(2024, 0, 1),
		to: new Date(),
	});

  const setDateRange = (value: DateRangePickerValue) => {
    setDateRangePicker(value);
  };

  return (
    <DashboardContext.Provider value={{ setDateRange, dateRangePicker }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
