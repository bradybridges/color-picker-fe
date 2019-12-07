export const addProjects = (projects) => ({
  type: 'ADD_PROJECTS',
  projects,
});

export const addPalettes = (palettes) => ({
  type: 'ADD_PALETTES',
  palettes,
});

export const setTempPalette = (palette) => ({
  type: 'SET_TEMP_PALETTE',
  palette,
});
