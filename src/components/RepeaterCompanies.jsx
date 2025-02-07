import { useAuth } from "@/context/AuthContext";
import Section from "./Section";
import { Share } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const RepeaterCompanies = () => {
  const { createCompanyInstance } = useAuth();

  const pageSize = 8; // Cantidad de registros por carga
  const [records, setRecords] = useState([]); // Lista de registros
  const [offset, setOffset] = useState(0); // Controla desde dónde obtener los registros
  const [hasMore, setHasMore] = useState(false); // Verifica si hay más registros
  const effectRan = useRef(false);

  const company = createCompanyInstance({});
  const fetchRecords = async (newOffset) => {
    const { data, error } = await company.getAll(newOffset);

    if (error) {
      console.error("Error al obtener registros:", error);
      return;
    }

    setRecords((prev) => [...prev, ...data]);

    // Si la cantidad de datos obtenidos es menor al pageSize, no hay más registros
    if (data.length < pageSize) setHasMore(false);
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
            className="flex flex-col gap-3 items-center justify-center p-6 shadow-sm border border-gray-10 shadow-gray-300 rounded-2xl hover:shadow-lg hover:shadow-gray-400 transition"
          >
            <div className="relative w-full">
              <img
                src={record.images[0]}
                alt=""
                className="w-full h-60 object-cover rounded-2xl"
              />
              <Share
                strokeWidth={1}
                className="absolute top-2 right-2 w-6 h-6"
                color="#ea6020"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <h3 className="text-xl font-semibold">{record.company_name}</h3>
              <p className="text-base">{record.local_moving.slogan}</p>
              <p className="text-base">
                <span className="font-semibold">{record.cities.name}, </span>
                {record.state} {record.zipcode}
              </p>
              <p className="text-base font-semibold">How we charge:</p>
              <div className="flex text-base">
                {(record.local_moving.rate_type_id === 2 ||
                  record.local_moving.rate_type_id === 3) && <p>Flat rate</p>}

                {record.local_moving.rate_type_id === 3 && (
                  <span className="mx-2 font-semibold">/</span>
                )}

                {(record.local_moving.rate_type_id === 1 ||
                  record.local_moving.rate_type_id === 3) && <p>Hourly rate</p>}
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <Button
                className="w-full bg-color-1 border border-color-1 rounded-full hover:bg-transparent hover:text-color-1"
                onClick={() => {
                  window.location.href = `tel:${record.phone}`;
                }}
              >
                Call me
              </Button>
              <Button
                className="w-full bg-black border border-black rounded-full hover:bg-transparent hover:text-black"
                asChild
              >
                <Link to={`/local-moving/${record.id}`}>Contact</Link>
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
    </div>
  );
};

export default RepeaterCompanies;
