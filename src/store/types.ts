// Handle type conflicts from deep readonly types from valtio useSnapshot
declare module "valtio" {
  function useSnapshot<T extends object>(p: T): T;
  function snapshot<T extends object>(p: T): T;
}

export interface Company {
  id: string;
  name: string;
  stageId: string;
  contactName: string;
  contactEmail: string;
  notes: CompanyNote[];
  labels: string[];
  currency: Currency;
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

export type Integration = "Slack" | "Jira" | "Hubspot" | "Salesforce";

export const CURRENCIES = ["USD", "GBP", "EUR", "JPY", "BTC", "DOGE"] as const;
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  JPY: "¥",
  BTC: "₿",
  DOGE: "Ɖ ",
};
export type Currency = typeof CURRENCIES[number];

export interface User {
  name: string;
  imgURL: string;
}
