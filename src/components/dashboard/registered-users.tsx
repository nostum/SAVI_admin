"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Card, Icon, Metric, Subtitle, Text} from "@tremor/react";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useSupabase } from "@/lib/Supabase-provider";
import { useDashboard } from "./provider";
import "react-loading-skeleton/dist/skeleton.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import InfoIcon from "../icons/InfoIcon";
import { EmailOutlined, Phone } from "@mui/icons-material";


type RegisteredUser = {
	provider: string,
	total_users: number
};
type registeredUserObject = RegisteredUser[];
	
export default function RegisteredUsers() {
	// Retrieve Supabase session and dashboard context
	const { session } = useSupabase();
	const dashboard = useDashboard();

	// State variables for retained users count and loading indicator
	const [registeredUsers, setRegisteredUsers] = useState<registeredUserObject>([]);
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	// Effect hook to fetch retained users when date range changes
	useEffect(() => {
		const { from, to } = dashboard?.dateRangePicker || {};

		if (from && session?.access_token) {
			getRegisteredUsers(from, to ?? new Date());
		} else {
			setRegisteredUsers([]);
			setTotalUsers(0);
		}
		

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dashboard?.dateRangePicker, session]);

	// Function to fetch retained users count from the API
	const getRegisteredUsers = async (startDate: Date, endDate: Date) => {
		setLoading(true);
		const params = {
			start_date: startDate.toISOString(),
			end_date: endDate.toISOString(),
		};

		const queryString = new URLSearchParams(params).toString();

		try {
			const response = await fetch(`/api/users/registered-users-count?${queryString}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.access_token}`,
				},
			});

			const data = await response.json();
		
			//get total users for each provider
			let totalUsers = 0;
			data.registeredUsers.map((registeredUser: RegisteredUser) =>
				totalUsers += registeredUser.total_users
			);
			setTotalUsers(totalUsers);

			setRegisteredUsers(data.registeredUsers ?? null);
		} catch (error) {
			console.error("Error fetching registered user count:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<div className="flex flex-col h-full justify-between">
				<div className="flex space-x-1.5 items-center">
					<Subtitle>Usuarios registrados</Subtitle>
					<div data-tooltip-id="my-tooltip-3">
						<InfoIcon />
					</div>
				</div>
				<Text className="flex items-center ">Totales: {loading ? <Skeleton width={80} height={30} count={1} /> : totalUsers}</Text>
				
				<Metric>{loading ? <Skeleton width={80} height={30} count={1} /> : 
				<span className="flex ">
					{registeredUsers.length > 0 ? (registeredUsers.map((registeredUsers : RegisteredUser, i: number) =>
					{
						if(registeredUsers.provider === null) return null
						return (
							<span key={i} className="flex space-x-1.5 items-center p-1" >
								 <span className="text-base" key={i}>{registeredUsers.provider==="email"?<EmailOutlined fontSize="large" />:<PhoneIphoneIcon fontSize="large" />} 
								 </span>
								<span>{registeredUsers.total_users}</span>
							
							
							</span>
						)
					})
					
					 ): 0}
					 </span>
				}</Metric>
			</div>
			<ReactTooltip id="my-tooltip-3" place="bottom" variant="info">
				<p>
					Usuarios que se han registrado <br />
					en la aplicación.
				</p>
			</ReactTooltip>
		</Card>
	);
}

const MailIcon=()=> {
	return (
		<svg className="h-8 w-8 text-black"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
	)
}
