"use client";

import { es } from "date-fns/locale";
import { DateRangePicker, DateRangePickerItem, Grid, Text, Title } from "@tremor/react";
import ActiveUsers from "@/components/dashboard/active-users";
import { useDashboard } from "@/components/dashboard/provider";
import RetainedUsers from "@/components/dashboard/retained-users";
import RegisteredUsers from "@/components/dashboard/registered-users";
import AppDownloads from "@/components/dashboard/app-downloads";

export default function Page() {
	const dashboard = useDashboard();
	const currentDate = new Date();
	const last7Days = new Date();
	last7Days.setDate(currentDate.getDate() - 6)

	new Date().setDate(currentDate.getDate() - 6);
	const dateRangePickerOptions = [
		{
			key: "last7Days",
			value: "last7Days",
			from: last7Days, // Hace 6 días para incluir hoy en el rango de 7 días
			label: "Últimos 7 días",
		},
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
			key: "half2",
			value: "half2",
			from: new Date(currentDate.getFullYear(), 6, 1),
			to: new Date(currentDate.getFullYear(), 11, 31),

			label: "Segundo semestre",
		},

		{
			key: "q1",
			value: "q1",
			from: new Date(currentDate.getFullYear(), 0, 1),
			to: new Date(currentDate.getFullYear(), 2, 31),
			label: "Primer trimestre",
		},
		{
			key: "q2",
			value: "q2",
			from: new Date(currentDate.getFullYear(), 3, 1),
			to: new Date(currentDate.getFullYear(), 5, 30),
			label: "Segundo trimestre",
		},
		{
			key: "q3",
			value: "q3",
			from: new Date(currentDate.getFullYear(), 6, 1),
			to: new Date(currentDate.getFullYear(), 8, 30),
			label: "Tercer trimestre",
		},
		{
			key: "q4",
			value: "q4",
			from: new Date(currentDate.getFullYear(), 9, 1),
			to: new Date(currentDate.getFullYear(), 11, 31),
			label: "Cuarto trimestre",
		},
		{
			key: "alltime",
			value: "alltime",
			from: new Date(2022, 0, 1),
			label: "Todo el tiempo",

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
				selectPlaceholder="Seleccionar periodo"
				color="rose"
				enableYearNavigation
				maxDate={new Date()}
			>
				{dateRangePickerOptions.map((option) => (
					<DateRangePickerItem key={option.key} value={option.value} from={option.from} to={option.to}>
						{option.label}
					</DateRangePickerItem>
				))}
			</DateRangePicker>
			<Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-8">
				<AppDownloads />
				<RegisteredUsers />
				<ActiveUsers />
				<RetainedUsers />
			</Grid>
		</div>
	);
}
