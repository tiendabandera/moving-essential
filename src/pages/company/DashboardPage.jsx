import CardSummary from "../../components/desing/CardSummary";

import {
  User,
  Laptop2,
  CalendarCheck,
  Link,
  Building2,
  Image,
} from "lucide-react";

import CustomIcon from "@/components/desing/CustomIcon";
import FormCompany from "@/components/forms/FormCompany";
import { useOutletContext } from "react-router-dom";

const DashboardPage = () => {
  const { userInfo } = useOutletContext();

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Dashboard</h2>
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
      <div className="grid grid-cols-1 mt-10 gap-y-10 xl:grid-cols-3 md:gap-x-10">
        <div className="col-span-2">
          <div className="shadow-sm bg-background rounded-lg p-5">
            <div className="flex gap-x-2 items-center">
              <CustomIcon icon={Building2} />
              <h3 className="font-medium">Company information</h3>
            </div>
            <div className="mt-7">
              <FormCompany userInfo={{ ...userInfo }} />
            </div>
          </div>
        </div>
        <div>
          <div className="shadow-sm bg-background rounded-lg p-5">
            <div className="flex gap-x-2 items-center">
              <CustomIcon icon={Image} />
              <h3 className="font-medium">Images</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
