import { useEffect, useState } from "react";
import MyInteractions from "./components/MyInteractions";
import { supabase } from "@/api/auth";

const InteractionsPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const res = await supabase
        .from("likes")
        .select(
          "*, company:companies(*, user_info:user_info!companies_user_id_fkey(user_metadata))"
        );
      setRecords(res.data);
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Interactions</h2>
      <MyInteractions records={records} />
    </div>
  );
};

export default InteractionsPage;
