export const addProjects = (projects) => ({
  type: 'ADD_PROJECTS',
  projects,
});

export const addPalettes = (palettes) => ({
  type: 'ADD_PALETTES',
  palettes,
});

export const addPalette = (palette) => ({
  type: 'ADD_PALETTE',
  palette,
});

export const setTempPalette = (palette) => ({
  type: 'SET_TEMP_PALETTE',
  palette,
});

export const addNewProject = (project) => ({
  type: 'ADD_NEW_PROJECT',
  project
});