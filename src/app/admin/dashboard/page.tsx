"use client";


import NotificationForm from "@/components/notifications/notification-form";
import { useSupabase } from "@/lib/Supabase-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

    const router = useRouter();
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
            Working on it....
        </div>
    )
}

