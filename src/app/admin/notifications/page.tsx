"use client";


import NotificationForm from "@/components/notifications/notification-form";
import { useSupabase } from "@/lib/Supabase-provider";
import { useEffect, useState } from "react";

export default function Page() {
    const { supabase } = useSupabase();
    const [session, setSession] = useState<any>(null);

    //get session from supabase
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="w-full bg-white p-4 ">
            <h1 className="text-16 mb-4 mt-14 flex justify-center font-bold text-gray-800">
                Send new notification
            </h1>

            <NotificationForm session={session}></NotificationForm>
        </div>
    )
}

