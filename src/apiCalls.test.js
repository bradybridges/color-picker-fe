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

describe('getPalette', () => {
  const mockPalette = {
    id: 1,
    palette_name: 'Great Palette',
    color_1: '#000000',
    color_2: '#CCCCCC',
    color_3: '#FFFFFF',
    color_4: '#1F1F1F',
    color_5: '#1D1D1D',
  };
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPalette),
      });
    });
  });
  it('should be called with the correct url', () => {
    const expected = 'https://color-picker-backend.herokuapp.com/api/v1/palettes/1';
    api.getPalette(1);
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });
  it('should return a palette with the specified id', () => {
    const result = api.getPalette(1);
    expect(result).resolves.toEqual(mockPalette);
  });
  it('should return an error if the fetch fails', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });
    const result = api.getPalette();
    expect(result).rejects.toEqual(Error('Failed to fetch palette'));
  });
  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch'));
    });
    const result = api.getPalette();
    expect(result).rejects.toEqual(Error('Failed to fetch'));
  });
});

describe('postPalette', () => {
  const mockPalette = {
    projectId: 2,
    paletteName: 'Great Palette',
    color1: '#000000',
    color2: '#FFFFFF',
    color3: '#1F1F1F',
    color4: '#1D1D1D',
    color5: '#CCCCCC',
  };
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve('Successfully added palette'),
      });
    });
  });
  it('should be called with the correct url and body', () => {
    const { projectId, paletteName, color1, color2, color3, color4, color5 } = mockPalette;
    const expectedUrl = 'https://color-picker-backend.herokuapp.com/api/v1/palettes';
    const expectedBody = {
      "body": "{\"project_id\":2,\"palette_name\":\"Great Palette\",\"color_1\":\"#000000\",\"color_2\":\"#FFFFFF\",\"color_3\":\"#1F1F1F\",\"color_4\":\"#1D1D1D\",\"color_5\":\"#CCCCCC\"}",
      "headers": {
        "Content-Type": "application/json",
      },
      "method": "POST",
    };
    api.postPalette(projectId, paletteName, color1, color2, color3, color4, color5);
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody);
  });
  it('should return a successful message if palette posts', () => {
    const result = api.postPalette(mockPalette);
    expect(result).resolves.toEqual('Successfully added palette');
  });
  it('should return an error if the fetch fails', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false });
    });
    const result = api.postPalette();
    expect(result).rejects.toEqual(Error('Failed to POST palette'));
  });
  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to post'));
    });
    const result = api.postPalette();
    expect(result).rejects.toEqual(Error('Failed to post'));
  });
});
