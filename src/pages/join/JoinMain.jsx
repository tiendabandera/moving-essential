import { Button } from "@/components/ui/button";
import { House, UserRound } from "lucide-react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import curve from "../../assets/img/curve.png";

const JoinMain = () => {
  const hasSubRoute = useOutlet();

  return (
    <div>
      {!hasSubRoute ? (
        <section className="flex-col flex-center overflow-hidden bg-feature-bg bg-center bg-no-repeat lg:-mt-5">
          <div className="max-container padding-container relative w-full flex justify-end">
            <div className="flex flex-1 lg:min-h-[900px]">
              <img
                src="/assets/img/phone.png"
                alt="phone"
                width={440}
                height={1000}
                className="feature-phone"
              />
            </div>
            <div className="z-20 flex w-full flex-col items-center justify-center lg:w-[60%] gap-12">
              <h2 className="bold-52 lg:bold-88 text-center lg:text-left">
                Join the services that Moving Essential
                <span className="inline-block relative">
                  offers for you.
                  <img
                    src={curve}
                    className="absolute top-full left-0 w-full"
                    width={624}
                    height={28}
                    alt="Curve"
                  />
                </span>{" "}
              </h2>
              <div className="flex flex-col gap-4 md:flex-row lg:self-start">
                <Link to="/join/company">
                  <Button className="bg-color-1 h-12 border border-color-1 rounded-full hover:bg-transparent hover:text-color-1">
                    <House />
                    Residential/Local Moving
                  </Button>
                </Link>
                <Link to="/join/realtors">
                  <Button className="bg-color-1 h-12 border border-color-1 rounded-full hover:bg-transparent hover:text-color-1">
                    <UserRound />
                    Realtors
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Outlet /> // Renderiza la subruta si existe
      )}
    </div>
  );
};

export default JoinMain;
