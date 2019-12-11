import * as api from './apiCalls';
require('dotenv').config()

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
    const expected = process.env.REACT_APP_BACKEND + `/api/v1/palettes`;
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
    const expected = process.env.REACT_APP_BACKEND + `/api/v1/palettes/1`;
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
    const expectedUrl = process.env.REACT_APP_BACKEND + `/api/v1/palettes`;
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

describe('deletePalette', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve('Successfully deleted palette'),
      });
    });
  });
  it('should be called with the correct url', () => {
    const expectedUrl = process.env.REACT_APP_BACKEND+ `/api/v1/palettes/1`;
    const expectedBody = { method: 'DELETE' };
    api.deletePalette(1);
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody);
  });
  it('should return a success message if deletion succeeds', () => {
    const result = api.deletePalette(1);
    expect(result).resolves.toEqual('Successfully deleted palette');
  });
  it('should return an error if response is not okay', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: false }));
    const result = api.deletePalette(1);
    expect(result).rejects.toEqual(Error('Failed to delete palette'));
  });
  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Failed to delete palette')));
    const result = api.deletePalette(1);
    expect(result).rejects.toEqual(Error('Failed to delete palette'));
  });
});

describe('getProjects', () => {
  const mockProjects = [
    {
      id: 1,
      name: 'a project'
    },
    {
      id: 2,
      name: 'another project'
    }
  ]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects)
      })
    }) 
  })
  it('should call fetch with the correct URL', () => {
    const expected = process.env.REACT_APP_BACKEND + `/api/v1/projects`
  
    api.getProjects()
  
    expect(window.fetch).toHaveBeenCalledWith(expected)
  })

  it('should return an array of projects', () => {
    const result = api.getProjects()

    expect(result).resolves.toEqual(mockProjects)
  })

  it('should return an error if the fetch is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false })
    })

    const result = api.getProjects()

    expect(result).rejects.toEqual(Error('Failed to fetch projects'))
  })

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch'))
    })

    const result = api.getProjects()
    expect(result).rejects.toEqual(Error('Failed to fetch'))
  })
})

describe('getProject', () => {
  const mockProject = {
    id: 1,
    name: 'rainbows and butterflies'
  }

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProject)
      })
    })
  })

  it('should call fetch with the correct URL', () => {
    const expectedUrl = process.env.REACT_APP_BACKEND + `/api/v1/projects/1`

    api.getProject(1)

    expect(window.fetch).toHaveBeenCalledWith(expectedUrl)
  })

  it('should return a project with the correct id', () => {
    const result = api.getProject(1)

    expect(result).resolves.toEqual(mockProject)
  })

  it('should should return an error if the fetch fails', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false })
    })

    const result = api.getProject(1)

    expect(result).rejects.toEqual(Error('Failed to fetch project'))
  })

  it('should return an error if the promise rejects', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch'))
    })

    const result = api.getProject(1)

    expect(result).rejects.toEqual(Error('Failed to fetch'))
  })

})

describe('postProject', () => {
  const mockProject = {name: 'hi this is a project'}

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve('Successfully added project')
      })
    })
  })

  it('should be called with the correct url and body', () => {
    const { name } = mockProject

    const expectedUrl = process.env.REACT_APP_BACKEND + `/api/v1/projects`

    const expectedBody = {
      "body": "{\"name\":\"hi this is a project\"}",
      "headers": {
        "Content-Type": "application/json"
      },
      "method": "POST"
    }

    api.postProject(name)

    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody)
  })

  it('should return a message indicating that the project was added successfully if the post is ok', () => {
    const result = api.postProject(mockProject)

    expect(result).resolves.toEqual('Successfully added project')
  })

  it('should return an error if the post is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ok: false})
    })
    const result = api.postProject(mockProject)
    expect(result).rejects.toEqual(Error('Failed to post new project'))
  })

  it('should return an error if the fetch fails', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to post'))
    })

    const result = api.postProject(mockProject)

    expect(result).rejects.toEqual(Error('Failed to post'))
  })
})


describe('deleteProject', () => {
  const mockProject = {id: 1, name: 'a project'}

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve('Successfully deleted project')
      })
    })
  })

  it('should be called with the correct URL', () => {
    const { id } = mockProject
    const expectedUrl = process.env.REACT_APP_BACKEND + `/api/v1/projects/1`

    const expectedBody = {method: 'DELETE'}

    api.deleteProject(id)

    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedBody)
  })

  it('should return a success message if the delete succeeds', () => {
    const result = api.deleteProject(1)
    expect(result).resolves.toEqual('Successfully deleted project')
  })

  it('should return an error if the repsonse is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: false })
    })
    const result = api.deleteProject(1)
    expect(result).rejects.toEqual(Error('Failed to delete project'))
  })

  it('should return an error if the fetch fails', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    })
    const result = api.deleteProject(1)

    expect(result).rejects.toEqual(Error('fetch failed'))
  })
})
