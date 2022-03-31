// Handle type conflicts from deep readonly types from valtio useSnapshot
declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T;
  function snapshot<T extends object>(p: T): T;
}

/** Companies */
export interface Company extends Record<string, unknown> {
  id: string;
  label: string;
  stageId: string;
  contactName: string;
  contactEmail: string;
  notes: CompanyNote[];
  labels: string[];
  annualContractValue: number;
  updatedAt?: number;
  reminder?: string;
  icon?: string;
}

export interface CompanyNote {
  id: string;
  text: string;
  updatedAt: string;
  createdByCurrentUser?: boolean;
}

export interface Stage {
  id: string;
  label: string;
}

/** Integrations */
export interface Integration {
  title: 'Slack' | 'Jira' | 'Hubspot' | 'Salesforce';
  iconURL: string;
  subtitle: string;
  enabled: boolean;
  description: string;
}

export interface User {
  name: string;
  imgURL: string;
}

export interface Notification {
  title: string;
  subtitle?: string;
}
