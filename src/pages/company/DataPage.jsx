import CardSummary from "../../components/design/CardSummary";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  User,
  Laptop2,
  CalendarCheck,
  Link,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const DataPage = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Analytics information</h2>
      {/* <h3 className="font-medium">Main information</h3> */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <CardSummary
          icon={User}
          total="6"
          avarage="10"
          title="Contact button"
          tooltipText="Number of people who clicked the contact button."
        />
        <CardSummary
          icon={Laptop2}
          total="2289"
          avarage="5"
          title="Internal page"
          tooltipText="Number of people who clicked on your page."
        />
        <CardSummary
          icon={CalendarCheck}
          total="3"
          avarage="5"
          title="Get a quote"
          tooltipText="Number of people who submitted the quote form."
        />
        <CardSummary
          icon={Link}
          total="1"
          avarage="5"
          title="Social media links"
          tooltipText="Number of people who clicked on your social media links."
        />
      </div>
      <h3 className="mt-8 font-medium">Social media information</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <CardSummary
          icon={Facebook}
          total="1"
          avarage="5"
          title="Facebook link"
          tooltipText="Number of people who clicked the Facebook link."
        />
        <CardSummary
          icon={Instagram}
          total="1"
          avarage="5"
          title="Instagram link"
          tooltipText="Number of people who clicked the Instagram link."
        />
        <CardSummary
          icon={Linkedin}
          total="1"
          avarage="5"
          title="Linkedin link"
          tooltipText="Number of people who clicked the Linkedin link."
        />
        <CardSummary
          icon={Youtube}
          total="1"
          avarage="5"
          title="Youtube link"
          tooltipText="Number of people who clicked the Youtube link."
        />
        <CardSummary
          icon={FaTiktok}
          total="1"
          avarage="5"
          title="Tiktok link"
          tooltipText="Number of people who clicked the Tiktok link."
        />
        <CardSummary
          icon={FaXTwitter}
          total="1"
          avarage="5"
          title="Twitter link"
          tooltipText="Number of people who clicked the Twitter link."
        />
      </div>
    </div>
  );
};

export default DataPage;
