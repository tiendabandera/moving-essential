import PhonePoolTable from "@/components/PhonePoolTable";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const LeadsPage = () => {
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const [records, setRecords] = useState([]);
  const { createUserInstance } = useAuth();
  const userInstance = createUserInstance({});

  useEffect(() => {
    const fetchRecords = async () => {
      if (paramsObject.id) {
        const res = await userInstance.getPhonePoolByField(
          "id",
          paramsObject.id
        );

        setRecords(res.data);
        return;
      }

      const res = await userInstance.getPhonePool();
      setRecords(res.data);
      return;
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Phone pool</h2>
      <div className="shadow-xs bg-background rounded-lg p-5">
        <PhonePoolTable records={records} setRecords={setRecords} />
      </div>
    </div>
  );
};

export default LeadsPage;
