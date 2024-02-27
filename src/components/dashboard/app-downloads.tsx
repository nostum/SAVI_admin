import { Card, Metric, Subtitle, Text } from "@tremor/react";
import InfoIcon from "../icons/InfoIcon";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useDashboard } from "./provider";
import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/Supabase-provider";
import Skeleton from "react-loading-skeleton";
import AppStoreIcon from "../icons/AppStoreIcon";
import PlayStoreIcon from "../icons/PlayStoreIcon";


interface TotalStoresDownloads {
    totalDownloads: number,
    totalAppStoreDownloads: number;
    totalPlayStoreDownloads: number;
};



export default function AppDownloads() {

    const { session } = useSupabase();
    const dashboard = useDashboard();

    const [downloads, setDownloads] = useState<TotalStoresDownloads>({ totalDownloads: 0, totalAppStoreDownloads: 0, totalPlayStoreDownloads: 0 });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const { from, to } = dashboard?.dateRangePicker || {};

        if (from && session?.access_token) {
            getTotalDownloads(from, to ?? new Date())
        } else {
            setDownloads({ totalDownloads: 0, totalAppStoreDownloads: 0, totalPlayStoreDownloads: 0 });
        }

    }, [dashboard?.dateRangePicker, session])


    /// Function to fetch total app store and play store downloads from the API
    const getTotalDownloads = async (startDate: Date, endDate: Date) => {
        setLoading(true);
        const params = {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
        };

        const queryString = new URLSearchParams(params).toString();

        try {
            const response = await fetch(`/api/app-stores/downloads?${queryString}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.access_token}`,
                },
            });
            const data = await response.json() as TotalStoresDownloads;

            console.log("downloads__", data);

            // Update totalDownloads state with the fetched data
            setDownloads(data);
        } catch (error) {
            console.error("Error fetching retained user count:", error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <Card>
            <div className="flex flex-col h-full justify-between">
                <div className="flex space-x-1.5 items-center">
                    <Subtitle>Descargas</Subtitle>
                    <div data-tooltip-id="my-tooltip-app-downloads">
                        <InfoIcon />
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2"><AppStoreIcon height={25} width={25} /><span className="text-base"> {loading ? <Skeleton width={80} height={30} count={1} /> : downloads.totalAppStoreDownloads} </span></div>
                    <div className="flex items-center gap-2"><PlayStoreIcon height={25} width={25} /><span className="text-base">{loading ? <Skeleton width={80} height={30} count={1} /> : downloads.totalPlayStoreDownloads}</span> </div>
                </div>
                <div className="flex items-center gap-2">
                </div>

                <Metric>{loading ? <Skeleton width={80} height={30} count={1} /> : downloads.totalDownloads}</Metric>

            </div>
            <ReactTooltip id="my-tooltip-app-downloads" place="bottom" variant="info">
                <p>
                    Total de descargas de App Store y Google Play Store
                </p>
            </ReactTooltip>

        </Card>
    )
}

