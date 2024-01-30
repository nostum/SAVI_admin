"use client";

import { es } from "date-fns/locale";
import { DateRangePicker, DateRangePickerItem, Grid, Text, Title } from "@tremor/react";
import ActiveUsers from "@/components/dashboard/active-users";
import { useDashboard } from "@/components/dashboard/provider";
import RetainedUsers from "@/components/dashboard/retained-users";

export default function Page() {
	const dashboard = useDashboard();
  const currentDate = new Date();
  const last7Days  = new Date();
  last7Days.setDate(currentDate.getDate() - 6)

  new Date().setDate(currentDate.getDate() - 6);
	const dateRangePickerOptions = [
		{
			key: "ytd",
			value: "ytd",
			from: new Date(currentDate.getFullYear(), 0, 1),
			label: "Año actual",
		},
		{
			key: "half",
			value: "half",
			from: new Date(currentDate.getFullYear(), 0, 1),
			to: new Date(currentDate.getFullYear(), 5, 31),
			label: "Primer semestre",
		},
    {
      key: "last7Days",
      value: "last7Days",
      from: last7Days, // Hace 6 días para incluir hoy en el rango de 7 días
      label: "Últimos 7 días",
    },
	];

	return (
		<div className="w-full bg-white p-5">
			<Title className="mb-4">Dashboard</Title>
			<Text className="mb-2">Seleciona un periodo o un rango de fechas: </Text>
			<DateRangePicker
				value={dashboard?.dateRangePicker}
				onValueChange={dashboard?.setDateRange}
				locale={es}
				selectPlaceholder="Seleccionar"
				color="rose"
			>
				{dateRangePickerOptions.map((option) => (
					<DateRangePickerItem key={option.key} value={option.value} from={option.from} to={option.to}>
						{option.label}
					</DateRangePickerItem>
				))}
			</DateRangePicker>
			<Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-8">
				<ActiveUsers />
				<RetainedUsers />
			</Grid>
		</div>
	);
}
