// To access information from the store in a read only way (e.g., rendering or for CommandBar)
// useSnapshot(store).x

import { proxy } from 'valtio';
import companies from './data/companies';
import stages from './data/stages';
import integrations from './data/integrations';
import { Company, Integration, Notification, Stage, User } from './types';

export interface Store {
  activeCompany: Company | undefined;
  companies: Company[];
  stages: Stage[];
  integrations: Integration[];
  currentUser: User;
  otherUser: User;
  notifications: Notification[];
}

const store: Store = proxy({
  activeCompany: undefined,
  companies,
  stages,
  integrations,
  currentUser: {
    name: 'Jim Halpert',
    imgURL: 'https://staticassets.commandbar.com/showcase/jim-halpert-headshot.jpeg',
  },
  otherUser: {
    name: 'Pam Beesly',
    imgURL: 'https://staticassets.commandbar.com/showcase/pam_beesly.jpeg',
  },
  notifications: [],
});

export default store;
