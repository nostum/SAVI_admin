"use client";

import { useSupabase } from "@/lib/Supabase-provider";
import { useEffect, useState } from "react";
import { Card, Flex, Metric, NumberInput, Subtitle, Text } from "@tremor/react";
import { useDashboard } from "./provider";

export default function ActiveUsers() {
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
		<Card>
			<Subtitle className="mb-3">Usuarios Activos</Subtitle>
      <Text>{dashboard?.dateRangePicker?.from?.toISOString() ?? ''}</Text>
			{/* <Text>Número  de usuarios que han realizado al menos X cantidad de ventas dentro del rango especificado.</Text> */}
			<Flex justifyContent="between" alignItems="center" className="space-x-2 mb-3">
				<Text>Minimo número de ventas:</Text>
				<NumberInput className="w-10" placeholder="ventas.." min={0} />
			</Flex>
			<Metric>9,876</Metric>
		</Card>
	);
}
