import { useAuth } from "@/context/AuthContext";
import Section from "./Section";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import ShareCompany from "./ShareCompany";
import { MessageSquareQuote, SquareArrowOutUpRight } from "lucide-react";
import FilterSectionCompanies from "./FilterSectionCompanies";
import { AnonymousView } from "./AnonymousView";
import LikeCompany from "./LikeCompany";

const RepeaterCompanies = ({
  filterSection = false,
  filterQueryParams = {},
  className = "",
}) => {
  const navigate = useNavigate();
  const { createCompanyInstance, createUserInstance, user } = useAuth();
  const [isOpenAnonymous, setIsOpenAnonymous] = useState(null);
  const [userLikes, setUserLikes] = useState(new Set());

  const pageSize = 8; // Cantidad de registros por carga
  const [records, setRecords] = useState([]); // Lista de registros
  const [offset, setOffset] = useState(0); // Controla desde dónde obtener los registros
  const [offsetFeatures, setOffsetFeatures] = useState(0); // Controla desde dónde obtener los registros restantes

  const [hasMore, setHasMore] = useState(false); // Verifica si hay más registros
  const effectRan = useRef(false); // Realizar una sola consulta a la base de datos
  const [selectedCompany, setSelectedCompany] = useState(null); // Abrir pop up de share
  const [filterParams, setFilterParams] = useState({}); // Almacena el filtro actual

  const company = createCompanyInstance({});

  const fetchRecords = async (newOffset, params) => {
    let response = {
      data: [],
      error: null,
    };

    if (
      Object.keys(filterQueryParams).length > 0 &&
      Object.keys(params).length === 0
    ) {
      const { data, error, newOffsetFeatures } =
        await company.getAllByBusinessTypeQueryParams(
          newOffset,
          1,
          filterQueryParams,
          offsetFeatures
        );

      response.data = data;
      response.error = error;

      if (newOffsetFeatures > 0) {
        setOffsetFeatures(newOffsetFeatures);
      }
    } else {
      const { data, error } = await company.getAllByBusinessType(
        newOffset,
        1,
        params
      );

      response.data = data;
      response.error = error;
    }

    if (response.error) {
      console.error("Error al obtener registros:", response.error);
      return;
    }

    setRecords((prev) => [...prev, ...response.data]);

    // Si la cantidad de datos obtenidos es menor al pageSize, no hay más registros
    if (response.data.length < pageSize) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  };

  useEffect(() => {
    Object.keys(filterParams).length > 0 && fetchRecords(0, filterParams);

    if (!effectRan.current) {
      fetchRecords(0, filterParams);
      effectRan.current = true; // Marca que el efecto ya corrió
    }
  }, [filterParams]);

  const handleFilterChange = (value, newFilterParams) => {
    setRecords([]); // Reinicia la lista
    setOffset(0); // Reinicia el offset
    setFilterParams({ value, ...newFilterParams }); // Aplica el nuevo filtro
  };

  const loadMore = () => {
    const newOffset = offset + pageSize; // Calcula el nuevo punto de inicio
    setOffset(newOffset);
    fetchRecords(newOffset, filterParams);
  };

  useEffect(() => {
    if (!user) return;

    const fetchLikes = async (user) => {
      const userInstance = createUserInstance(user);
      const { data } = await userInstance.getLikes();

      setUserLikes(new Set(data.map((like) => like.company_id)));
    };

    fetchLikes(user);
  }, [user]);

  return (
    <div className="flex flex-col gap-8 items-center">
      {filterSection && (
        <FilterSectionCompanies onFilterChange={handleFilterChange} />
      )}
      <Section customPadding className={className}>
        <div className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {records.map((record, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 items-center justify-center p-6 cursor-pointer shadow-2xs border border-gray-10 shadow-gray-300 rounded-2xl hover:shadow-lg hover:shadow-gray-400 transition"
              onClick={() => {
                navigate(`/local-moving/${record.id}`);
              }}
            >
              <div className="relative w-full">
                <img
                  src={record.images[0]}
                  alt=""
                  className="w-full h-60 object-cover rounded-2xl"
                />
                <div className="absolute top-2 right-2 rounded-lg p-1 border border-gray-10 bg-white shadow-lg">
                  <SquareArrowOutUpRight
                    strokeWidth={1}
                    className="w-5 h-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCompany(record);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 text-center">
                <h3 className="text-xl font-semibold">{record.company_name}</h3>
                <p>{record.service.slogan}</p>
                <p>
                  <span className="font-semibold">{record.cities.name}, </span>
                  {record.state} {record.zipcode}
                </p>
                {record.has_premium_features && (
                  <p>
                    <span className="font-semibold">
                      {record.cities_2.name},{" "}
                    </span>
                    {record.state_2} {record.zipcode_2}
                  </p>
                )}
                <p className="font-semibold">How we charge:</p>
                <div className="flex">
                  {(record.service.rate_type_id === 2 ||
                    record.service.rate_type_id === 3) && <p>Flat rate</p>}

                  {record.service.rate_type_id === 3 && (
                    <span className="mx-2 font-semibold">/</span>
                  )}

                  {(record.service.rate_type_id === 1 ||
                    record.service.rate_type_id === 3) && <p>Hourly rate</p>}
                </div>
              </div>
              <div className="w-full flex justify-between gap-2 h-9 px-14 py-2 bg-slate-100 rounded-3xl">
                <LikeCompany
                  company={record}
                  isLiked={user ? userLikes.has(record.id) : false}
                  setUserLikes={setUserLikes}
                  userLikes={userLikes}
                  setIsOpenAnonymous={setIsOpenAnonymous}
                />
                <div className="flex gap-2 items-center">
                  <MessageSquareQuote
                    strokeWidth={1}
                    className="w-6 h-6 text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/local-moving/${record.id}#form-reviews`);
                    }}
                  />
                  <p>{record.reviews.length}</p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <Button
                  className="w-full bg-color-1 border border-color-1 rounded-full hover:bg-transparent hover:text-color-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `tel:${record.phone}`;
                  }}
                >
                  Call me
                </Button>
                <Button
                  className="w-full bg-black border border-black rounded-full hover:bg-transparent hover:text-black"
                  asChild
                >
                  <Link
                    to={`/local-moving/${record.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      company.submitAnalytics("contact_button", record.id);
                    }}
                  >
                    Contact
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
      {hasMore && (
        <Button
          className="bg-color-1 h-12 border border-color-1 rounded-full hover:bg-transparent hover:text-color-1"
          onClick={loadMore}
        >
          See more
        </Button>
      )}
      {selectedCompany && (
        <ShareCompany
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
      {isOpenAnonymous && (
        <AnonymousView isOpen={isOpenAnonymous} onClose={setIsOpenAnonymous} />
      )}
    </div>
  );
};

export default RepeaterCompanies;
