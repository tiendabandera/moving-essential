import { FadeIn } from "@/components/design/FadeIn";
import { List, ListItem } from "@/components/design/List";
import { StylizedImage } from "@/components/design/StylizedImage";
import Section from "@/components/Section";
import imgFAQs from "../assets/img/faqs.jpg";
import { faqs } from "@/constants";

const FAQsPage = () => {
  return (
    <div>
      <Section>
        <h1 className="bold-52 lg:bold-88 text-gray-900 ">
          Frequently Asked <br />
          <span className="text-pretty text-color-1">Questions</span>
        </h1>
        <div className="pt-20 lg:flex lg:justify-end">
          <div className="hidden lg:flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imgFAQs}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="lg:mt-16 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            {faqs.map((item) => (
              <ListItem key={item.title} title={item.title}>
                <div>{item.description}</div>
              </ListItem>
            ))}
          </List>
        </div>
      </Section>
    </div>
  );
};

export default FAQsPage;
