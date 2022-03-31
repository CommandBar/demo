import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { editCompanyDetails } from '../../store/actions';
import { selectCompanyById } from '../../store/selectors';
import _ from '../../store/store';
import Breadcrumbs from '../Breadcrumbs';

export default function CompanyEdit() {
  const { id } = useParams();
  const snapshot = useSnapshot(_);

  const company = selectCompanyById(snapshot, id);
  const navigate = useNavigate();

  if (!company) return <div>Not found</div>;

  const breadcrumbs = [
    { name: "Leads", href: "/leads" },
    { name: company.label, href: `/leads/${company.id}` },
    { name: "Edit", href: `/leads/${company.id}/edit` },
  ];

  const onSave = (e: FormEvent) => {
    e.preventDefault();

    const form = document.getElementById('edit-company-form') as HTMLFormElement | null;
    if (form) {
      const contactName = (form.elements.namedItem('contactName') as HTMLInputElement).value;
      const contactEmail = (form.elements.namedItem('contactEmail') as HTMLInputElement).value;
      const annualContractValue = (form.elements.namedItem('annualContractValue') as HTMLInputElement).value;
      const stageId = (form.elements.namedItem('stage') as HTMLInputElement).value;

      editCompanyDetails(company.id, 'contactName', contactName);
      editCompanyDetails(company.id, 'contactEmail', contactEmail);
      editCompanyDetails(company.id, 'annualContractValue', annualContractValue);
      editCompanyDetails(company.id, 'stageId', stageId);
      form.reset();
      navigate(`/leads/${company.id}`);
    }
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="min-h-full">
        <main className="py-10">
          {/* Page header */}
          <div className="px-4 mx-auto max-w-3xl sm:px-6 md:flex md:justify-between md:items-center md:space-x-5 lg:px-8 lg:max-w-7xl">
            <div className="flex items-center space-x-5">
              <div className="shrink-0">
                <div className="relative">
                  <img className="w-16 h-16 rounded-full" src={company.icon} alt="" />
                  <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  (Editing) {company.label}
                </h1>
              </div>
            </div>
            <div className="flex flex-col-reverse mt-6 space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:flex-row md:mt-0 md:space-x-3">
              <button
                className="inline-flex justify-center items-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 shadow-sm"
                type="submit"
                form="edit-company-form"
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mx-auto mt-8 max-w-3xl sm:px-6 lg:grid-cols-3 lg:grid-flow-col-dense lg:max-w-7xl">
            <div className="space-y-6 lg:col-span-3 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <form id="edit-company-form" onSubmit={onSave}>
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="py-5 px-4 border-t border-gray-200 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                            Contact Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="contactName"
                              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                              defaultValue={company.contactName}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-1">
                          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              id="contactEmail"
                              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                              defaultValue={company.contactEmail}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-1">
                          <label htmlFor="annualContractValue" className="block text-sm font-medium text-gray-700">
                            Contact Value
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="annualContractValue"
                              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                              defaultValue={company.annualContractValue}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-1">
                          <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
                            Stage
                          </label>
                          <select
                            id="stage"
                            className="block py-2 pr-10 pl-3 mt-1 w-full text-base rounded-md border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            defaultValue={company.stageId}
                          >
                            {snapshot.stages.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </dl>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
