import { Integration } from '../types';

const integrations: Integration[] = [
  {
    title: 'Slack',
    iconURL: 'https://staticassets.commandbar.com/showcase/slack.png',
    subtitle: 'Keep your team in the loop with CRM changes.',
    description:
      'Slack is a workplace collaboration tool that can also send and receive event notifications. You can configure notifications to be send whenever a lead is edited or a pipeline change occurs.',
    enabled: false,
  },
  {
    title: 'Salesforce',
    iconURL: 'https://staticassets.commandbar.com/showcase/salesforce.png',
    subtitle: 'Integrate the leader in on-demand customer management.',
    description:
      'Skip the standard process of waiting for a Salesforce Administrator to help format and export your data (all the while trying to upsell you modules). Using the Salesforce integration, you can automatically export your Salesforce data, as well as push changes when you make edits to a lead.',
    enabled: false,
  },
  {
    title: 'Jira',
    iconURL: 'https://staticassets.commandbar.com/showcase/jira.png',
    subtitle: 'The top software used by agile development teams.',
    description:
      'Integrate product updates into your lead management workflow. Tag features with leads and customers that have asked for them, and trigger automated updates when these features are completed.',
    enabled: false,
  },
  {
    title: 'Hubspot',
    iconURL: 'https://staticassets.commandbar.com/showcase/hubspot.png',
    subtitle: 'Connect email automation tools to your lead management',
    description:
      'You have email automation workflows already built out, and want to sync them to your source of truth for lead management. Syncing prospects and leads into HubSpot means uploading large CSVs... or turning on the one-click integration below.',
    enabled: false,
  },
];

export default integrations;
