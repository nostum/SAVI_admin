import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { getActiveUsers } from "@/modules/user";
import { User } from "@/lib/types/supabase.types";

export async function GET(_req: NextRequest) {
	const cookieStore = cookies();
	const supabaseClient = createRouteHandlerClient<Database>({
		cookies: () => cookieStore,
	});
  const params = _req.nextUrl.searchParams;
  let adminUser: User | null = null;

	const { data: activeSession } = await supabaseClient.auth.getSession();

  if(activeSession.session) {
    //Get current user and check if user is an admin
    const { data: user } = await supabaseClient
      .from("user")
      .select("*")
      .single();

    if (user?.role !== "admin") {
      adminUser = user;
    }
  }

	if (!activeSession.session || adminUser == null) {
		return NextResponse.json({
			status: 401,
			message: {
				code: "Not authorized",
				message: "You are not authorized to perform this action",
			},
		});
	}

  const startDate = new Date(params.get("start_date") ?? '');
  const endDate = new Date(params.get("end_date") ?? '');
  const minSales = parseInt(params.get("min_sales") ?? '');

  if (isNaN(startDate.getTime()) || isNaN(startDate.getTime()) || !Number.isInteger(minSales) ) {
    return NextResponse.json({
			status: 400,
			message: {
        message: "Invalid request parameters."
			},
		});
  }
    
  const activeUsers = await getActiveUsers({startDate, endDate, minSales});

	return NextResponse.json({
		activeUsers: activeUsers,
	});
}
