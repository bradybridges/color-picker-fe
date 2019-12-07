export const palettes = (state=[], action) => {
  switch(action.type) {
    case 'ADD_PALETTES':
      return action.palettes;
    case 'ADD_PALETTE':
      return [...state, action.palette];
    default:
      return state;
  };
}