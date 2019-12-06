export const getProjects = async () => {
  const response = await fetch('https://color-picker-backend.herokuapp.com/api/v1/projects');
  if(!response.ok) {
    return Error('Failed to fetch projects');
  }
  const projects = await response.json();
  return projects;
}

export const getPalettes = async () => {
  const response = await fetch('https://color-picker-backend.herokuapp.com/api/v1/palettes');
  if(!response.ok) {
    return Error('Failed to fetch palettes');
  }
  const palettes = await response.json();
  return palettes;
}

export const getProject = async (name) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/projects/${name}`);
  if(!response.ok) {
    return Error('Failed to fetch pallete');
  }
  const palette = await response.json();
  return palette;
}

export const getPalette = async (paletteName) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/palettes/${paletteName}`);
  if(!response.ok) {
    return Error('Failed to fetch palette');
  }
  const palette = await response.json();
  return palette;
}

export const postProject = async (name) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/projects`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  if(!response.ok) {
    return Error('Failed to post new project');
  }
  const message = await response.json();
  return message;
}

export const postPalette = async (palette_name, project_id, color_1, color_2, color_3, color_4, color_5) => {
  const response = await fetch('https://color-picker-backend.herokuapp.com/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify({ palette_name, project_id, color_1, color_2, color_3, color_4, color_5 }),
  });
  if(!response.ok) {
    return Error('Failed to postnew palette');
  }
  const message = await response.json();
  return message;
}

export const deleteProject = async (id) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/projects/${id}`);
  if(!response.ok) {
    return Error('Failed to delete project');
  }
  const message = await response.json();
  return message;
}

export const deletePalette = async (id) => {
  const response = await fetch(`https://color-picker-backend.herokuapp.com/api/v1/palettes/${id}`);
  if(!response.ok) {
    return Error('Failed to delete palette');
  }
  const message = await response.json();
  return message;
}

export const patchProject = async () => {

}

export const patchPalette = async () => {

}