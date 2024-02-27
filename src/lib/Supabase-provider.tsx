"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";

type SupabaseContext = {
	supabase: SupabaseClient;
    session?: Session | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
	const [supabase] = useState(() => createPagesBrowserClient());
	const router = useRouter();
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			router.refresh();
		});

		return () => subscription.unsubscribe();

	}, [router, supabase]);

	return (
		<Context.Provider value={{ supabase, session }}>
			<>{children}</>
		</Context.Provider>
	);
}

export const useSupabase = () => {
	const context = useContext(Context);

	if (context === undefined) {
		throw new Error("useSupabase must be used inside SupabaseProvider");
	}

	return context;
};
