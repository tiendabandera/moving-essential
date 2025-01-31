import { supabase } from "../api/auth";

export class Company {
  constructor(data = {}) {
    this.data = data;
  }

  async getInfo() {
    const companyInfo = await supabase
      .from("companies")
      .select()
      .eq("user_id", this.data.id)
      .limit(1);

    const serviceInfo = await supabase
      .from("local_moving")
      .select()
      .eq("company_id", companyInfo.data[0].id)
      .limit(1);

    return {
      companyInfo: companyInfo.data[0],
      serviceInfo: serviceInfo.data[0],
    };
  }

  async update(companyId) {
    await supabase
      .from("companies")
      .update(this.data.companyInfo)
      .eq("id", companyId);

    return await supabase
      .from("local_moving")
      .update(this.data.serviceInfo)
      .eq("company_id", companyId);
  }

  async create() {
    try {
      const res = await supabase.from("companies").insert(this.data).select();
      return res;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  async createService(businessTypeId, data) {
    // For Company
    if (businessTypeId == 1) {
      return await supabase.from("local_moving").insert(data);
    }
  }
}
