const initialState = [
  { name: 'color_1', color: '#000000', isLocked: false },
  { name: 'color_2', color: '#000000', isLocked: false },
  { name: 'color_3', color: '#000000', isLocked: false },
  { name: 'color_4', color: '#000000', isLocked: false },
  { name: 'color_5', color: '#000000', isLocked: false },
];
export const tempPalette = (state=initialState, action) => {
  switch(action.type) {
    case 'SET_TEMP_PALETTE':
      return action.palette;
    default:
      return state;
  }
};