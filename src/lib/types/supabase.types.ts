import { Tables } from "./database.types";

export type itemImage = Tables<"item_image">;
export type Category = Tables<"item_category">;
export type User = Tables<"user">;
export type Catalog = Tables<"catalog">;
export type UserNotificationTokens = Tables<"user_notification_tokens">;
export type Notification = Tables<"notification">;
// Item with images
export type Item = Tables<"item"> & { item_image: itemImage[] };
