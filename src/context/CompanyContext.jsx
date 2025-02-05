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

  async update(companyId, userId, uploadImages) {
    const countImages = this.data.companyInfo.business_type_id === 1 ? 6 : 7;
    const images = this.data.images;
    const resImages = [];

    for (let i = 1; i <= countImages; i++) {
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
        "company_images"
      );

      if (res) resImages.push(res);
    }

    if (resImages.length > 0) this.data.companyInfo[`images`] = resImages;

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
