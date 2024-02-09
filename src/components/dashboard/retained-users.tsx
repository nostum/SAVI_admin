"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Card, Flex, Metric, NumberInput, Subtitle, Text } from "@tremor/react";
import { useSupabase } from "@/lib/Supabase-provider";
import { useDashboard } from "./provider";
import "react-loading-skeleton/dist/skeleton.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import InfoIcon from "../icons/InfoIcon";

interface RetainedUsers {
	irregular_count: number;
	regular_count: number;
}

export default function RetainedUsers() {
	// Retrieve Supabase session and dashboard context
	const { session } = useSupabase();
	const dashboard = useDashboard();

	// State variables for retained users count and loading indicator
	const [retainedUsers, setRetainedUsers] = useState<RetainedUsers>({ irregular_count: 0, regular_count: 0 });
	const [minSales, setMinSales] = useState<number>(5);
	const [minDistinctDays, setMinDistinctDays] = useState<number>(2);
	const [loading, setLoading] = useState<boolean>(true);

	// Effect hook to fetch retained users when date range changes
	useEffect(() => {
		const { from, to } = dashboard?.dateRangePicker || {};

		if (from && session?.access_token) {
			getRetainedUsers(from, to ?? new Date());
		} else {
			setRetainedUsers({ irregular_count: 0, regular_count: 0 });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dashboard?.dateRangePicker, session, minSales, minDistinctDays]);

	// Function to fetch retained users count from the API
	const getRetainedUsers = async (startDate: Date, endDate: Date) => {
		setLoading(true);
		const params = {
			start_date: startDate.toISOString(),
			end_date: endDate.toISOString(),
			min_sales: minSales.toString(),
			min_distinct_days: minDistinctDays.toString(),
		};

		const queryString = new URLSearchParams(params).toString();

		try {
			const response = await fetch(`/api/users/retained-users-count?${queryString}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.access_token}`,
				},
			});

			const data = await response.json();

			console.log(data);

			// Update activeUsers state with the fetched data
			setRetainedUsers(data.retainedUsers);
		} catch (error) {
			console.error("Error fetching retained user count:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<div className="flex flex-col h-full justify-between">
				<div className="flex space-x-1.5 items-center mb-2">
					<Subtitle>Retención de usuarios</Subtitle>
					<div data-tooltip-id="my-tooltip-2">
						<InfoIcon />
					</div>
				</div>
				<div className="flex gap-8 flex-wrap mb-4">
					<div className="flex flex-col flex-1">
						<Text className="mb-1">Minimo numero de ventas:</Text>
						<NumberInput
							min={1}
							required={true}
							value={minSales <= 0 ? "" : minSales}
							onValueChange={(number) => {
								setMinSales(isNaN(number) ? 0 : number);
							}}
						/>
					</div>
					<div className="flex flex-col flex-1 justify-between">
						<div className="mb-1 flex">
							<Text>Días de actividad</Text>
							<div className="ml-1" data-tooltip-id="my-tooltip-3">
								<InfoIcon />
							</div>
							<Text>:</Text>
						</div>
						<NumberInput
							min={1}
							required={true}
							value={minDistinctDays <= 0 ? "" : minDistinctDays}
							onValueChange={(number) => {
								setMinDistinctDays(isNaN(number) ? 0 : number);
							}}
						/>
						<ReactTooltip id="my-tooltip-3" place="bottom" variant="info">
							<p>
								Este parámetro determina el número mínimo<br />
								de días en los cuales un usuario debio registrar<br />
								ventas para ser clasificado como &quot;regular&quot;.<br />
							</p>
						</ReactTooltip>
					</div>
				</div>
				<div className="flex space-x-6">
					<div className="flex items-center space-x-2">
						{/* <GroupRemoveIcon /> */}
						<Text>Usuarios iregulares: </Text>
						<Metric>{loading ? <Skeleton width={80} height={30} count={1} /> : retainedUsers.irregular_count}</Metric>
					</div>
					<div className="flex items-center space-x-2">
						{/* <GroupAddIcon /> */}
						<Text>Usuarios regulares: </Text>
						<Metric>{loading ? <Skeleton width={80} height={30} count={1} /> : retainedUsers.regular_count}</Metric>
					</div>
				</div>
			</div>
			<ReactTooltip id="my-tooltip-2" place="bottom" variant="info">
				<p>
					Usuarios que han registrado ventas
					<br />
					al menos una vez cada 7 días a lo largo
					<br />
					de todo el periodo especificado.
				</p>
			</ReactTooltip>
		</Card>
	);
}
