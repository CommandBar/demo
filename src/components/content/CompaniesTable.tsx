import { useSnapshot } from "valtio";
import _ from "../../store/store";
import { selectStageOfCompany } from "../../store/selectors";
import { Company } from "../../store/types";
import { useNavigate } from "react-router-dom";
export default function CompaniesTable() {
  const snapshot = useSnapshot(_);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto text-left">
          <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the companies in your CRM.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {snapshot.companies.map((company) => (
                    // <Link to={`/leads/${company.id}`}>
                    <CompanyRow company={company} />
                    // </Link>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CompanyRow = (props: { company: Company }) => {
  const { company } = props;
  const snapshot = useSnapshot(_);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/leads/${company.id}`);
  };
  return (
    <tr
      key={company.contactEmail}
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-all"
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={company.logoURL}
              alt=""
            />
          </div>
          <div className="ml-4 text-left">
            <div className="text-gray-900">{company.name}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
        <div className="font-medium text-gray-900">{company.contactName}</div>
        <div className="text-gray-500">{company.contactEmail}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
          {selectStageOfCompany(snapshot, company)?.name}
        </span>
      </td>
    </tr>
  );
};
