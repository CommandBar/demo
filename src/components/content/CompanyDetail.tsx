import { useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { addNoteToCompany } from "../../store/actions";
import _ from "../../store/store";
import { selectCompanyById, selectStageOfCompany } from "../../store/selectors";
import { CompanyNote, User } from "../../store/types";
import Breadcrumbs from "../Breadcrumbs";

export default function CompanyDetail() {
  const { id } = useParams();
  const snapshot = useSnapshot(_);
  const company = selectCompanyById(snapshot, id);
  const navigate = useNavigate();

  // FIXME
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
    { name: "Leads", href: "/leads" },
    { name: company.name, href: `/leads/${company.id}` },
  ];
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="min-h-full">
        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={company.icon}
                    alt=""
                  />
                  <span
                    className="absolute inset-0 shadow-inner rounded-full"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {company.name}
                </h1>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                onClick={() => navigate(`/leads/${company.id}/edit`)}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-3">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Company Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Contact details and company information.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Contact name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {company.contactName}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {company.contactEmail}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Contract value
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {company.annualContractValue}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Stage
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {stage?.name}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          About
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                          anim incididunt cillum culpa consequat. Excepteur qui
                          ipsum aliquip consequat sint.
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Labels
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {company.labels.map((label) => (
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
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
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Notes
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        {company.notes.map((note) => (
                          <li key={note.id}>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={getAuthor(note).imgURL}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-sm">
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    {getAuthor(note).name}
                                  </a>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{note.text}</p>
                                </div>
                                <div className="mt-2 text-sm space-x-2">
                                  <span className="text-gray-500 font-medium">
                                    {note.updatedAt}
                                  </span>{" "}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={snapshot.currentUser.imgURL}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <form
                          id="add-note-form"
                          onSubmit={(e) => {
                            e.preventDefault();

                            const form =
                              document.getElementById("add-note-form");
                            if (form) {
                              const data = new FormData(
                                form as HTMLFormElement
                              );

                              addNoteToCompany(
                                company.id,
                                data.get("comment") as string | null
                              );
                              //@ts-ignore
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
                              className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Add a note"
                              defaultValue={""}
                            />
                          </div>
                          <div className="mt-3 flex items-center justify-end">
                            <button
                              type="submit"
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
