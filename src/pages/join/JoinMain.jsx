import { Button } from "@/components/ui/button";
import { House, UserRound } from "lucide-react";
import { Link, Outlet, useNavigate, useOutlet } from "react-router-dom";
import TypeWriterEffect from "@/components/design/TypeWriterEffect";
import Section from "@/components/Section";

const JoinMain = () => {
  const hasSubRoute = useOutlet();
  const navigate = useNavigate();

  return (
    <div>
      {!hasSubRoute ? (
        <div className="relative overflow-hidden">
          <Section className="overflow-hidden gap-20 py-10 md:gap-28 lg:py-20 xl:flex-row">
            <div className="hero-map" />
            <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
              <div>
                <h1 className="bold-52 lg:bold-88 text-transparent bg-clip-text bg-gradient-to-r from-color-1 to-orange-300 text-pretty tracking-tight">
                  Join the services that Moving Essential
                </h1>
                {/* <h2 className="bold-52 lg:bold-88 text-transparent bg-clip-text bg-gradient-to-r from-color-1 to-orange-300">
                  Moving Services
                </h2> */}
                <TypeWriterEffect
                  className="bold-52 lg:bold-88"
                  text={"Offers for you!"}
                />
              </div>
              <p className="regular-16 mt-11 text-gray-50 xl:max-w-[520px]">
                Join the services that Moving Essential offers for you and
                experience a seamless transition whether you&apos;re relocating
                or searching for your next home. From professional moving
                solutions to personalized real estate assistance, we are here to
                support every step of your journey with reliability, care, and
                expertise.
              </p>
              <div className="my-11 flex items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={`/assets/img/person-1.png`}
                    alt="Person-1"
                    className="w-10 h-10 rounded-full border-2 border-gray-10"
                  />
                  <img
                    src={`/assets/img/person-2.png`}
                    alt="Person-2"
                    className="w-10 h-10 rounded-full border-2 border-gray-10 ml-[-1.2rem]"
                  />
                  <img
                    src={`/assets/img/person-3.png`}
                    alt="Person-3"
                    className="w-10 h-10 rounded-full border-2 border-gray-10 ml-[-1.2rem]"
                  />
                  <img
                    src={`/assets/img/person-4.png`}
                    alt="Person-3"
                    className="w-10 h-10 rounded-full border-2 border-gray-10 ml-[-1.2rem]"
                  />
                </div>
                <span className="font-semibold">Come and join us</span>
              </div>
              <div className="flex flex-col w-full gap-3 sm:flex-row">
                <Button
                  className="bg-color-1 h-12 border border-color-1 rounded-full hover:bg-transparent hover:text-color-1"
                  onClick={() => navigate("/join/company")}
                >
                  <House /> Residentia/Local Moving
                </Button>
                <Button
                  className="bg-color-1 h-12 border border-color-1 rounded-full hover:bg-transparent hover:text-color-1"
                  onClick={() => navigate("/join/realtors")}
                >
                  <UserRound /> Realtors
                </Button>
              </div>
            </div>
            <div className="relative flex flex-1 items-start">
              <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-color-1 px-7 py-8">
                <div className="flex flex-col">
                  <div className="flex-between">
                    <p className="font-normal">Location</p>
                    <img
                      src="/assets/svg/close.svg"
                      alt="close"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="bold-20 text-white">5489 NW 27th St, Margate</p>
                </div>

                <div className="flex-between">
                  <div className="flex flex-col">
                    <p className="block font-normal">State</p>
                    <p className="bold-20 text-white">Florida</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="block font-normal">Zipcode</p>
                    <p className="bold-20 text-white">33063</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      ) : (
        <Outlet /> // Renderiza la subruta si existe
      )}
    </div>
  );
};

export default JoinMain;

{
  /* <section className="flex-col flex-center overflow-hidden bg-feature-bg bg-center bg-no-repeat lg:-mt-5">
          <div className="max-container padding-container relative w-full flex justify-end">
            <div className="flex flex-1 lg:min-h-[800px]">
              <img
                src="/assets/img/phone.png"
                alt="phone"
                width={380}
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
        </section> */
}
