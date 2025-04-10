const MaintenancePage = () => {
  return (
    <div className="h-screen bg-slate-50 flex flex-col justify-center items-center gap-6 px-5">
      <h1 className="text-center w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl bold-40 lg:bold-64 tracking-tight text-pretty text-gray-900">
        The site is currently down for maintenance
      </h1>
      <p className="text-center text-xl text-gray-900">
        We apologize for any inconveniences caused
      </p>
      <div className="w-2/3 lg:w-1/5">
        <img
          src="/assets/img/maintenance.png"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default MaintenancePage;
