import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import MyIntegrationsTable from "./components/MyIntegrationsTable";

const MyIntegrationsPage = () => {
  const { userInfo } = useOutletContext();
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const [records, setRecords] = useState([]);
  const { createCompanyInstance } = useAuth();
  const companyInstance = createCompanyInstance({});

  useEffect(() => {
    const fetchRecords = async () => {
      if (paramsObject.id) {
        const res = await companyInstance.getIntegrationById(paramsObject.id);
        setRecords(res.data);
        return;
      }

      const res = await companyInstance.getAllIntegrations();
      setRecords(res.data);
      return;
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">My integrations</h2>
      <div className="shadow-xs bg-background rounded-lg p-5">
        <MyIntegrationsTable
          records={records}
          setRecords={setRecords}
          company={userInfo?.company}
        />
      </div>
    </div>
  );
};

export default MyIntegrationsPage;
