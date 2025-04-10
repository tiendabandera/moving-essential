import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppealsTable from "./components/AppealsTable";

const AppealsPage = () => {
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const [records, setRecords] = useState([]);
  const { createUserInstance } = useAuth();

  useEffect(() => {
    const userInstance = createUserInstance({});

    const fetchRecords = async () => {
      if (paramsObject.id) {
        const res = await userInstance.getAppealReviewsByField(
          "id",
          paramsObject.id
        );

        setRecords(res.data);
        return;
      }

      const res = await userInstance.getAppealReviews();
      setRecords(res.data);
      return;
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Appeal reviews</h2>
      <div className="shadow-xs bg-background rounded-lg p-5">
        <AppealsTable records={records} setRecords={setRecords} />
      </div>
    </div>
  );
};

export default AppealsPage;
