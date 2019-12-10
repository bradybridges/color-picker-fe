import React from 'react';
import { shallow } from 'enzyme';
import { setTempPalette } from '../../actions/index';
import { PaletteColorItem, mapState, mapDispatch } from './PaletteColorItem';

describe('PaletteColorItem', () => {
  let wrapper;
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
      isLocked: true,
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
  const mockSetTempPalette = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<PaletteColorItem
      color='#CCCCCC'
      isLocked={true}
      tempPalette={mockTemp}
      setTempPalette={mockSetTempPalette}
    />);
  })
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('handleToggleColorLock should toggle the state of isLocked', () => {
    wrapper.instance().handleToggleColorLock();
    const expected = [
      { color: '#FFFFFF', isLocked: false, name: 'color_1' },
      { color: '#000000', isLocked: false, name: 'color_2' },
      { color: '#CCCCCC', isLocked: false, name: 'color_3' },
      { color: '#1F1F1F', isLocked: true, name: 'color_4' },
      { color: '#1D1D1D', isLocked: true, name: 'color_5' },
    ];
    expect(mockSetTempPalette).toHaveBeenCalledWith(expected);
  });
});

describe('mapState', () => {
  it('should map tempPalette to props', () => {
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
    const mockState = {
      error: 'Something terrible happened',
      tempPalette: mockTemp,
    };
    const expected = { tempPalette: mockTemp };
    const mappedState = mapState(mockState);
    expect(mappedState).toEqual(expected);
  });
});

describe('mapDispatch', () => {
  it('should map setTempPalette to props and dispatch the correct action', () => {
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
    const actionToDispatch = setTempPalette(mockTemp);
    const mappedDispatch = mapDispatch(mockDispatch);
    mappedDispatch.setTempPalette(mockTemp);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
