"use server";
import supabase from "@/lib/supabase";

export const getActiveUsers = async ({
	startDate,
	endDate,
	minSales,
}: {
	startDate: Date;
	endDate: Date;
	minSales: number;
}) => {
	const result = await supabase.rpc("get_active_users_count", {
		start_date: startDate.toISOString(),
		end_date: endDate.toISOString(),
		min_sales: minSales,
	});
	return result.data ?? 0;
};

export const get_retained_users = async ({
	startDate,
	endDate,
}: {
	startDate: Date;
	endDate: Date;
}) => {
	const result = await supabase.rpc("get_retained_users_count", {
		start_date: startDate.toISOString(),
		end_date: endDate.toISOString(),
	});
	return result.data ?? 0;
};
