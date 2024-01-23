import { createClient } from "@supabase/supabase-js";

import config from "./config"
import { Database } from "./types/database.types";

const supabase = createClient<Database>(
    config.publicSupabaseUrl ?? "",
    config.supabaseServiceRole ?? "",
    {
        auth: {
            persistSession: false,
        },
    },
);

export default supabase;
