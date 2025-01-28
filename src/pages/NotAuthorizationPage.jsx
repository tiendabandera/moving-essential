import curve from "../assets/img/curve.png";

const NotAuthorizationPage = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="container">
          <h1 className="font-extrabold h1 mb-6 text-center">
            You do not have permissions to access{" "}
            <span className="inline-block relative">
              this page!
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorizationPage;
