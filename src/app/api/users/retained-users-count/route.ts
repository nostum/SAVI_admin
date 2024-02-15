import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { get_retained_users } from "@/modules/user";
import { User } from "@/lib/types/supabase.types";

export async function GET(_req: NextRequest) {
	const cookieStore = cookies();
	const supabaseClient = createRouteHandlerClient<Database>({
		cookies: () => cookieStore,
	});
	const params = _req.nextUrl.searchParams;


	const startDate = new Date(params.get("start_date") ?? '');
	const endDate = new Date(params.get("end_date") ?? '');

	if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
		return NextResponse.json({
			status: 400,
			message: {
				message: "Invalid request parameters."
			},
		});
	}

	const retainedUsers = await get_retained_users({ startDate, endDate });

	return NextResponse.json({
		retainedUsers: retainedUsers,
	});
}
