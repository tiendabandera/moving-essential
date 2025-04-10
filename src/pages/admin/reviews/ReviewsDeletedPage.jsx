import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import ReviewsTable from "./components/ReviewsTable";

const ReviewsDeletedPage = () => {
  const [records, setRecords] = useState([]);
  const { createCompanyInstance } = useAuth();

  useEffect(() => {
    const companyInstance = createCompanyInstance({});

    const fetchRecords = async () => {
      const res = await companyInstance.getDeletedReviews();
      setRecords(res.data);
      return;
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Reviews Deleted</h2>
      <div className="shadow-xs bg-background rounded-lg p-5">
        <ReviewsTable records={records} setRecords={setRecords} />
      </div>
    </div>
  );
};

export default ReviewsDeletedPage;
