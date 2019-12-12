const initialState = [
  { name: 'color_1', color: '#FFFFFF', isLocked: false },
  { name: 'color_2', color: '#FFFFFF', isLocked: false },
  { name: 'color_3', color: '#FFFFFF', isLocked: false },
  { name: 'color_4', color: '#FFFFFF', isLocked: false },
  { name: 'color_5', color: '#FFFFFF', isLocked: false },
];
export const tempPalette = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEMP_PALETTE':
      return action.palette;
    default:
      return state;
  }
};
