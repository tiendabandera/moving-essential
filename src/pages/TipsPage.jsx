import Section from "@/components/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    title: "Get Rid Of Unwanted Items",
    description: [
      "The best opportunity anyone has to thin down their belongings is during a move.",
      "There are big benefits to getting rid of unwanted items before the moving truck arrives: less to pack, less to physically move to a new location, and less to find a home for once you arrive at your new place.",
    ],
  },
  {
    title: "Keep All Moving Documents In One Place",
    description: [
      "It is important, however, to keep all of the documents necessary for your move such as address and utility information (or a laptop with this information) in one place and easily accessible on moving day itself. Don’t pack it away in a box; rather, find a safe place for it in the kitchen by your purse or in the glove box of your car.",
      "Taking this one step further, if utilizing professional movers, it is best practice to keep all your sensitive documents (passports, Social Security cards, marriage certificates, etc.) in a safe place and move this yourself as well. This way, you minimize the risk of it getting lost in the move or compromised in transit, and you’re able to ensure these important, hard-to-replace items stay safe.",
    ],
  },
  {
    title: "Start As Early As Possible",
    description: [
      "Moving is often touted as one of the most stressful experiences, but one of the primary ways to alleviate this stress is to start as early as possible and not wait until the last second.",
      "Begin a few weeks out to give yourself ample time to go through your items, pare down what you do or don’t need, and then pack thoughtfully and carefully.",
    ],
  },
  {
    title: "Find A Moving Truck With A Ramp",
    description: [
      "For individuals who are moving themselves, there are a number of ways to make the moving job itself mentally and physically easier. Renting a moving truck, especially one with a ramp, will make loading and unloading easier and save time as well.",
      "The ramp will also make an immense difference in how much time and effort it takes to load and unload large, heavy items plus save strain on your arms, knees and back.",
    ],
  },
  {
    title: "Use The Right Size Boxes",
    description: [
      "If you want to save money on a move, it’s easy to cut costs by reusing old boxes or taking recycled boxes from friends and neighbors.",
      "Wardrobe boxes can make moving lots of clothing a breeze.",
      "Heavier items are best packed in multiple, small boxes.",
      "Smaller, lighter items such as linens or kitchen utensils can be packed in large boxes and moved with ease.",
    ],
  },
  {
    title: "Save The Essentials For Last",
    description: [
      "Pack the essentials: only the items you truly use and touch every single day. Think about your bathroom essentials, shower curtain, the bedding on your bed, dishes and utensils, maybe the most heavily utilized pot and pan.",
      "By saving your essentials for last, you can ensure what you need to immediately function in your new home is packed away together and ready to unbox quickly upon arrival.",
    ],
  },
  {
    title: "Label Your Boxes With Detail",
    description: [
      "Packing by room and labeling appropriately is a smart move, but level up your efforts by doing a quick inventory of what is in each box and writing it on the side.",
      "A box labeled “Kitchen” could mean many things. You know what room it goes in, but what is really inside? Is it cookware? Spatulas? Small appliances? Kitchen towels? Labeling your boxes with detail will make finding what you need a breeze.",
    ],
  },
  {
    title: "Pack One Room At A Time",
    description: [
      "Starting a few weeks out, pack just one room at a time. Start packing away the items that aren’t used on a daily basis, such as extra towels and back stock of toiletry supplies in the bathroom, or books on the living room shelves, for example.",
      "Do the bathroom on a Monday, the living room on a Tuesday, and so on. Set aside just one hour and play fun music and see what you can get through in that time.",
    ],
  },
  {
    title: "Prepare A Moving Checklist",
    description: [
      "A moving checklist that contains a written reminder of every task that needs to be completed before the move can be particularly helpful for staying organized.",
    ],
  },
  {
    title: "PBO - Packed By Owner.",
    description: [
      "The items were packed by the customer instead of the moving company. The liability for a box that breaks during a move and is packed by the owner (PBO) can depend on the specific terms and conditions outlined in the moving company's contract. It's essential to review the agreement to understand the extent of the moving company's responsibility for items packed by the owner.",
    ],
  },
];

const TipsPage = () => {
  return (
    <div className="relative isolate px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#fae04c] to-[#ffa845] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl pt-10 lg:pt-16">
        <div className="text-center">
          <h1 className="bold-52 lg:bold-88 tracking-tight text-balance text-gray-900">
            Essential Tips & Questions
          </h1>
          <p className="mt-6 text-base/7 text-gray-600">
            Moving takes time, effort, and is definitely stressful. Luckily,
            these packing and moving tips can make this process easy.
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#] to-[#fae04c] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
      <Section classNameParent={"max-w-2xl mx-auto"} className={"gap-8"}>
        <div className="flex justify-center">
          <span className="inline-flex space-x-6 rounded-full bg-color-1/10 px-3 py-1 text-sm/6 font-semibold text-color-1 ring-1 ring-color-1/10 ring-inset">
            10 Top Packing and Moving Tips
          </span>
        </div>
        <div className="-m-2 grid grid-cols-1 rounded-4xl ring-1 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
          <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
            <div className="rounded-3xl bg-white p-10 pb-9 ring-1 shadow-2xl ring-black/5 flex flex-col gap-6">
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {item.description.map((description, index) => (
                          <p key={index}>{description}</p>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default TipsPage;
