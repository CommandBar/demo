// Handle type conflicts from deep readonly types from valtio useSnapshot
declare module "valtio" {
  function useSnapshot<T extends object>(p: T): T;
  function snapshot<T extends object>(p: T): T;
}

/** Companies */
export interface Company {
  id: string;
  name: string;
  stageId: string;
  contactName: string;
  contactEmail: string;
  notes: CompanyNote[];
  labels: string[];
  annualContractValue: number;
  updatedAt?: number;
  reminder?: string;
  logoURL?: string;
}

export interface CompanyNote {
  id: string;
  text: string;
  updatedAt: string;
  createdByCurrentUser?: boolean;
}

export interface Stage {
  id: string;
  name: string;
}

/** Integrations */
export interface Integration {
  title: "Slack" | "Jira" | "Hubspot" | "Salesforce";
  iconURL: string;
  text: string;
  enabled: false;
}

export interface User {
  name: string;
  imgURL: string;
}
