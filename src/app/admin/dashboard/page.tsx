"use client";

import { useSupabase } from "@/lib/Supabase-provider";
import { useEffect, useState } from "react";
import { es } from "date-fns/locale";
import { DateRangePicker, DateRangePickerItem, Grid, Text, Title } from "@tremor/react";
import ActiveUsers from "@/components/dashboard/active-users";
import { useDashboard } from "@/components/dashboard/provider";

export default function Page() {
	const { supabase } = useSupabase();
	const [session, setSession] = useState<any>(null);
	const dashboard = useDashboard();

	//get session from supabase
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			// getActiveUsers();
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<DateRangePickerItem key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
					Año actual
				</DateRangePickerItem>
				<DateRangePickerItem key="half" value="half" from={new Date(2023, 0, 1)} to={new Date(2023, 5, 31)}>
					Primer semestre
				</DateRangePickerItem>
			</DateRangePicker>
			<Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-8">
				<ActiveUsers />
			</Grid>
		</div>
	);
}
