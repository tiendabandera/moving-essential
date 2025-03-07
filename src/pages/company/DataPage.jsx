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
import { useOutletContext } from "react-router-dom";

const DataPage = () => {
  const { userInfo } = useOutletContext();

  const socialNetworks = [
    "facebook_link",
    "instagram_link",
    "twitter_link",
    "linkedin_link",
    "youtube_link",
    "tiktok_link",
  ];

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">Analytics information</h2>
      {/* <h3 className="font-medium">Main information</h3> */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <CardSummary
          icon={User}
          total={userInfo?.company.analytics[0].contact_button}
          avarage="10"
          title="Contact button"
          tooltipText="Number of people who clicked the contact button."
        />
        <CardSummary
          icon={Laptop2}
          total={userInfo?.company.analytics[0].internal_page}
          avarage="5"
          title="Internal page"
          tooltipText="Number of people who clicked on your page."
        />
        <CardSummary
          icon={CalendarCheck}
          total={userInfo?.company.analytics[0].get_a_quote}
          avarage="5"
          title="Get a quote"
          tooltipText="Number of people who submitted the quote form."
        />
        <CardSummary
          icon={Link}
          total={socialNetworks
            .map((network) => userInfo?.company.analytics[0][network] || 0)
            .reduce((acc, current) => acc + current, 0)}
          avarage="5"
          title="Social media links"
          tooltipText="Number of people who clicked on your social media links."
        />
      </div>
      <h3 className="mt-8 font-medium">Social media information</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <CardSummary
          icon={Facebook}
          total={userInfo?.company.analytics[0].facebook_link}
          avarage="5"
          title="Facebook link"
          tooltipText="Number of people who clicked the Facebook link."
        />
        <CardSummary
          icon={Instagram}
          total={userInfo?.company.analytics[0].instagram_link}
          avarage="5"
          title="Instagram link"
          tooltipText="Number of people who clicked the Instagram link."
        />
        <CardSummary
          icon={Linkedin}
          total={userInfo?.company.analytics[0].linkedin_link}
          avarage="5"
          title="Linkedin link"
          tooltipText="Number of people who clicked the Linkedin link."
        />
        <CardSummary
          icon={Youtube}
          total={userInfo?.company.analytics[0].youtube_link}
          avarage="5"
          title="Youtube link"
          tooltipText="Number of people who clicked the Youtube link."
        />
        <CardSummary
          icon={FaTiktok}
          total={userInfo?.company.analytics[0].tiktok_link}
          avarage="5"
          title="Tiktok link"
          tooltipText="Number of people who clicked the Tiktok link."
        />
        <CardSummary
          icon={FaXTwitter}
          total={userInfo?.company.analytics[0].twitter_link}
          avarage="5"
          title="Twitter link"
          tooltipText="Number of people who clicked the Twitter link."
        />
      </div>
    </div>
  );
};

export default DataPage;
