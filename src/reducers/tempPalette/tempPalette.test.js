import { tempPalette } from './tempPalette'

describe('tempPalette', () => {
  it('should return the initial state', () => {
    const initialState = [
      { name: 'color_1', color: '#FFFFFF', isLocked: false },
      { name: 'color_2', color: '#FFFFFF', isLocked: false },
      { name: 'color_3', color: '#FFFFFF', isLocked: false },
      { name: 'color_4', color: '#FFFFFF', isLocked: false },
      { name: 'color_5', color: '#FFFFFF', isLocked: false },
    ];

    const expected = initialState

    const result = tempPalette(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should update state with a new palette', () => {
    const initialState = [
      { name: 'color_1', color: '#FFFFFF', isLocked: false },
      { name: 'color_2', color: '#FFFFFF', isLocked: false },
      { name: 'color_3', color: '#FFFFFF', isLocked: false },
      { name: 'color_4', color: '#FFFFFF', isLocked: false },
      { name: 'color_5', color: '#FFFFFF', isLocked: false },
    ];

    const newPalette = [
      { name: 'color_1', color: '#AAAAAA', isLocked: false },
      { name: 'color_2', color: '#BBBBBB', isLocked: false },
      { name: 'color_3', color: '#CCCCCC', isLocked: false },
      { name: 'color_4', color: '#DDDDDD', isLocked: false },
      { name: 'color_5', color: '#EEEEEE', isLocked: false },
    ];

    const mockSetTempPalette = {
      type: 'SET_TEMP_PALETTE',
      palette: newPalette
    }

    const expected = newPalette

    const result = tempPalette(initialState, mockSetTempPalette)

    expect(result).toEqual(expected)
  })
})