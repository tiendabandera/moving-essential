import { supabase } from "../api/auth";

export class Company {
  constructor(data = {}) {
    this.data = data;
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

  /* GET ZONE
  __________________________________________________ */

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

  async getAll(offset) {
    const pageSize = 8;

    return await supabase
      .from("companies")
      .select(`*, local_moving(*), cities(name)`)
      .range(offset, offset + pageSize - 1)
      .order("created_at", { ascending: false });
  }

  async getById() {
    const service =
      this.data.business_type_id === 1 ? "local_moving(*)" : "realtors(*)";

    return await supabase
      .from("companies")
      .select(
        `*, service:${service}, cities(name), user_info:user_info!companies_user_id_fkey(user_metadata)`
      )
      .eq("id", this.data.id)
      .single();
  }

  async getAllByBusinessType(offset, businessTypeId, filterParams) {
    const pageSize = 8;
    const service =
      businessTypeId === 1 ? "local_moving!inner(*)" : "realtors!inner(*)";

    /* return await supabase
      .from("companies")
      .select(
        `*, service:${service}, cities(name), reviews:reviews!reviews_company_id_fkey(*), user_info:user_info!companies_user_id_fkey(user_metadata)`
      )
      .eq("business_type_id", businessTypeId)
      .range(offset, offset + pageSize - 1)
      .order("created_at", { ascending: false }); */

    let query = supabase
      .from("companies")
      .select(
        `*, service:${service}, cities!inner(name, state_id, county_name), reviews:reviews!reviews_company_id_fkey(*), user_info:user_info!companies_user_id_fkey(user_metadata)`
      )
      .eq("business_type_id", businessTypeId)
      .range(offset, offset + pageSize - 1);

    switch (filterParams.field) {
      case "company_name":
        query = query.ilike("company_name", `%${filterParams.value}%`);
        break;

      case "city":
        query = query.ilike("cities.name", `%${filterParams.value}%`);
        break;

      case "rate_type_id":
        query = query.or(
          `rate_type_id.eq.${filterParams.type}, rate_type_id.eq.3`,
          {
            referencedTable: "service",
          }
        );
        break;

      case "state":
        query = query.eq("state", `${filterParams.value}`);
        break;

      default:
        break;
    }

    return await query;
  }

  async getAllByBusinessTypeQueryParams(offset, businessTypeId, filterParams) {
    const pageSize = 8;
    const service = businessTypeId === 1 ? "local_moving(*)" : "realtors(*)";

    const isNumber = !isNaN(filterParams.placename);
    const filter = isNumber
      ? `zipcodes.cs.{${filterParams.placename}}, zipcodes_text.ilike.${filterParams.placename}%`
      : `name.eq.${filterParams.placename}`;

    const res = await supabase
      .from("companies")
      .select(
        `*, service:${service}, cities!inner(name, state_id, county_name), reviews:reviews!reviews_company_id_fkey(*), user_info:user_info!companies_user_id_fkey(user_metadata)`
      )
      .eq("business_type_id", businessTypeId)
      .eq("cities.state_id", filterParams.state)
      .or(`${filter}, county_name.eq.${filterParams.county}`, {
        referencedTable: "cities",
      })
      .range(offset, offset + pageSize - 1)
      .order("created_at", { ascending: false });

    // Ordenamos los resultados
    res.data.sort((a, b) => {
      if (
        !isNumber &&
        a.cities.name === filterParams.placename &&
        b.cities.name !== filterParams.placename
      ) {
        return -1;
      }

      if (
        isNumber &&
        a.zipcode === filterParams.placename &&
        b.zipcode !== filterParams.placename
      ) {
        return -1;
      }

      return 0;
    });

    return {
      data: res.data,
      error: res.error,
    };
  }

  /* REVIEWS ZONE
  __________________________________________________ */

  async getAllReviews() {
    const { data } = await supabase
      .from("reviews")
      .select(
        "*, company:companies(business_type_id), user_info(user_metadata)"
      )
      .eq("company_id", this.data.id);

    const { data: totalRating } = await supabase.rpc("get_total_rating", {
      company_id_param: this.data.id,
    });

    return {
      data,
      totalRating,
    };
  }

  async createReview() {
    return await supabase.from("reviews").insert(this.data).select();
  }
}
