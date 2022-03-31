import { useSnapshot } from 'valtio';
import _ from '../../store/store';
import { selectStageOfCompany } from '../../store/selectors';
import { Company } from '../../store/types';
import { useNavigate } from 'react-router-dom';

export default function CompaniesTable() {
  const snapshot = useSnapshot(_);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="text-left sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all the companies in your CRM.</p>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto -my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden ring-1 ring-black/5 shadow md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pr-3 pl-4 text-sm font-semibold text-left text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-sm font-semibold text-left text-gray-900">
                      Contact
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-sm font-semibold text-left text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {snapshot.companies.map((company) => (
                    <CompanyRow key={company.id} company={company} />
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

const CompanyRow = ({ company }: { company: Company }) => {
  const snapshot = useSnapshot(_);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/leads/${company.id}`);
  };

  return (
    <tr key={company.contactEmail} onClick={onClick} className="hover:shadow-lg transition-all cursor-pointer">
      <td className="py-4 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-6">
        <div className="flex items-center">
          <div className="shrink-0 w-10 h-10">
            <img className="w-10 h-10 rounded-full" src={company.icon} alt="" />
          </div>
          <div className="ml-4 text-left">
            <div className="text-gray-900">{company.label}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 text-sm text-left text-gray-500 whitespace-nowrap">
        <div className="font-medium text-gray-900">{company.contactName}</div>
        <div className="text-gray-500">{company.contactEmail}</div>
      </td>
      <td className="py-4 px-3 text-sm text-gray-500 whitespace-nowrap">
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          {selectStageOfCompany(snapshot, company)?.label}
        </span>
      </td>
    </tr>
  );
};
