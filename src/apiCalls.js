export const getProjects = async () => {
  const response = await fetch('https://color-picker-backend.herokuapp.com/api/v1/projects');
  if(!response.ok) {
    return Error('Failed to fetch projects');
  }
  const projects = await response.json();
  return projects;
};

export const getPalettes = async () => {
  const response = await fetch('https://color-picker-backend.herokuapp.com/api/v1/palettes');
  if(!response.ok) {
    return Error('Failed to fetch palettes');
  }
  const palettes = await response.json();
  return palettes;
};

export const getProject = async (id) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/projects/${id}`);
  if(!response.ok) {
    return Error('Failed to fetch pallete');
  }
  const palette = await response.json();
  return palette;
};

export const getPalette = async (paletteId) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/palettes/${paletteId}`);
  if (!response.ok) {
    return Error('Failed to fetch palette');
  }
  const palette = await response.json();
  return palette;
};

export const postProject = async (name) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    return Error('Failed to post new project');
  }
  const message = await response.json();
  console.log('message', message)
  return message;
};

export const postPalette = async (project_id, palette_name, color_1, color_2, color_3, color_4, color_5) => {
  const response = await fetch('https://color-picker-backend.herokuapp.com/api/v1/palettes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        project_id,
        palette_name,
        color_1,
        color_2,
        color_3,
        color_4,
        color_5,
      },
    ),
  });
  if (!response.ok) {
    return response;
  }
  const message = await response.json();
  return message;
};

export const deleteProject = async (id) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    return Error('Failed to delete project');
  }
  const message = await response.json();
  return message;
};

export const deletePalette = async (id) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/palettes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    return Error('Failed to delete palette');
  }
  const message = await response.json();
  return message;
};

export const patchProject = async () => {

};

export const patchPalette = async () => {

};
