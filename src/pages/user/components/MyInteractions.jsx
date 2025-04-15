import { MailIcon, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyInteractions = ({ records }) => {
  const navigate = useNavigate();
  const handleRedirect = (company) => {
    const service =
      company.business_type_id === 1 ? "local-moving" : "realtors";
    navigate(`/${service}/${company.id}`);
  };

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {records.map(({ company, ...rest }) => (
          <li
            key={company.email}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm cursor-pointer hover:shadow-lg"
            onClick={() => handleRedirect(company)}
          >
            <div className="flex flex-1 flex-col p-8">
              <img
                alt=""
                src={company.images[0]}
                className="mx-auto size-32 shrink-0 rounded-full object-cover ring-1 ring-gray-200"
              />
              <h3 className="mt-6 font-medium text-gray-900">
                {company.business_type_id === 1
                  ? company.company_name
                  : company.user_info.user_metadata.name}
              </h3>
              <dl className="mt-1 flex grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">
                  {company.business_type_id === 1
                    ? "Residential/Local Moving"
                    : "Realtor"}
                </dd>
                {/* <dd className="text-sm text-gray-500">{person.title}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
              {person.role}
            </span>
          </dd> */}
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${company.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <MailIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400"
                    />
                    Email
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`tel:${company.phone}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <Phone
                      aria-hidden="true"
                      className="size-5 text-gray-400"
                    />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyInteractions;
