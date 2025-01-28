import MyLeadsTable from "./components/MyLeadsTable";

const MyLeadsPage = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">My leads</h2>
      <div>
        <MyLeadsTable />
      </div>
    </div>
  );
};

export default MyLeadsPage;
