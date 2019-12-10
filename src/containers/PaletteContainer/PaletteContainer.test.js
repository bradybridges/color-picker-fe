import React from 'react';
import { shallow } from 'enzyme';
import { PaletteContainer, mapState } from './PaletteContainer';
import PaletteColorItem from '../PaletteColorItem/PaletteColorItem';

describe('PaletteContainer', () => {
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
  const wrapper = shallow(<PaletteContainer tempPalette={mockTemp} />);
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renderColorItems should return an array of PaletteColorItems', () => {
    const result = wrapper.instance().renderColorItems();
    expect(result.length).toEqual(5);
    // expect(result).toEqual();
    // PaletteColorItems are not defined on return?
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
    const expectedState = { tempPalette: mockTemp };
    const mockState = {
      error: 'Something terrible happened',
      tempPalette: mockTemp,
    };
    const mappedState = mapState(mockState);
    expect(mappedState).toEqual(expectedState);
  });
});
