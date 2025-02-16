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

    const service =
      companyInfo.data[0].business_type_id === 1 ? "local_moving" : "realtors";

    const serviceInfo = await supabase
      .from(service)
      .select()
      .eq("company_id", companyInfo.data[0].id)
      .limit(1);

    return {
      companyInfo: companyInfo.data[0],
      serviceInfo: serviceInfo.data[0],
    };
  }

  async update(companyId, userId, uploadImages) {
    const setupUpload = {
      countImages: this.data.companyInfo.business_type_id === 1 ? 6 : 7,
      bucketName:
        this.data.companyInfo.business_type_id === 1
          ? "company_images"
          : "realtor_images",
    };

    const images = this.data.images;
    const resImages = [];

    for (let i = 1; i <= setupUpload.countImages; i++) {
      if (!images[`img_${i}`]) continue;

      const image = images[`img_${i}`];

      // Validamos si no actualizo la imagen
      if (!image || typeof image !== "object") {
        resImages.push(image);
        continue;
      }

      const res = await uploadImages(
        `${userId}/img_${i}`,
        image,
        setupUpload.bucketName
      );

      if (res) resImages.push(res);
    }

    if (resImages.length > 0) this.data.companyInfo[`images`] = resImages;

    await supabase
      .from("companies")
      .update(this.data.companyInfo)
      .eq("id", companyId);

    const service =
      this.data.companyInfo.business_type_id === 1
        ? "local_moving"
        : "realtors";

    return await supabase
      .from(service)
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
    if (businessTypeId == 1) {
      // For Company
      return await supabase.from("local_moving").insert(data);
    } else if (businessTypeId == 2) {
      // For Realtor
      const res = await supabase.from("realtors").insert(data);
      console.log(res);

      return res;
    }
  }

  async getAll(offset) {
    const pageSize = 8;

    return await supabase
      .from("companies")
      .select(`*, local_moving(*), cities(name)`)
      .range(offset, offset + pageSize - 1)
      .order("created_at", { ascending: false });
  }

  async getAllByBusinessType(offset, businessTypeId) {
    const pageSize = 8;

    return await supabase
      .from("companies")
      .select(`*, local_moving(*), cities(name)`)
      .eq("business_type_id", businessTypeId)
      .range(offset, offset + pageSize - 1)
      .order("created_at", { ascending: false });
  }

  async getById() {
    return await supabase
      .from("companies")
      .select(`*, local_moving(*), cities(name)`)
      .eq("id", this.data.id)
      .single();
  }

  /* REVIEWS ZONE
  __________________________________________________ */

  async getAllReviews() {
    return await supabase
      .from("reviews")
      .select("*, companies(company_name), user_info(user_metadata)");
  }

  async createReview() {
    return await supabase.from("reviews").insert(this.data).select();
  }
}
