interface ConfigInterface {
    publicRootDomain: string;
    publicSupabaseUrl: string;
    supabaseServiceRole: string;
    cache: ConfigCache;
    gcloudCredentials: JSON
    dataLakeProjectId: string
}

interface ConfigCache {
    revalidate: number | false;
    secure: boolean;
}

const config: ConfigInterface = {
    // These variables can be used on the client side
    publicRootDomain: process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "",
    publicSupabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",

    // These environment variables are only available in the Node.js environment
    supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE ?? "",
    cache: {
        revalidate: !isNaN(Number(process.env.REVALIDATE_INTERVAL)) &&
            Number(process.env.REVALIDATE_INTERVAL) >= 0
            ? Number(process.env.REVALIDATE_INTERVAL)
            : false,
        secure: process.env.NODE_ENV === "production",
    },
    gcloudCredentials: JSON.parse(process.env.GCLOUD_CREDENTIALS ?? ""),
    dataLakeProjectId: process.env.DATALAKE_PROJECTID ?? ""
};

export default config;
