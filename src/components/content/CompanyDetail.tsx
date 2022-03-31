import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { addNoteToCompany, setActiveCompany } from '../../store/actions';
import _ from '../../store/store';
import { selectCompanyById, selectStageOfCompany } from '../../store/selectors';
import { CompanyNote, User } from '../../store/types';
import Breadcrumbs from '../Breadcrumbs';
import { useEffect } from 'react';

export default function CompanyDetail() {
  const { id } = useParams();
  const snapshot = useSnapshot(_);
  const company = selectCompanyById(snapshot, id);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveCompany(company);
    return () => setActiveCompany(undefined);
  }, [company]);

  if (!company) return <div>Not found</div>;

  const stage = selectStageOfCompany(snapshot, company);

  const getAuthor = (note: CompanyNote): User => {
    if (note.createdByCurrentUser) {
      return snapshot.currentUser;
    } else {
      return snapshot.otherUser;
    }
  };

  const breadcrumbs = [
    { name: 'Leads', href: '/leads' },
    { name: company.label, href: `/leads/${company.id}` },
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">{company.label}</h1>
              </div>
            </div>

            <div className="flex flex-col-reverse mt-6 space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:flex-row md:mt-0 md:space-x-3">
              <button
                type="button"
                className="inline-flex justify-center items-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 shadow-sm"
                onClick={() => navigate(`/leads/${company.id}/edit`)}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mx-auto mt-8 max-w-3xl sm:px-6 lg:grid-cols-3 lg:grid-flow-col-dense lg:max-w-7xl">
            <div className="space-y-6 lg:col-span-3 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="py-5 px-4 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                      Company Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Contact details and company information.</p>
                  </div>

                  <div className="py-5 px-4 border-t border-gray-200 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Contact name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{company.contactName}</dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900">{company.contactEmail}</dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Contract value</dt>
                        <dd className="mt-1 text-sm text-gray-900">{company.annualContractValue}</dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Stage</dt>
                        <dd className="mt-1 text-sm text-gray-900">{stage?.label}</dd>
                      </div>

                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">About</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                          Excepteur qui ipsum aliquip consequat sint.
                        </dd>
                      </div>

                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Labels</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {company.labels.map((label, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center py-0.5 px-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full"
                            >
                              {label}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                  <div className="divide-y divide-gray-200">
                    <div className="py-5 px-4 sm:px-6">
                      <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                        Notes
                      </h2>
                    </div>

                    <div className="py-6 px-4 sm:px-6">
                      <ul className="space-y-8">
                        {company.notes.map((note) => (
                          <li key={note.id}>
                            <div className="flex space-x-3">
                              <div className="shrink-0">
                                <img className="w-10 h-10 rounded-full" src={getAuthor(note).imgURL} alt="" />
                              </div>

                              <div>
                                <div className="text-sm">
                                  <Link to="#" className="font-medium text-gray-900">
                                    {getAuthor(note).name}
                                  </Link>
                                </div>

                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{note.text}</p>
                                </div>

                                <div className="mt-2 space-x-2 text-sm">
                                  <span className="font-medium text-gray-500">{note.updatedAt}</span>{' '}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="py-6 px-4 bg-gray-50 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="shrink-0">
                        <img className="w-10 h-10 rounded-full" src={snapshot.currentUser.imgURL} alt="" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <form
                          id="add-note-form"
                          onSubmit={(e) => {
                            e.preventDefault();

                            const form = document.getElementById('add-note-form') as HTMLFormElement;
                            if (form) {
                              const data = new FormData(form);

                              addNoteToCompany(company.id, data.get('comment') as string | null);
                              form.reset();
                            }
                          }}
                        >
                          <div>
                            <label htmlFor="comment" className="sr-only">
                              About
                            </label>

                            <textarea
                              id="comment"
                              name="comment"
                              rows={3}
                              className="block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm sm:text-sm"
                              placeholder="Add a note"
                              defaultValue={''}
                            />
                          </div>

                          <div className="flex justify-end items-center mt-3">
                            <button
                              type="submit"
                              className="inline-flex justify-center items-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
                            >
                              Add note
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
