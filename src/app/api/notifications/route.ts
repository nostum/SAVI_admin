import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { Database } from "@/lib/types/database.types";
import {
  getInactiveUsersNotificationsToken,
  getUsersWithoutProducts,
  getUsersWithoutProviders,
  getUsersWithoutClients,
  saveNotification,
} from "./supabase-queries";
import { UserNotificationTokens } from "@/lib/types/supabase.types";

const googleCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  : undefined;

// Check if the default app is already initialized
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(googleCredentials),
  });
}

/**
 * Handles a notification type and returns an array of notification tokens.
 *
 * @param {string} type - The type of notification.
 * @return {string[]} An array of notification tokens.
 */
const handleNotificationType = async (type: string) => {
  var notificationTokens: UserNotificationTokens[] = [];

  switch (type) {
    case "inactiveUsers":
      notificationTokens = await getInactiveUsersNotificationsToken();
      break;
    case "userWithoutProducts":
      notificationTokens = await getUsersWithoutProducts();
      break;
    case "userWithoutClients":
      notificationTokens = await getUsersWithoutClients();
      break;
    case "userWithoutProviders":
      notificationTokens = await getUsersWithoutProviders();
      break;
  }
  return notificationTokens;
};

/**
 * Handles a POST request and sends a multicast notification.
 *
 * @param {Request} req - the request object
 * @return {Promise} a Promise that resolves to a JSON response
 */
export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabaseClient = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const { data: activeSession } = await supabaseClient.auth.getSession();
    if (!activeSession.session) {
      return NextResponse.json({
        status: 401,
        message: {
          code: "Not authorized",
          message: "You are not authorized to perform this action",
        },
      });
    }

    //Get current user and check if user is an admin
    const { data: user } = await supabaseClient
      .from("user")
      .select("*")
      .single();
    if (user?.role !== "admin") {
      return NextResponse.json({
        status: 401,
        message: {
          code: "Unauthorized",
          message: "You are not authorized to perform this action",
        },
      });
    }

    const { notificationType, message } = await req.json();
    const { title, body, image } = message || {};

    // Obtain user tokens
    const notificationTokens = await handleNotificationType(notificationType);
    const registrationTokens: Set<string> = new Set();
    const userIds: Set<string> = new Set();

    // Get array of tokens and user ids
    notificationTokens.forEach(({ token, user_id }) => {
      if (token) registrationTokens.add(token);
      if (user_id) userIds.add(user_id);
    });
    const uniqueUserIds = Array.from(userIds);
    const uniqueTokens = Array.from(registrationTokens);

    const messageNotification = {
      title,
      body,
      image,
    };

    // Save notification
    const dbNotification = await saveNotification(
      { ...messageNotification, type: notificationType },
      uniqueUserIds,
    );

    const notification = {
      notification: messageNotification,
      data: {
        notificationId: dbNotification?.id?.toString() ?? "",
        type: notificationType,
      },
      tokens: uniqueTokens,
    };

    const response = await getMessaging().sendEachForMulticast(notification);

    if (response.failureCount > 0) {
      const failedTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(uniqueTokens[idx]);
        }
      });
      const validTokens = uniqueTokens.filter((token) => {
        return !failedTokens.includes(token);
      });
      return NextResponse.json({
        status: 200,
        message: {
          code: "200",
          message: `${response.successCount} messages were sent successfully`,
        },
        validTokens,
        failedTokens,
      });
    } else {
      return NextResponse.json({
        status: 200,
        message: {
          code: "200",
          message: `${response.successCount} messages were sent successfully`,
        },
        validTokens: uniqueTokens,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
