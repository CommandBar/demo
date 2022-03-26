import { Store } from "./store";
import { Company } from "./types";

export const selectStageOfCompany = (_: Store, company: Company) => {
  return _.stages.find((s) => company.stageId === s.id);
};

export const selectCompanyById = (_: Store, id: string | undefined) => {
  return _.companies.find((c) => c.id === id);
};
