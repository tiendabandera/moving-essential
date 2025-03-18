import PhonePoolTable from "@/components/PhonePoolTable";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const PhonePoolPage = () => {
  const [records, setRecords] = useState([]);
  const { createUserInstance } = useAuth();
  const userInstance = createUserInstance({});

  useEffect(() => {
    const fetchRecords = async () => {
      const res = await userInstance.getPhonePool();
      setRecords(res.data);
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

export default PhonePoolPage;
