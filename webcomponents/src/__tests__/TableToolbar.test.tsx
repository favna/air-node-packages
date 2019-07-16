import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import TableToolbar from '../TableToolbar/TableToolbar';

const mockOnSearchInput = jest.fn();
const mockOnSearchClear = jest.fn();

describe('Component Tests', () => {
  let tableToolbar: ShallowWrapper;

  beforeAll(() => tableToolbar = shallow(
    <TableToolbar
      searchplaceholderlabel='placeholder'
      onsearchinput={mockOnSearchInput} onsearchclear={mockOnSearchClear}
    />
  ));

  test('should trigger change when searching', () => {
    const inputBox = tableToolbar
      .find('[data-qa="table-search-bar"]')
      .dive().dive()
      .find('[data-qa="table-search-bar"]');

    const expectedCalledWith = { target: { value: 'DarthVader' } };
    const expectedResult = mockOnSearchInput(expectedCalledWith);

    expect(expectedResult).toBeUndefined();

    inputBox.simulate('change', expectedCalledWith);
    expect(mockOnSearchInput).toHaveBeenCalled();
    expect(mockOnSearchInput).toHaveBeenCalledWith(expectedCalledWith);
  });

  test('should trigger cancel when clicking X', () => {
    const cancelButton = tableToolbar
      .find('[data-qa="table-search-bar"]')
      .dive().dive()
      .find('WithStyles(ForwardRef(IconButton))')
      .last();

    cancelButton.simulate('click');
    expect(mockOnSearchClear).toHaveBeenCalled();
  });
});


describe('Snapshot Testing', () => {
  test('Required Props', () => {
    const tableToolbar = shallow(
      <TableToolbar
        searchplaceholderlabel='placeholder'
        onsearchinput={mockOnSearchInput} onsearchclear={mockOnSearchClear}
      />
    );
    expect(tableToolbar).toMatchSnapshot();
  });

  test('Optional Props', () => {
    const tableToolbar = shallow(
      <TableToolbar
        searchplaceholderlabel='placeholder'
        onsearchinput={mockOnSearchInput} onsearchclear={mockOnSearchClear}
        searchdebounce={50}
        data-qa='snapshot-qa'
        customclasses={['snapshot-class']}
        customSearchbarClasses={['snapshot-class']}
      />
    );
    expect(tableToolbar).toMatchSnapshot();
  });
});