import Button from "../Button";

const CardBenefit = ({ title, description, className, icon: Icon }) => {
  return (
    <div
      className={`block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] ${
        className || ""
      }`}
      //style={{ backgroundImage: `url(./src/assets/svg/benefit.svg)` }}
    >
      <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
        <h5 className="text-lg font-semibold mb-4">{title}</h5>
        <p className="mb-4">{description}</p>
        <div className="flex m-auto items-center justify-between w-full">
          <div className="p-3 bg-black rounded-lg">
            <Icon strokeWidth={2} color="#ffffff" className="w-5 h-5" />
          </div>
          <div>
            <Button orange>Learn more</Button>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0.5 bg-slate-100"
        style={{ clipPath: "url(#benefits)" }}
      >
        <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
          <img
            src="https://jsm-brainwave.com/assets/image-2-DhSZK1Xt.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <svg className="block" width={0} height={0}>
        <clipPath id="benefits" clipPathUnits="objectBoundingBox">
          <path d="M0.079,0 h0.756 a0.079,0.083,0,0,1,0.058,0.026 l0.086,0.096 A0.079,0.083,0,0,1,1,0.179 V0.917 c0,0.046,-0.035,0.083,-0.079,0.083 H0.079 c-0.044,0,-0.079,-0.037,-0.079,-0.083 V0.083 C0,0.037,0.035,0,0.079,0" />
        </clipPath>
      </svg>
    </div>
  );
};

export default CardBenefit;
