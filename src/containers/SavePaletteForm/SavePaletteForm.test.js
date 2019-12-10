import React from 'react';
import { shallow } from 'enzyme';
import { SavePaletteForm, mapState, mapDispatch } from './SavePaletteForm';
import { addPalette } from '../../actions';

describe('SavePaletteForm', () => {
  let wrapper;
  const mockProjects = [
    {
      id: 1,
      name: 'Great Project',
    },
    {
      id: 2,
      name: 'Another Great Project',
    },
  ];
  const mockSavePalette = jest.fn();
  const mockAddPalette = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<SavePaletteForm projects={mockProjects} savePalette={mockSavePalette} addPalette={mockAddPalette}/>);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('handleOptionChange should update selected project in state', () => {
    const mockEvent = {
      target: { value: 2 },
    };
    wrapper.instance().handleOptionChange(mockEvent);
    expect(wrapper.state('selectedProject')).toEqual(2);
  });
  it('handleInputChange should update paletteName in state', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: { value: 'New Palette' },
    };
    wrapper.instance().handleInputChange(mockEvent);
    expect(wrapper.state('paletteName')).toEqual('New Palette');
  });
  it('renderProjectOptions should return a select element with project as options', () => {
    const expected = '{"type":"select","key":null,"ref":null,"props":'
      + '{"children":[{"type":"option","key":"Great Project","ref":null,"props"'
      + ':{"value":1,"children":"Great Project"},"_owner":null,"_store":{}},{"type":"option",'
      + '"key":"Another Great Project","ref":null,"props":{"value":2,"children":"Another Great Project"},'
      + '"_owner":null,"_store":{}}]},"_owner":null,"_store":{}}';
    const result = wrapper.instance().renderProjectOptions();
    expect(JSON.stringify(result)).toEqual(expected);
  });
});

describe('mapState', () => {
  it('should map tempPalette and projects to props', () => {
    const mockTemp = [
      {
        name: 'color_1',
        color: '#FFFFFF',
        isLocked: false,
      },
      {
        name: 'color_2',
        color: '#000000',
        isLocked: false,
      },
      {
        name: 'color_3',
        color: '#CCCCCC',
        isLocked: false,
      },
      {
        name: 'color_4',
        color: '#1F1F1F',
        isLocked: true,
      },
      {
        name: 'color_5',
        color: '#1D1D1D',
        isLocked: true,
      },
    ];
    const mockProjects = [
      {
        id: 1,
        name: 'Great Project',
      },
      {
        id: 2,
        name: 'Another Great Project',
      },
    ];
    const mockState = {
      error: 'Something went wrong',
      tempPalette: mockTemp,
      projects: mockProjects,
    };
    const expectedState = { tempPalette: mockTemp, projects: mockProjects };
    const mappedState = mapState(mockState);
    expect(mappedState).toEqual(expectedState);
  });
});

describe('mapDispatch', () => {
  it('should dispatch addPalette correctly', () => {
    const mockDispatch = jest.fn();
    const mockPalette = {
      id: 1,
      project_id: 1,
      palette_name: "super dope palette",
      color_1: "#000000",
      color_2: "#ffffff",
      color_3: "#1e1e1e",
      color_4: "#1f1f1f",
      color_5: "#1d1d1d",
    };
    const actionToDispatch = addPalette(mockPalette);
    const mappedDispatch = mapDispatch(mockDispatch);
    mappedDispatch.addPalette(mockPalette);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
