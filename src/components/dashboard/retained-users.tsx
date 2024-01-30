"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Card, Metric, Subtitle } from "@tremor/react";
import { useSupabase } from "@/lib/Supabase-provider";
import { useDashboard } from "./provider";
import "react-loading-skeleton/dist/skeleton.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import InfoIcon from "../icons/InfoIcon";

export default function RetainedUsers() {
	// Retrieve Supabase session and dashboard context
	const { session } = useSupabase();
	const dashboard = useDashboard();

	// State variables for retained users count and loading indicator
	const [retainedUsers, setRetainedUsers] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	// Effect hook to fetch retained users when date range changes
	useEffect(() => {
		const { from, to } = dashboard?.dateRangePicker || {};

		if (from && session?.access_token) {
			getRetainedUsers(from, to ?? new Date());
		} else {
			setRetainedUsers(0);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dashboard?.dateRangePicker, session]);

	// Function to fetch retained users count from the API
	const getRetainedUsers = async (startDate: Date, endDate: Date) => {
		setLoading(true);
		const params = {
			start_date: startDate.toISOString(),
			end_date: endDate.toISOString(),
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

			// Update activeUsers state with the fetched data
			setRetainedUsers(data.retainedUsers ?? 0);
		} catch (error) {
			console.error("Error fetching retained user count:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<div className="flex flex-col h-full justify-between">
				<div className="flex space-x-1.5 items-center">
					<Subtitle>Retención de usuarios</Subtitle>
					<div data-tooltip-id="my-tooltip-2">
						<InfoIcon />
					</div>
				</div>
				<Metric>{loading ? <Skeleton width={80} height={30} count={1} /> : retainedUsers}</Metric>
			</div>
			<ReactTooltip id="my-tooltip-2" place="bottom" variant="info">
				<p>
					Usuarios que han registrado ventas<br />
					al menos una vez cada 7 días a lo largo<br />
					de todo el periodo especificado.
				</p>
			</ReactTooltip>
		</Card>
	);
}
