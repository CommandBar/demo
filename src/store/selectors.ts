import { Store } from "./store";
import { Company } from "./types";

export const selectStageOfCompany = (snapshot: Store, company: Company) => {
  return snapshot.stages.find((v) => company.stageId === v.id);
};

export const selectCompanyById = (snapshot: Store, id: string | undefined) => {
  return snapshot.companies.find((v) => v.id === id);
};

export const selectIntegrationByTitle = (
  snapshot: Store,
  title: string | undefined
) => {
  return snapshot.integrations.find((v) => v.title === title);
};
