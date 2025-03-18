import { supabase } from "../api/auth";
import { BaseModel } from "./BaseModel";

export class User extends BaseModel {
  constructor(data = {}) {
    super(data);
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

  async update(updateUser = false, uploadImages) {
    if (updateUser) {
      const image = this.data.profile_picture;
      let resImage = null;
      // Validamos si actualizo la imagen
      if (image || typeof image == "object") {
        resImage = await uploadImages(
          `${this.data.id}/profile_picture`,
          image,
          "users"
        );
      }

      return await supabase.auth.updateUser({
        data: {
          name: this.data.name,
          profile_picture: resImage,
        },
      });
    }

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

  /* LEADS ZONE
  _________________________________________ */

  async getPhonePool() {
    return await supabase.from("phone_pool").select("*").order("created_at", {
      ascending: false,
    });
  }

  async getPhonePoolByField(field, value) {
    return await supabase
      .from("phone_pool")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .eq(field, value);
  }

  async createPhonePool(data) {
    const { first_name, last_name, phone } = data;

    // Filtrar valores null o undefined
    const insertData = {};
    insertData.phone = phone;

    if (first_name) insertData.first_name = first_name;
    if (last_name) insertData.last_name = last_name;

    const res = await supabase
      .from("phone_pool")
      .insert(insertData)
      .select()
      .single();

    if (res.data) {
      const companies = await supabase
        .from("premium_features")
        .select("*, company:companies!inner(*)")
        .eq("company.business_type_id", 1)
        .eq("notification_pool", true);

      if (companies.data.length > 0) {
        const users_id = companies.data.map((record) => record.company.user_id);

        await this.createNotifications(
          users_id,
          4,
          `Moving Essential, would like to notify you that the LEADS pool has been updated.`,
          `/company/leads/phone-pool?id=${res.data.id}`
        );
      }
    }

    return res;
  }
}
