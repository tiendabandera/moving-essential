import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import CustomIcon from "./design/CustomIcon";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const links = [
    {
      icon: Facebook,
      link: "https://www.facebook.com/people/Moving-Essential/61550915914049/?mibextid=LQQJ4d",
    },
    {
      icon: Youtube,
      link: "https://www.youtube.com/@MovingEssential",
    },
    {
      icon: Instagram,
      link: "https://www.instagram.com/movingessential/",
    },
  ];

  return (
    <footer className="bg-gray-100 flex flex-col items-center gap-5 py-8 px-5 lg:px-7 lg:items-start">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full">
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <div className="flex flex-col items-center lg:flex-row gap-x-2">
            <Link className="" to="/">
              <img
                src="/assets/img/logo.png"
                width={50}
                height={50}
                alt="Moving Essential"
              />
            </Link>
            <span className="text-base font-semibold">
              © {new Date().getFullYear()} MOVING ESSENTIAL
            </span>
          </div>
          <span className="text-sm font-light">info@movingessential.com</span>
          <div className="flex gap-2">
            {links.map((item, index) => {
              return (
                <Link key={index} to={item.link}>
                  <CustomIcon icon={item.icon} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="hidden lg:flex gap-x-20 pt-3">
          <div className="flex flex-col gap-2">
            <p className="text-base uppercase font-semibold">WORKING HOURS</p>
            <p className="text-sm font-light">Email 24/7</p>
            <p className="text-sm font-light">Direct call 24/7</p>
            <Link to="/contact" className="text-sm font-light underline">
              Support
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base uppercase font-semibold">SERVICES</p>
            <Link
              to="/local-moving/compare"
              className="text-sm font-light underline"
            >
              Residential/Local Moving
            </Link>
            <Link
              to="/realtors/compare"
              className="text-sm font-light underline"
            >
              Realtors
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base uppercase font-semibold">RESOURCES</p>
            <Link
              to="/tips"
              className="text-sm font-light underline text-red-600"
            >
              Tips
            </Link>
            <Link to="/faq" className="text-sm font-light underline">
              FAQs
            </Link>
            <Link
              to="https://b899f8ac-fabb-49ee-b6e9-5fb2c8e1a1da.usrfiles.com/ugd/9e7c89_498c01f821f046d6a1621f4b3f793a51.pdf"
              className="text-sm font-light underline"
            >
              Privacy policy
            </Link>
            <Link
              to="https://b899f8ac-fabb-49ee-b6e9-5fb2c8e1a1da.usrfiles.com/ugd/9e7c89_490235204d304bac91a49c35900a2324.pdf"
              className="text-sm font-light underline"
            >
              Term of use
            </Link>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-200" />
      <div>
        <span className="text-sm font-semibold">
          Website Created by{" "}
          <Link
            to="https://www.tiendabandera.com/"
            className="underline text-color-1 font-light"
          >
            tiendabandera.com
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
