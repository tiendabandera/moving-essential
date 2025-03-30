import { supabase } from "../api/auth";

export class BaseModel {
  constructor(data = {}, setErrorToast) {
    this.data = data;
    this.setErrorToast = setErrorToast;
  }

  async createNotification(user_id = [], type_id, message, link = null) {
    return await supabase.from("notifications").insert({
      user_id,
      type_id,
      message,
      link,
    });
  }

  async createNotifications(users_id, type_id, message, link = null) {
    let toInsert = [];

    users_id.forEach((user_id) => {
      toInsert.push({ user_id, type_id, message, link });
    });

    return await supabase.from("notifications").insert(toInsert);
  }

  async getAllNotifications() {
    return await supabase
      .from("notifications")
      .select("*, notifications_types(name)")
      .order("created_at", {
        ascending: false,
      });
  }
}
