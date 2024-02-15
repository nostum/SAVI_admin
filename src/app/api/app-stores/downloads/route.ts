import { getTotalAppStoreDownloads, getTotalPlayStoreDownloads } from "@/modules/app-stores";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_req: NextRequest) {
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

    const totalPlayStoreDownloads = await getTotalPlayStoreDownloads({ startDate, endDate });
    const totalAppStoreDownloads = await getTotalAppStoreDownloads({ startDate, endDate });

    const totalDownloads = totalPlayStoreDownloads + totalAppStoreDownloads;

    return NextResponse.json({
        totalPlayStoreDownloads: totalPlayStoreDownloads,
        totalAppStoreDownloads: totalAppStoreDownloads,
        totalDownloads: totalDownloads
    });

}


