import { supabase } from "../api/auth";

export class BaseModel {
  constructor(data = {}) {
    this.data = data;
  }

  async createNotification(user_id, type_id, message, link = null) {
    return await supabase.from("notifications").insert({
      user_id,
      type_id,
      message,
      link,
    });
  }
}
