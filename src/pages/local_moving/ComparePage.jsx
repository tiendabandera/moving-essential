import SearchCompanies from "@/components/SearchCompanies";
import Section from "@/components/Section";
import { ChartNoAxesCombined, House, Smartphone } from "lucide-react";

const features = [
  {
    icon: House,
    title: "Local Mover Matching",
    description:
      "Our platform matches you with trusted local moving companies based on your specific needs and requirements. Say goodbye to endless searching for 'local movers near me' – we've got you covered.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Top Rated Companies",
    description:
      "We understand that every move is unique. That's why we offer a selection of moving companies that you can compare, like, and share with family and friends. Our like button feature allows you to prioritize your top choices, and see the top-rated companies in your area, ensuring you find the perfect fit for your moving needs.",
  },
  {
    icon: Smartphone,
    title: "Social Media",
    description:
      "We encourage you to explore the moving companies' social media profiles, and build trust in their reputation. By checking out their online presence, you can make a more informed decision about the company that best suits your needs.",
  },
];

function FeatureCard({ feature }) {
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl ring-1 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 ring-1 shadow-2xl ring-black/5">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-4 bg-gradient-to-r from-color-1 to-orange-300">
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">
              {feature.title}
            </h4>
          </div>
          <p className="mt-4 text-sm/6 text-gray-950/75">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const ComparePage = () => {
  return (
    <div>
      <Section
        classNameParent={
          "z-[10] relative -mt-1 lg:mt-0 py-20 bg-[url('/assets/img/compare-local-moving.jpg')] bg-cover bg-bottom bg-no-repeat before:absolute before:inset-0 before:bg-black/70"
        }
        className={"relative isolate gap-5"}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#fae04c] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="flex flex-col gap-5 xl:w-1/2">
          <div className="flex flex-col">
            <h1 className="bold-52 lg:bold-88 text-white ">Residential</h1>
            <h2 className="bold-52 lg:bold-88 text-transparent bg-clip-text bg-gradient-to-r from-color-1 to-orange-300 ">
              Local Moving
            </h2>
          </div>
          <p className="regular-16 text-white font-extralight text-justify ">
            At Moving Essential, we know that finding a reliable local moving
            company near you can be daunting. That’s why we’ve dedicated
            ourselves to connecting you with reputable movers in Florida,
            ensuring a seamless and stress-free moving experience.
          </p>
        </div>
        <SearchCompanies service="local-moving" />
      </Section>
      <Section>
        <div className="relative isolate">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-color-1/40">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
              className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#ffa845] to-[#fae04c] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="pt-36 pb-32 sm:pt-60 lg:pt-32">
              <div className="gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center justify-between">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h3 className="bold-40 lg:bold-64 tracking-tight text-pretty text-gray-900">
                    Why Choose Our Local Moving Services?
                  </h3>
                  <div className="mt-15 flex flex-col gap-2">
                    <h4 className="text-xl font-semibold text-gray-900">
                      Find Movers with Proven Expertise
                    </h4>
                    <p className="text-pretty !text-sm font-light text-gray-950/75 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                      Our network includes experienced moving professionals who
                      specialize in a wide range of moves, from small apartments
                      to larger homes. They are experts in efficient packing,
                      safe transportation, and adherence to local regulations,
                      ensuring a reliable and timely service for your move.
                    </p>
                  </div>
                  <div className="mt-15 flex flex-col gap-2">
                    <h4 className="text-xl font-semibold text-gray-900">
                      The Moving Difference
                    </h4>
                    <p className="text-pretty !text-sm font-light text-gray-950/75 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                      Moving is one of life’s most significant transitions, and
                      not all moving companies are created equal. Discover how
                      the experience and training of our local moving experts
                      can provide you with a smooth, stress-free relocation,
                      making the entire process as seamless as possible for you
                      and your family.
                    </p>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        alt="Compare Residential Local Moving"
                        src="/assets/img/local-moving/compare-1.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt="Compare Residential Local Moving"
                        src="/assets/img/local-moving/compare-2.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt="Compare Residential Local Moving"
                        src="/assets/img/local-moving/compare-3.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt="Compare Residential Local Moving"
                        src="/assets/img/local-moving/compare-4.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                    <div className="relative">
                      <img
                        alt="Compare Residential Local Moving"
                        src="/assets/img/local-moving/compare-1.jpg"
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section classNameParent={"pb-16"}>
        <h3 className="bold-40 lg:bold-64 tracking-tight text-pretty text-gray-900 lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
          Get Matched with Top Moving Companies in Seconds
        </h3>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ComparePage;
