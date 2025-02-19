import { useAuth } from "@/context/AuthContext";
import Section from "./Section";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import ShareCompany from "./ShareCompany";
import {
  GraduationCap,
  Heart,
  MessageSquareQuote,
  SquareArrowOutUpRight,
} from "lucide-react";

const RepeaterRealtors = () => {
  const navigate = useNavigate();
  const { createCompanyInstance } = useAuth();

  const pageSize = 8; // Cantidad de registros por carga
  const [records, setRecords] = useState([]); // Lista de registros
  const [offset, setOffset] = useState(0); // Controla desde dónde obtener los registros
  const [hasMore, setHasMore] = useState(false); // Verifica si hay más registros
  const effectRan = useRef(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const company = createCompanyInstance({});
  const fetchRecords = async (newOffset) => {
    const { data, error } = await company.getAllByBusinessType(newOffset, 2);
    console.log(data);

    if (error) {
      console.error("Error al obtener registros:", error);
      return;
    }

    setRecords((prev) => [...prev, ...data]);

    // Si la cantidad de datos obtenidos es menor al pageSize, no hay más registros
    if (data.length < pageSize) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  };

  useEffect(() => {
    if (!effectRan.current) {
      fetchRecords(0);
      effectRan.current = true; // Marca que el efecto ya corrió
    }
  }, []);

  const loadMore = () => {
    const newOffset = offset + pageSize; // Calcula el nuevo punto de inicio
    setOffset(newOffset);
    fetchRecords(newOffset);
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <Section
        className={`grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 gap-4`}
        customPaddings
      >
        {records.map((record, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 items-center justify-center p-6 cursor-pointer shadow-2xs border border-gray-10 shadow-gray-300 rounded-2xl hover:shadow-lg hover:shadow-gray-400 transition"
            onClick={() => {
              navigate(`/realtors/${record.id}`);
            }}
          >
            <div className="relative w-full">
              <img
                src={record.images[0]}
                alt=""
                className="w-full h-70 object-cover rounded-2xl"
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
              <h3 className="text-xl font-semibold">
                {record.user_info.user_metadata.realtor_name}
              </h3>
              <p className="text-base">{record.company_name}</p>
              <div className="flex gap-3 items-center">
                <GraduationCap strokeWidth={2} className="w-5 h-5" />
                <p className="text-base">{record.service.title_work}</p>
              </div>

              <p className="text-base">
                <span className="font-semibold">{record.cities.name}, </span>
                {record.state} {record.zipcode}
              </p>
            </div>
            <div className="w-full flex justify-between gap-2 h-9 px-14 py-2 bg-slate-100 rounded-3xl">
              <div className="flex gap-2 items-center">
                <Heart strokeWidth={1} className="w-6 h-6 text-red-600" />
                <p>5</p>
              </div>
              <div className="flex gap-2 items-center">
                <MessageSquareQuote
                  strokeWidth={1}
                  className="w-6 h-6 text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/realtors/${record.id}#form-reviews`);
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
                  to={`/realtors/${record.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default RepeaterRealtors;
