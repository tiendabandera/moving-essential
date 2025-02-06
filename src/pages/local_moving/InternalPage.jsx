import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InternalPage = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const params = useParams();
  const { createCompanyInstance } = useAuth();

  useEffect(() => {
    const loadCompany = async () => {
      if (params.id) {
        const { data, error } = await createCompanyInstance({
          id: params.id,
        }).getById();

        if (error) navigate("/not-found");

        console.log(data);

        setCompany(data);
      }
    };
    loadCompany();
  }, []);

  return (
    <div>
      <img src={company?.images[0]} alt="" className="w-full h-[570px]" />
      <section className="max-container padding-container flex flex-col gap-20 py-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2">
            {<h1 className="bold-52">{company?.company_name}</h1>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternalPage;
