import * as api from './apiCalls';

describe('getPalettes', () => {
  const mockPalettes = [
    {
      id: 1,
      palette_name: 'Great Palette',
      color_1: '#000000',
      color_2: '#CCCCCC',
      color_3: '#FFFFFF',
      color_4: '#1F1F1F',
      color_5: '#1D1D1D',
    },
    {
      id: 2,
      palette_name: 'Sweet Palette',
      color_1: '#010101',
      color_2: '#C2C2C2',
      color_3: '#FFFFFF',
      color_4: '#1F1F1F',
      color_5: '#AF1D1D',
    },
  ];
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPalettes),
      });
    });
  });
  it('should be called with the correct url', () => {
    const expected = 'https://color-picker-backend.herokuapp.com/api/v1/palettes';
    api.getPalettes();
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });
  it('should return an array of palettes', () => {
    const results = api.getPalettes();
    expect(results).resolves.toEqual(mockPalettes);
  });
  it('should return an error if the fetch fails', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });
    const result = api.getPalettes();
    expect(result).rejects.toEqual(Error('Failed to fetch palettes'));
  });
  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch'));
    });
    const result = api.getPalettes();
    expect(result).rejects.toEqual(Error('Failed to fetch'));
  });
});
