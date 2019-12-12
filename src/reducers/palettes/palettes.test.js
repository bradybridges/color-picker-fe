import { palettes } from './palettes';

describe('palettes', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = palettes(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return state with an array of palette objects', () => {
    const palettesArray = [
      { id: 1, project_id: 1, name: 'a palette', color_1: '#fff', color_2: '#fff', color_3: '#fff', color_4: '#fff', color_5: '#fff' },
      { id: 2, project_id: 1, name: 'another one', color_1: '#aaa', color_2: '#bbb', color_3: '#ccc', color_4: '#ddd', color_5: '#eee' },
    ];

    const mockAddPalettes = { type: 'ADD_PALETTES', palettes: palettesArray };

    const result = palettes(undefined, mockAddPalettes);

    expect(result).toEqual(palettesArray);
  });

  it('should return state with a new palette added', () => {
    const mockInitialState = [
      { id: 1, project_id: 1, name: 'a palette', color_1: '#fff', color_2: '#fff', color_3: '#fff', color_4: '#fff', color_5: '#fff' },
      { id: 2, project_id: 1, name: 'another one', color_1: '#aaa', color_2: '#bbb', color_3: '#ccc', color_4: '#ddd', color_5: '#eee' },
    ];

    const newPalette = { id: 3, project_id: 2, name: 'some name', color_1: '#000', color_2: '#000', color_3: '#000', color_4: '#000', color_5: '#000' };

    const mockAddPalette = { type: 'ADD_PALETTE', palette: newPalette };

    const expectedNewState = [
      { id: 1, project_id: 1, name: 'a palette', color_1: '#fff', color_2: '#fff', color_3: '#fff', color_4: '#fff', color_5: '#fff' },
      { id: 2, project_id: 1, name: 'another one', color_1: '#aaa', color_2: '#bbb', color_3: '#ccc', color_4: '#ddd', color_5: '#eee' },
      { id: 3, project_id: 2, name: 'some name', color_1: '#000', color_2: '#000', color_3: '#000', color_4: '#000', color_5: '#000' },
    ];

    const result = palettes(mockInitialState, mockAddPalette);

    expect(result).toEqual(expectedNewState);
  });
});
