"use client";



import { Sidebar } from "@/components/common/sidebar";
import { useSupabase } from "@/lib/Supabase-provider";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useState } from "react";


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const { supabase } = useSupabase();

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="flex h-screen">
            <Sidebar handleSignOut={handleSignOut}></Sidebar>
            <div className="flex min-h-screen flex-grow bg-gray-50 ">
                {children}
            </div>
        </div>
    );
}