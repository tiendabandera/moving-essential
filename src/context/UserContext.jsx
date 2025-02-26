import { supabase } from "../api/auth";

export class User {
  constructor(data) {
    this.data = data;
  }

  async create() {
    const { error, data } = await supabase.auth.signUp({
      email: this.data.email,
      password: this.data.password,
      options: {
        data: {
          name: this.data.name,
          company_name: this.data.company_name,
          realtor_name: this.data.realtor_name,
          role: this.data.role, // Asegúrate de usar un valor válido: 'admin', 'user', o 'company'
        },
      },
    });

    if (data.user) {
      return data.user;
    }

    return {
      error: error.message,
    };
  }

  async update() {
    return await supabase.auth.updateUser({
      data: {
        name: this.data.name,
        company_name: this.data.company.company_name,
        realtor_name: this.data.realtor_name || null,
      },
    });
  }

  async login() {
    return await supabase.auth.signInWithPassword({
      email: this.data.email,
      password: this.data.password,
    });
  }

  async getUser() {
    return await supabase.auth.getUser();
  }

  async createRole() {
    return await supabase
      .from("user_roles")
      .insert({ user_id: this.data.id, role: "user" });
  }

  /* LIKES ZONE
  _________________________________________ */

  async getLikes() {
    return await supabase.from("likes").select("*");
  }

  async getVerifiedLike(company_id) {
    return await supabase
      .from("likes")
      .select("*")
      .eq("company_id", company_id)
      .eq("user_id", this.data.id);
  }

  async unlikeCompany(company_id) {
    await supabase.rpc("decrement_likes", { company_id_input: company_id });
    return await supabase.from("likes").delete().eq("company_id", company_id);
  }

  async likeCompany(company_id) {
    await supabase.rpc("increment_likes", { company_id_input: company_id });
    return await supabase
      .from("likes")
      .insert({ company_id: company_id, user_id: this.data.id });
  }
}
