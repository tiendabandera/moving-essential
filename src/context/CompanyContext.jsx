import { supabase } from "../api/auth";
import { BaseModel } from "./BaseModel";

export class Company extends BaseModel {
  constructor(data = {}, setErrorToast) {
    super(data, setErrorToast);
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

    // Validar si la empresa tiene premium features para agregar la segunda ubicación
    const { zipcode_2, city_2_id, state_2, ...rest } = this.data.companyInfo;

    const toUpdate = {
      data: rest,
      zipcode_2,
      city_2_id,
      state_2,
    };

    const validate = await supabase
      .from("premium_features")
      .select()
      .eq("company_id", companyId)
      .limit(1);

    if (validate.data.length > 0 && validate.data[0].is_active) {
      toUpdate.data["zipcode_2"] = zipcode_2 || null;
      toUpdate.data["city_2_id"] = city_2_id || null;
      toUpdate.data["state_2"] = state_2 || null;
    }

    // Actualizamos la empresa
    await supabase.from("companies").update(toUpdate.data).eq("id", companyId);

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
      .select(
        `*, premium_features:premium_features!premium_features_company_id_fkey(*), analytics:analytics!analitycs_company_id_fkey(*)`
      )
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
        `*, 
        service:${service}, 
        cities:cities!companies_city_id_fkey(name, state_id, county_name), 
        cities_2:cities!companies_city_2_id_fkey(name, state_id, county_name), 
        user_info:user_info!companies_user_id_fkey(user_metadata)`
      )
      .eq("id", this.data.id)
      .single();
  }

  async getRemainingCompanies() {}

  async getAllByBusinessType(offset, businessTypeId, filterParams) {
    const pageSize = 8;
    const service =
      businessTypeId === 1 ? "local_moving!inner(*)" : "realtors!inner(*)";

    const selectedField = `*, 
        service:${service}, 
        cities:cities!companies_city_id_fkey(name, state_id, county_name), 
        cities_2:cities!companies_city_2_id_fkey(name, state_id, county_name), 
        reviews:reviews!reviews_company_id_fkey(*), 
        user_info:user_info!companies_user_id_fkey(user_metadata)`;

    let query = supabase
      .from("companies")
      .select(selectedField)
      .eq("business_type_id", businessTypeId)
      .range(offset, offset + pageSize - 1);

    switch (filterParams.field) {
      case "company_name":
        query = query.ilike("company_name", `%${filterParams.value}%`);
        break;

      case "city":
        //   query = query
        //     /* .or(`name.ilike.%${filterParams.value}%`, {
        //   referencedTable: "cities",
        // }) */
        //     //.ilike("cities.name", `%${filterParams.value}%`)
        //     .or(`name.ilike.%${filterParams.value}%`, {
        //       referencedTable: "cities_2",
        //     })
        //     .or(`cities_2.not.is.null`);

        // Obtener empresas que tienen premium features
        var premiumFeaturesCity = await query
          .or(`name.ilike.%${filterParams.value}%`, {
            referencedTable: "cities_2",
          })
          .or(`cities_2.not.is.null`)
          .order("likes_count", { ascending: false });

        // Si no hay empresas con premium features, obtenemos el restante
        if (premiumFeaturesCity.data.length < 8) {
          const newOffset = offset > 0 ? offset - 8 : 0; // Calcula el nuevo punto de inicio

          let remainingCompanies = await supabase
            .from("companies")
            .select(selectedField)
            .eq("business_type_id", businessTypeId)
            .range(newOffset, newOffset + pageSize - 1)
            .ilike("cities.name", `%${filterParams.value}%`)
            .or(`cities.not.is.null`)
            .order("likes_count", { ascending: false });

          if (remainingCompanies.data.length > 0)
            premiumFeaturesCity.data.push(...remainingCompanies.data);
        }

        return premiumFeaturesCity;

      case "rate_type_id":
        query = query.or(
          `rate_type_id.eq.${filterParams.type}, rate_type_id.eq.3`,
          {
            referencedTable: "service",
          }
        );
        break;

      case "state":
        query = query.or(
          `state.eq.${filterParams.value}, state_2.eq.${filterParams.value}`
        );

        break;

      case "realtor_name":
        query = query
          .ilike("user_info.user_metadata->>name", `%${filterParams.value}%`)
          .not("user_info", "is", null);
        break;

      case "zipcode":
        // Obtener empresas que tienen premium features
        var premiumFeaturesZipcode = await query
          .or(
            `zipcodes.cs.{${filterParams.value}}, zipcodes_text.ilike.${filterParams.value}%`,
            {
              referencedTable: "cities_2",
            }
          )
          .not("cities_2", "is", null)
          .order("likes_count", { ascending: false });

        // Si no hay empresas con premium features, obtenemos el restante
        if (premiumFeaturesZipcode.data.length < 8) {
          const newOffset = offset > 0 ? offset - 8 : 0; // Calcula el nuevo punto de inicio

          let remainingCompanies = await supabase
            .from("companies")
            .select(selectedField)
            .eq("business_type_id", businessTypeId)
            .range(newOffset, newOffset + pageSize - 1)
            .or(
              `zipcodes.cs.{${filterParams.value}}, zipcodes_text.ilike.${filterParams.value}%`,
              {
                referencedTable: "cities",
              }
            )
            .not("cities", "is", null)
            .order("likes_count", { ascending: false });

          if (remainingCompanies.data.length > 0)
            premiumFeaturesZipcode.data.push(...remainingCompanies.data);
        }

        return premiumFeaturesZipcode;

      default:
        break;
    }

    return await query.order("likes_count", { ascending: false });
  }

  async getAllByBusinessTypeQueryParams(
    offset,
    businessTypeId,
    filterParams,
    offsetFeatures
  ) {
    // const pageSize = 8;
    // const service = businessTypeId === 1 ? "local_moving(*)" : "realtors(*)";

    // const isNumber = !isNaN(filterParams.placename);
    // const filter = isNumber
    //   ? `zipcodes.cs.{${filterParams.placename}}, zipcodes_text.ilike.${filterParams.placename}%`
    //   : `name.eq.${filterParams.placename}`;

    // const selectedField = `*,
    //     service:${service},
    //     cities:cities!companies_city_id_fkey(name, state_id, county_name),
    //     cities_2:cities!companies_city_2_id_fkey(name, state_id, county_name),
    //     reviews:reviews!reviews_company_id_fkey(*),
    //     user_info:user_info!companies_user_id_fkey(user_metadata)`;

    // const res = await supabase
    //   .from("companies")
    //   .select(selectedField)
    //   .eq("business_type_id", businessTypeId)
    //   .eq("cities.state_id", filterParams.state)
    //   .or(`${filter}, county_name.eq.${filterParams.county}`, {
    //     referencedTable: "cities",
    //   })
    //   .not("cities", "is", null)
    //   .range(offset, offset + pageSize - 1)
    //   .order("likes_count", { ascending: false });

    // // Ordenamos los resultados
    // res.data.sort((a, b) => {
    //   if (
    //     !isNumber &&
    //     a.cities.name === filterParams.placename &&
    //     b.cities.name !== filterParams.placename
    //   ) {
    //     return -1;
    //   }

    //   if (
    //     isNumber &&
    //     a.zipcode === filterParams.placename &&
    //     b.zipcode !== filterParams.placename
    //   ) {
    //     return -1;
    //   }

    //   return 0;
    // });

    // return {
    //   data: res.data,
    //   error: res.error,
    // };
    const pageSize = 8;
    const service = businessTypeId === 1 ? "local_moving(*)" : "realtors(*)";

    const isNumber = !isNaN(filterParams.placename);
    const filter = isNumber
      ? `zipcodes.cs.{${filterParams.placename}}, zipcodes_text.ilike.${filterParams.placename}%`
      : `name.eq.${filterParams.placename}`;

    const selectedField = `*, 
        service:${service}, 
        cities:cities!companies_city_id_fkey(name, state_id, county_name), 
        cities_2:cities!companies_city_2_id_fkey(name, state_id, county_name), 
        reviews:reviews!reviews_company_id_fkey(*), 
        user_info:user_info!companies_user_id_fkey(user_metadata)`;

    // Obtenemos las empresas con premium features
    const premiumFeatures = await supabase
      .from("companies")
      .select(selectedField)
      .eq("business_type_id", businessTypeId)
      .or(`state.eq.${filterParams.state}, state_2.eq.${filterParams.state}`)
      .or(`${filter}, county_name.eq.${filterParams.county}`, {
        referencedTable: "cities_2",
      })
      .not("cities_2", "is", null)
      .range(offset, offset + pageSize - 1)
      .order("likes_count", { ascending: false });

    let setOffsetFeatures = 0;
    let newOffsetEnd = 0;
    let newOffsetInit = 0;
    let addRemaining = false;

    if (premiumFeatures.data.length > 0 && premiumFeatures.data.length < 8) {
      newOffsetEnd = 8 - premiumFeatures.data.length - 1;
      setOffsetFeatures = newOffsetEnd; // Definimos el indice de inicio para la siguente consulta

      addRemaining = true;
    } else {
      newOffsetInit = offsetFeatures == 0 ? 0 : offsetFeatures + 1;
      newOffsetEnd = newOffsetInit + 8; // Definimos el indice final
      setOffsetFeatures = newOffsetEnd; // Asignar nuevo indice de inicio para la siguente consulta

      addRemaining = true;
    }

    // Obtenemos las empresas sin premium features y las agregamos
    if (addRemaining) {
      const remainingCompanies = await supabase
        .from("companies")
        .select(selectedField)
        .eq("business_type_id", businessTypeId)
        //.range(offset, newOffset + pageSize - offset)
        .range(newOffsetInit, newOffsetEnd)
        .or(`${filter}, county_name.eq.${filterParams.county}`, {
          referencedTable: "cities",
        })
        .not("cities", "is", null)
        .order("likes_count", { ascending: false });

      if (remainingCompanies.data.length > 0)
        premiumFeatures.data.push(...remainingCompanies.data);
    }

    // Ordenamos los resultados
    premiumFeatures.data.sort((a, b) => {
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
      data: premiumFeatures.data,
      error: premiumFeatures.error,
      newOffsetFeatures: setOffsetFeatures,
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
    const { user, company, ...res } = this.data;

    // Crear notificacion a la empresa
    await this.createNotification(
      company.user_id,
      3,
      `${user.name}, wrote a review of your company.`
    );

    return await supabase
      .from("reviews")
      .insert({ ...res, company_id: company.id })
      .select();
  }

  /* GET A QUOTE
  __________________________________________________ */

  async createQuote() {
    const insert = await supabase
      .from("leads")
      .insert({
        full_name: this.data.data.fullname,
        email: this.data.data.email,
        phone: this.data.data.phone,
        message: this.data.data.message,
        company_id: this.data.company.id,
      })
      .select()
      .single();

    if (insert.error) return insert.error;

    // Crear notificacion a la empresa
    await this.createNotification(
      this.data.company.user_id,
      1,
      `${this.data.data.fullname}, has contacted you! Check your email inbox.`,
      `/company/leads/my-leads?id=${insert.data.id}`
    );

    // Crear contacto en la integracion de CRM
    await supabase.functions.invoke("createLeadCRM", {
      body: { ...this.data.data, company_id: this.data.company.id },
    });

    return await supabase.functions.invoke("sendEmailToCompany", {
      body: { ...this.data, emails: [this.data.company.email] },
    });
  }

  /* ANALYTICS
  __________________________________________________ */
  async submitAnalytics(field_name, company_id = null) {
    return await supabase.rpc("update_or_insert_analytics", {
      p_company_id: company_id || this.data.id,
      p_field_name: field_name,
    });
  }

  /* LEADS ZONE
  __________________________________________________ */

  async getAllLeads() {
    return await supabase
      .from("leads")
      .select("*, created_at")
      .order("created_at", {
        ascending: false,
      });
  }

  async getLeadsByField(field, value) {
    return await supabase
      .from("leads")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .eq(field, value);
  }

  /* CANCEL RENEWAL
  __________________________________________________ */

  async cancelRenewal(message, subcription_id) {
    const insert = await supabase.from("membership_cancellation").insert({
      company_id: this.data.id,
      message: message,
    });

    if (insert.error) return insert.error;

    const res = await supabase
      .from("premium_features")
      .update({
        stop_payment: true,
      })
      .eq("subscription_id", subcription_id);

    if (res.error) return res.error;

    let body = {
      status: "CANCELLED",
      chargeSettings: {
        recurringInterval: "DAY",
        recurringIntervalCount: 1,
      },
    };

    return fetch(
      `https://app.ecwid.com/api/v3/95308313/subscriptions/${subcription_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_ECWID_SECRET_KEY,
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((result) => {
      if (result.ok) {
        return {
          message: "Renewal cancelled successfully",
          error: null,
        };
      }

      return {
        error: { message: "Something went wrong, please try again" },
      };
    });
  }

  /* CRM
  __________________________________________________ */
  async createIntegration() {
    const { data, error } = await supabase.functions.invoke("integrateCRM", {
      body: this.data,
    });

    if (error || data.error) {
      //console.log(await error.context.json());

      this.setErrorToast(
        "An error occurred while integrating the CRM, please validate the credentials."
      );
    }

    return {
      data: JSON.parse(data),
      error,
    };
  }

  async getIntegrationById(id) {
    return await supabase
      .from("crm")
      .select("id, created_at, platform, title, is_active")
      .eq("id", id)
      .order("created_at", {
        ascending: false,
      });
  }

  async getAllIntegrations() {
    return await supabase
      .from("crm")
      .select("id, created_at, platform, title, is_active")
      .order("is_active", {
        ascending: false,
      })
      .order("created_at", {
        ascending: false,
      });
  }

  async changeIntegrationStatus(id, isActive, companyId) {
    await supabase
      .from("crm")
      .update({ is_active: false })
      .eq("company_id", companyId);

    return await supabase
      .from("crm")
      .update({ is_active: isActive })
      .eq("id", id);
  }
}
