"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Card, Flex, Metric, NumberInput, Subtitle, Text } from "@tremor/react";
import { useSupabase } from "@/lib/Supabase-provider";
import { useDashboard } from "./provider";
import "react-loading-skeleton/dist/skeleton.css";


export default function ActiveUsers() {
	// Retrieve Supabase session and dashboard context
	const { session } = useSupabase();
	const dashboard = useDashboard();

	// State variables for active users count, minimum sales, and loading indicator
	const [activeUsers, setActiveUsers] = useState<number>(0);
	const [minSales, setMinSales] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);

	// Effect hook to fetch active users when date range or minimum sales change
	useEffect(() => {
		const { from, to } = dashboard?.dateRangePicker || {};

		if (from && session?.access_token) {
			getActiveUsers(from, to ?? new Date());
		} else {
			setActiveUsers(0);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dashboard?.dateRangePicker, session, minSales]);

	// Function to fetch active users from the API
	const getActiveUsers = async (startDate: Date, endDate: Date) => {
		setLoading(true);
		const params = {
			start_date: startDate.toISOString(),
			end_date: endDate.toISOString(),
			min_sales: minSales.toString(),
		};

		const queryString = new URLSearchParams(params).toString();

		try {
			const response = await fetch(`/api/users/active-user-count?${queryString}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.access_token}`,
				},
			});

			const data = await response.json();

			// Update activeUsers state with the fetched data
			setActiveUsers(data.activeUsers ?? 0);
		} catch (error) {

			console.error("Error fetching active user count:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<Subtitle>Usuarios Activos</Subtitle>

			{/* <Text>Número  de usuarios que han realizado al menos X cantidad de ventas dentro del rango especificado.</Text> */}
			<Flex justifyContent="between" alignItems="center" className="space-x-2 mb-3">
				<Text>Minimo número de ventas:</Text>
				<NumberInput
					className="w-10"
					min={1}
					required={true}
					value={minSales <= 0 ? "" : minSales}
					onValueChange={(number) => {
						if (isNaN(number)) {
							setMinSales(0);
						} else {
							setMinSales(number);
						}
					}}
				/>
			</Flex>
			<Metric>{loading ? <Skeleton width={80} height={30} count={1} /> : activeUsers}</Metric>
		</Card>
	);
}
