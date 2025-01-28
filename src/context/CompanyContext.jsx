import { supabase } from "../api/auth";

export class Company {
  constructor(data = {}) {
    this.data = data;
  }

  async getInfo() {
    return await supabase
      .from("companies")
      .select()
      .eq("user_id", this.data.id)
      .limit(1);
  }

  async update(company_id) {
    return await supabase
      .from("companies")
      .update(this.data)
      .eq("id", company_id);
  }

  async create() {
    try {
      const res = await supabase.from("companies").insert(this.data);
      return res;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
}
