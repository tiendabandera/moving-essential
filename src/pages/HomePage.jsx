import Section from "../components/Section";
import curve from "../assets/img/curve.png";
import Button from "../components/Button";

const HomePage = () => {
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      //crosses
      //crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="compare"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="font-extrabold h1 mb-6">
            Compare Moving services near you{" "}
            <span className="inline-block relative">
              Today!{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 font-normal max-w-3xl mx-auto mb-6 text-n-5 lg:mb-8">
            Find reputable realtors and movers near you to ease the burden. Just
            let us know about your move to get NO-COST moving quotations.
            Compare costs and get in touch with movers or realtors near your
            area.
          </p>
          <Button href="https://www.movingessential.com/services" orange>
            Explore evething we have for you
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/300] lg:aspect-[1024/490]">
                <img
                  src="https://static.wixstatic.com/media/9e7c89_01e67f88a71446f1876c00770369e514~mv2.jpg"
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="Moving Essential"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HomePage;
