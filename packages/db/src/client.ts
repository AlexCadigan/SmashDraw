import { createClient } from "@supabase/supabase-js";
import { Database } from "@db/types";
import { ENV } from "@shared/config";

export const supabaseAdmin = createClient<Database>(
    ENV.SUPABASE_URL,
    ENV.SERVICE_ROLE_API_KEY,
);
