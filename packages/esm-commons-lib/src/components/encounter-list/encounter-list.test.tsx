import '@testing-library/jest-dom';
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { EncounterList } from './encounter-list.component';
import {
  mockColumns,
  mockEncounter,
  mockEncounterType,
  mockForms,
  mockColumnsWithActionItems,
} from '../../../../../__mocks__/encounter-list.mock';
import * as encounterRowsHook from '../../hooks/useEncounterRows';
import { useEncounterRows } from '../../hooks/useEncounterRows';
import * as formsJsonHook from '../../hooks/useFormsJson';
import userEvent from '@testing-library/user-event';

const emptyTestProps = {
  formConceptMap: {},
  patientUuid: 'some-uuid',
  encounterType: mockEncounterType,
  columns: [],
  headerTitle: 'Sample header title encounter list',
  description: 'Sample description encounter list',
  formList: [],
  filter: jest.fn(),
  launchOptions: {
    moduleName: '',
    hideFormLauncher: false,
    displayText: '',
  },
};

const testProps = {
  formConceptMap: {},
  patientUuid: 'some-uuid',
  encounterType: mockEncounterType,
  columns: mockColumns,
  headerTitle: 'Sample header title encounter list',
  description: 'Sample description encounter list',
  formList: mockForms,
  filter: jest.fn(),
  launchOptions: {
    moduleName: '',
    hideFormLauncher: false,
    displayText: '',
  },
};

const testPropsWithActions = {
  formConceptMap: {},
  patientUuid: 'some-uuid',
  encounterType: mockEncounterType,
  columns: mockColumnsWithActionItems,
  headerTitle: 'Sample header title encounter list',
  description: 'Sample description encounter list',
  formList: mockForms,
  filter: jest.fn(),
  launchOptions: {
    moduleName: '',
    hideFormLauncher: false,
    displayText: '',
  },
};

jest.mock('../../hooks/useEncounterRows');
jest.mock('../../hooks/useFormsJson');

const mockUseEncounters = useEncounterRows as jest.Mock;

jest.mock('@openmrs/esm-patient-common-lib', () => ({
  launchPatientWorkspace: jest.fn(),
}));

jest.mock('@openmrs/openmrs-form-engine-lib', () => ({
  OHRIForm: jest
    .fn()
    .mockImplementation(() => React.createElement('div', { 'data-testid': 'openmrs form' }, 'FORM ENGINE LIB')),
}));

describe('EncounterList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders an loading state if data is loading', () => {
    jest
      .spyOn(encounterRowsHook, 'useEncounterRows')
      .mockReturnValue({ encounters: [], isLoading: true, error: null, onFormSave: () => {} });

    jest.spyOn(formsJsonHook, 'useFormsJson').mockReturnValue({ formsJson: [], isLoading: true });

    act(() => {
      render(<EncounterList {...emptyTestProps} />);
    });
    const element = document.querySelector('.cds--skeleton.cds--data-table-container');
    expect(element).not.toBeNull();
  });

  test('renders an empty state if data is null', () => {
    jest
      .spyOn(encounterRowsHook, 'useEncounterRows')
      .mockReturnValue({ encounters: [], isLoading: false, error: null, onFormSave: () => {} });

    jest.spyOn(formsJsonHook, 'useFormsJson').mockReturnValue({ formsJson: [], isLoading: false });

    act(() => {
      render(<EncounterList {...emptyTestProps} />);
    });
    expect(
      screen.getByText('There are no sample description encounter list to display for this patient'),
    ).toBeInTheDocument();
  });

  test('should render the encounter list component', () => {
    jest.spyOn(encounterRowsHook, 'useEncounterRows').mockReturnValue({
      encounters: mockEncounter,
      isLoading: false,
      error: null,
      onFormSave: () => {},
    });
    jest.spyOn(formsJsonHook, 'useFormsJson').mockReturnValue({ formsJson: [], isLoading: false });

    act(() => {
      render(<EncounterList {...testProps} />);
    });
    expect(screen.getByText('Sample header title encounter list')).toBeInTheDocument();
    expect(screen.getByText('Death Date')).toBeInTheDocument();
    expect(screen.getByText('Click to sort rows by Cause of Death header in ascending order')).toBeInTheDocument();
    expect(screen.getByText('Cause of Death')).toBeInTheDocument();
  });

  // test('action items should be in the encounter list component', () => {
  //   mockUseEncounters.mockImplementation(() => ({
  //     encounters: mockEncounter,
  //     isLoading: false,
  //     error: null,
  //     onFormSave: () => null,
  //   }));

  //   jest.spyOn(formsJsonHook, 'useFormsJson').mockReturnValue({ formsJson: [], isLoading: false });

  //   act(() => {
  //     render(<EncounterList {...testPropsWithActions} />);
  //   });

  //   expect(screen.getByText('Actions')).toBeInTheDocument();
  //   expect(screen.getByText('Asphyxiation')).toBeInTheDocument();

  //   const actionsButton = screen.getByTestId('actions-id');
  //   expect(actionsButton).toBeInTheDocument();
  //   fireEvent.click(actionsButton);
  // });

  test('action items should be in the encounter list component', async () => {
    jest.spyOn(encounterRowsHook, 'useEncounterRows').mockReturnValue({
      encounters: mockEncounter,
      isLoading: false,
      error: null,
      onFormSave: () => {},
    });

    jest.spyOn(formsJsonHook, 'useFormsJson').mockReturnValue({ formsJson: [], isLoading: false });

    act(() => {
      render(<EncounterList {...testPropsWithActions} />);
    });

    //await is used for effectable code, code that runs inside of a useEffect
    await screen.findByText('Actions');
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText(/asphyxiation/i)).toBeInTheDocument();
    //use accesibility properties instead of test ids

    const actionsButton = screen.getByTestId('actions-id');
    // const actionsButton = screen.getByRole('button', { name: /actions/i });
    expect(actionsButton).toBeInTheDocument();

    await userEvent.click(actionsButton);

    //this is where it is failing, after clicking the actions button, I expect to see a list of overflow menu items with the role of 'menuitem'
    await screen.findAllByRole('menuitem');

    // screen.findByRole('menuitem', { name: /delete form/i });

    // screen.getByRole('x');

    // expect(screen.getByText(/delete outcome/i)).toBeInTheDocument();

    // screen.getByRole('button', { name: /Delete form/i });
    // await screen.findByRole('button', { name: /Delete form/i });
  });
});
