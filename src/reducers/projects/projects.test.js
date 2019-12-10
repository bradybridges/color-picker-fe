import { projects } from './projects'

describe('projects', () => {
  it('should return the initial state', () => {
    const expected = []

    const result = projects(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return state with an array of project objects', () => {
    const projectsArray = [{id: 1, name: 'a project'}, {id: 2,name: 'another project'}]

    const mockAddProject = {type: 'ADD_PROJECTS', projects: projectsArray}

    const result = projects(undefined, mockAddProject)

    expect(result).toEqual(projectsArray)
  })

  it('should return state with a new project added', () => {
    const mockInitialState = [{id: 1, name: 'a project'}, {id: 2, name: 'another project'}]

    const newProject = {id: 3, name: 'yet another project'}

    const mockAddNewProject = {type: 'ADD_NEW_PROJECT', project: newProject}

    const expectedNewState = [{id: 1, name: 'a project'}, {id: 2, name: 'another project'},{id: 3, name: 'yet another project'}]

    const result = projects(mockInitialState, mockAddNewProject)

    expect(result).toEqual(expectedNewState)
  })
})