import * as actions from './index';

describe('addProjects', () => {
  it('should return the correct action object', () => {
    const mockProjects = [
      {
        id: 1,
        name: 'Cool Palette',
        created_at: '2019-12-06T19:49:10.257Z',
        updated_at: '2019-12-06T19:49:10.257Z',
      },
      {
        id: 2,
        name: 'Superb Palette',
        created_at: '2019-13-06T19:49:10.257Z',
        updated_at: '2019-13-06T19:49:10.257Z',
      },
    ];
    const expected = {
      type: 'ADD_PROJECTS',
      projects: mockProjects,
    };
    const result = actions.addProjects(mockProjects);
    expect(result).toEqual(expected);
  });
});

describe('addPalettes', () => {
  it('should return the correct action object', () => {
    const mockPalettes = [
      {
        id: 1,
        project_id: 1,
        palette_name: 'awesome palette',
        color_1: '#000000',
        color_2: '#ffffff',
        color_3: '#1e1e1e',
        color_4: '#1f1f1f',
        color_5: '#1d1d1d',
      },
      {
        id: 2,
        project_id: 1,
        palette_name: 'clean palette',
        color_1: '#000000',
        color_2: '#ffffff',
        color_3: '#1f1f1f',
        color_4: '#cccccc',
        color_5: '#1d1d1d',
      },
    ];
    const expected = {
      type: 'ADD_PALETTES',
      palettes: mockPalettes,
    };
    const result = actions.addPalettes(mockPalettes);
    expect(result).toEqual(expected);
  });
});

describe('addPalette', () => {
  it('should return the correct action object', () => {
    const mockPalette = {
      id: 1,
      project_id: 1,
      palette_name: 'awesome palette',
      color_1: '#000000',
      color_2: '#ffffff',
      color_3: '#1e1e1e',
      color_4: '#1f1f1f',
      color_5: '#1d1d1d',
    };
    const expected = {
      type: 'ADD_PALETTE',
      palette: mockPalette,
    };
    const result = actions.addPalette(mockPalette);
    expect(result).toEqual(expected);
  });
});

describe('setTempPalette', () => {
  it('should return the correct action object', () => {
    const mockTempPalette = [
      {
        name: 'color_1',
        color: '#FFFFFF',
        isLocked: false,
      },
      {
        name: 'color_2',
        color: '#CCCCCC',
        isLocked: false,
      },
      {
        name: 'color_3',
        color: '#1F1F1F',
        isLocked: false,
      },
      {
        name: 'color_4',
        color: '#000000',
        isLocked: true,
      },
      {
        name: 'color_5',
        color: '#1C1C1C',
        isLocked: true,
      },
    ];
    const expected = {
      type: 'SET_TEMP_PALETTE',
      palette: mockTempPalette,
    };
    const result = actions.setTempPalette(mockTempPalette);
    expect(result).toEqual(expected);
  });
});

describe('addNewProject', () => {
  it('should return the correct action object', () => {
    const mockProject = {
      id: 2,
      name: 'New Project',
    };
    const expected = {
      type: 'ADD_NEW_PROJECT',
      project: mockProject,
    };
    const result = actions.addNewProject(mockProject);
    expect(result).toEqual(expected);
  });
});
