export const projects = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PROJECTS':
      return action.projects;
    case 'ADD_NEW_PROJECT':
      return [...state, action.project];
    default:
      return state;
  }
};
