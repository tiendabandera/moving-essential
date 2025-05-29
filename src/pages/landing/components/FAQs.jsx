import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = ({ title, options = [] }) => {
  return (
    <div className="w-full flex flex-col gap-12">
      <h2 className="bold-32 lg:bold-52 xl:max-w-3xl text-white">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {options.map((option, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger className="text-lg text-white data-[state=open]:text-black">
              {option.question}
            </AccordionTrigger>
            <AccordionContent>{option.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQs;
