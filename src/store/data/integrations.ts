import { Integration } from '../types';

const integrations: Integration[] = [
  {
    title: 'Slack',
    iconURL: 'https://staticassets.commandbar.com/showcase/slack.png',
    text: 'Keep your team in the loop with CRM changes.',
    enabled: false,
  },
  {
    title: 'Salesforce',
    iconURL: 'https://staticassets.commandbar.com/showcase/salesforce.png',
    text: 'Skip the standard process of waiting for a Salesforce Administrator to help format and export your data (all the while trying to upsell you modules). Using the Salesforce integration, you can automatically export your Salesforce data, as well as push changes when you make edits to a lead.',
    enabled: false,
  },
  {
    title: 'Jira',
    iconURL: 'https://staticassets.commandbar.com/showcase/jira.png',
    text: 'Integrate product updates into your lead management workflow. Tag features with leads and customers that have asked for them, and trigger automated updates when these features are completed.',
    enabled: false,
  },
  {
    title: 'Hubspot',
    iconURL: 'https://staticassets.commandbar.com/showcase/hubspot.png',
    text: 'You have email automation workflows already built out, and want to sync them to your source of truth for lead management. Syncing prospects and leads into HubSpot means uploading large CSVs... or turning on the one-click integration below.',
    enabled: false,
  },
];

export default integrations;
