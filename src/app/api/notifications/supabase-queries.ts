import { createClient } from "@supabase/supabase-js";
import { Database, TablesInsert } from "@/lib/types/database.types";
import { UserNotificationTokens } from "@/lib/types/supabase.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : "";
const serviceRole = process.env.SUPABASE_SERVICE_ROLE
  ? process.env.SUPABASE_SERVICE_ROLE
  : "";

const getInactiveUsersNotificationsToken = async () => {
  try {
    const supabaseClient = createClient<Database>(supabaseUrl, serviceRole);

    const { data } = await supabaseClient
      .rpc("get_user_notification_tokens")
      .returns<UserNotificationTokens[]>();

    return data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getUsersWithoutProducts = async () => {
  try {
    const supabaseClient = createClient<Database>(supabaseUrl, serviceRole);
    const { data } = await supabaseClient
      .rpc("get_users_without_products_notification_tokens")
      .returns<UserNotificationTokens[]>();

    return data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getUsersWithoutClients = async () => {
  try {
    const supabaseClient = createClient<Database>(supabaseUrl, serviceRole);
    const { data } = await supabaseClient
      .rpc("get_users_without_clients_notification_tokens")
      .returns<UserNotificationTokens[]>();

    return data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getUsersWithoutProviders = async () => {
  try {
    const supabaseClient = createClient<Database>(supabaseUrl, serviceRole);
    const { data } = await supabaseClient
      .rpc("get_users_without_providers_notification_tokens")
      .returns<UserNotificationTokens[]>();

    return data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saveNotification = async (
  notification: TablesInsert<"notification">,
  userIds: string[],
) => {
  const supabaseClient = createClient<Database>(supabaseUrl, serviceRole);

  const { data } = await supabaseClient
    .from("notification")
    .insert(notification)
    .select()
    .single();

  const userNotifications = userIds.map((userId) => ({
    user_id: userId,
    notification_id: data?.id as number,
    viewed: false,
  }));

  await supabaseClient
    .from("user_notification_state")
    .insert([...userNotifications]);

  return data;
};

export {
  getInactiveUsersNotificationsToken,
  getUsersWithoutProducts,
  getUsersWithoutClients,
  getUsersWithoutProviders,
  saveNotification,
};
