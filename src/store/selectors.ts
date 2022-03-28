import { Store } from "./store";
import { Company } from "./types";

export const selectStageOfCompany = (snapshot: Store, company: Company) => {
  return snapshot.stages.find((s) => company.stageId === s.id);
};

export const selectCompanyById = (snapshot: Store, id: string | undefined) => {
  return snapshot.companies.find((c) => c.id === id);
};
