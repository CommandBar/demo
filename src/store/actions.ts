import { nanoid } from 'nanoid';
import { formatISO } from '../components/utils';
import store from './store';
import { Company, CompanyNote } from './types';

export const addNoteToCompany = (companyId: string, note: string | null) => {
  if (note) {
    const newNote: CompanyNote = {
      id: nanoid(),
      text: note,
      updatedAt: formatISO(new Date()),
      createdByCurrentUser: true,
    };

    const company = store.companies.find((c) => c.id === companyId);
    if (company) {
      company.notes = [...company.notes, newNote];
    }
  }
};

export const editCompanyDetails = (companyId: string, field: keyof Company, value: unknown) => {
  const company = store.companies.find((c) => c.id === companyId);
  if (company) {
    company[field] = value;
  }
};

export const changeIntegrationEnabled = (integrationTitle: string, enabled: boolean) => {
  const integration = store.integrations.find((v) => v.title === integrationTitle);
  if (integration) {
    integration.enabled = enabled;
  }
};
