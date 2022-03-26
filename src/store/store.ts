// To access information from the store in a read only way (e.g., rendering or for CommandBar)
// useSnapshot(store).x

import { proxy } from "valtio";
import companies from "./data/companies";
import stages from "./data/stages";
import { Company, Stage, User } from "./types";

export interface Store {
  companies: Company[];
  stages: Stage[];
  currentUser: User;
  otherUser: User;
}

const store: Store = proxy({
  companies,
  stages,
  currentUser: {
    name: "Jim Halpert",
    imgURL:
      "https://staticassets.commandbar.com/showcase/jim-halpert-headshot.jpeg",
  },
  otherUser: {
    name: "Pam Beesly",
    imgURL: "https://staticassets.commandbar.com/showcase/pam_beesly.jpeg",
  },
});

export default store;
