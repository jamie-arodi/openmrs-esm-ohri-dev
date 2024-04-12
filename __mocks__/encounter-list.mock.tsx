import { getEncounterValues } from '@ohri/openmrs-esm-ohri-commons-lib';

export const mockEncounterType = '15272be5-ae9c-4278-a303-4b8907eae73b';

export const mockPatientUuid = '1b2278d5-c9ea-4f00-bfb1-60af48dc838a';

export const mockColumns = [
  {
    key: 'deathDate',
    header: 'Death Date',
    getValue: () => '2024-01-01',
    link: {
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'deathCause',
    header: 'Cause of Death',
    getValue: () => '2024-01-01',
    link: {
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'specificDeathCause',
    header: 'Specific cause of Death',
    getValue: () => '2024-01-01',
    link: {
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => '2024-01-01',
    link: {
      handleNavigate: (encounter) => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
];

export const mockColumnsWithActionItems = [
  {
    key: 'deathDate',
    header: 'Death Date',
    getValue: () => 'Nothing to show',
  },
  {
    key: 'deathCause',
    header: 'Cause of Death',
    getValue: () => 'Asphyxiation',
  },
  {
    key: 'specificDeathCause',
    header: 'Specific cause of Death',
    getValue: () => 'Blunt force trauma to the trachea',
  },
  {
    key: 'specificDeathCause',
    header: 'Specific cause of Death',
    getValue: () => 'Blunt force trauma to the trachea',
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {
      return [
        {
          form: { name: 'TB Contact Listing form', package: 'cacx' },
          encounterUuid: 'encounter.uuid',
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'TB Contact Listing form', package: 'cacx' },
          encounterUuid: 'encounter.uuid',
          intent: '*',
          label: 'Edit Form',
          mode: 'edit',
        },
        {
          form: { name: 'TB Contact Listing form', package: 'cacx' },
          encounterUuid: 'encounter.uuid',
          intent: '*',
          label: 'Delete Form',
          mode: 'delete',
        },
      ];
    },
  },
];

export const mockForms = [
  {
    name: 'Death Form',
    uuid: 'some-uuid',
  },
];

export const mockEncounter = [
  {
    uuid: 'ee106966-4cd9-4465-8ac2-dfac9e3751d3',
    encounterDatetime: '2024-01-05T07:01:53.000+0000',
  },
];
