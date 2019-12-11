import React from 'react';
import { shallow } from 'enzyme';
import { Palette, mapState, mapDispatch } from './Palette';
import * as actions from '../../actions/index';
import * as api from '../../apiCalls';

describe('Palette', () => {
  const mockPalettes = [
    {
      id: 1,
      project_id: 1,
      palette_name: 'super sad palette',
      color_1: '#999999',
      color_2: '#1c1c1c',
      color_3: '#1d1d1d',
      color_4: '#1f1f1f',
      color_5: '#1a1a1a',
    },
    {
      id: 2,
      project_id: 1,
      palette_name: 'happy palette',
      color_1: '#FFFFFF',
      color_2: '#000000',
      color_3: '#CCCCCC',
      color_4: '#1F1F1F',
      color_5: '#1D1D1D',
    },
  ];
  const mockUpdatePalettes = jest.fn();
  const mockSetTempPalette = jest.fn();
  const name = 'New Palette';
  const color1 = '#000000';
  const color2 = '#FFFFFF';
  const color3 = '#CCCCCC';
  const color4 = '#1F1F1F';
  const color5 = '#1D1D1D';
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Palette
        id={1}
        palette_name={name}
        color_1={color1}
        color_2={color2}
        color_3={color3}
        color_4={color4}
        color_5={color5}
        palettes={mockPalettes}
        updatePalettes={mockUpdatePalettes}
        setTempPalette={mockSetTempPalette}
      />
    );
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('handleDeletePalette should update palettes in store and delete palette from BE', () => {
    const expected = [
      {
        id: 2,
        project_id: 1,
        palette_name: 'happy palette',
        color_1: '#FFFFFF',
        color_2: '#000000',
        color_3: '#CCCCCC',
        color_4: '#1F1F1F',
        color_5: '#1D1D1D',
      },
    ];
    api.deletePalette = jest.fn();
    wrapper.instance().handleDeletePalette();
    expect(mockUpdatePalettes).toHaveBeenCalledWith(expected);
    expect(api.deletePalette).toHaveBeenCalledWith(1);
  });
  it('loadPalette should set tempPalette with correct colors', () => {
    const expected = [
      { color: '#000000', isLocked: false, name: 'color_1' },
      { color: '#FFFFFF', isLocked: false, name: 'color_2' },
      { color: '#CCCCCC', isLocked: false, name: 'color_3' },
      { color: '#1F1F1F', isLocked: false, name: 'color_4' },
      { color: '#1D1D1D', isLocked: false, name: 'color_5' },
    ];
    wrapper.instance().loadPalette();
    expect(mockSetTempPalette).toHaveBeenCalledWith(expected);
  });
});

describe('mapState', () => {
  const mockPalettes = [
    {
      id: 1,
      project_id: 1,
      palette_name: 'super sad palette',
      color_1: '#999999',
      color_2: '#1c1c1c',
      color_3: '#1d1d1d',
      color_4: '#1f1f1f',
      color_5: '#1a1a1a',
    },
    {
      id: 2,
      project_id: 1,
      palette_name: 'happy palette',
      color_1: '#FFFFFF',
      color_2: '#000000',
      color_3: '#CCCCCC',
      color_4: '#1F1F1F',
      color_5: '#1D1D1D',
    },
  ];
  it('should map palettes to state', () => {
    const mockState = {
      error: 'Something outrageous happened',
      palettes: mockPalettes,
    };
    const expected = { palettes: mockPalettes };
    const mappedState = mapState(mockState);
    expect(mappedState).toEqual(expected);
  });
});

describe('mapDispatch', () => {
  it('setTempPalettes should be dispatched with the correct action obj', () => {
    const mockDispatch = jest.fn();
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
    const actionToDispatch = actions.setTempPalette(mockTemp);
    const mappedDispatch = mapDispatch(mockDispatch);
    mappedDispatch.setTempPalette(mockTemp);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('updatePalettes should be called with the correct action obj', () => {
    const mockDispatch = jest.fn();
    const mockPalettes = [
      {
        id: 1,
        palette_name: 'Great Palette',
        color_1: '#000000',
        color_2: '#CCCCCC',
        color_3: '#FFFFFF',
        color_4: '#1F1F1F',
        color_5: '#1D1D1D',
      },
      {
        id: 2,
        palette_name: 'Sweet Palette',
        color_1: '#010101',
        color_2: '#C2C2C2',
        color_3: '#FFFFFF',
        color_4: '#1F1F1F',
        color_5: '#AF1D1D',
      },
    ];
    const actionToDispatch = actions.addPalettes(mockPalettes);
    const mappedDispatch = mapDispatch(mockDispatch);
    mappedDispatch.updatePalettes(mockPalettes);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
