import React from 'react'
import { shallow } from 'enzyme'
import {ProjectCard, mapState, mapDispatch} from './ProjectCard'
import { deleteProject } from '../../apiCalls'
import { addProjects, addPalettes } from '../../actions'

jest.mock('../../apiCalls')

describe('ProjectCard', () => {
  describe('ProjectCard component', () => {
    let wrapper;
    beforeEach(() => {
      deleteProject.mockImplementation(() => {
        return Promise.resolve({message: 'Successfully deleted project'})
      })
      const mockPalettes = [
          {
            id: 1,
            project_id: 1,
            name: 'a palette',
            color_1: '#123456',
            color_2: '#123456',
            color_3: '#123456',
            color_4: '#123456',
            color_5: '#123456',
          }, 
          {
            id: 2,
            project_id: 1,
            name: 'another palette',
            color_1: '#AABBCC',
            color_2: '#AABBCC',
            color_3: '#AABBCC',
            color_4: '#AABBCC',
            color_5: '#AABBCC',
          }
        ]
      

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

      const mockUpdateProjects = jest.fn();
      const mockUpdatePalettes = jest.fn()
      wrapper = shallow(<ProjectCard
        name="Great Project"
        palettes={mockPalettes}
        projects={mockProjects}
        id={1} 
        updateProjects={mockUpdateProjects} 
        updatePalettes={mockUpdatePalettes} 
      />)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should update showDeleteModal to false in state when handleCancelDelete is invoked', () => {
      // const expected = { showDeleteModal: false }

      wrapper.instance().setState({ showDeleteModal: true})

      wrapper.instance().handleCancelDelete()

      expect(wrapper.state('showDeleteModal')).toEqual(false)
    })

    it('should update showDeleteModal to true in state when showModal is called', () => {
      wrapper.instance().setState({ showDeleteModal: true })

      wrapper.instance().showModal()

      expect(wrapper.state('showDeleteModal')).toEqual(true)
    })

    it('call handleDeleteProject with the correct information', () => {
      const mockEvent = { preventDefault: jest.fn() }
      
      wrapper.instance().updateProjects = jest.fn()
      wrapper.instance().updatePalettes = jest.fn()

      wrapper.instance().handleDeleteProject(mockEvent)

      expect(deleteProject).toHaveBeenCalledWith(1);

      expect(wrapper.instance().updateProjects).toHaveBeenCalledWith(1, [{"id": 1, "name": "a project"}, {"id": 2, "name": "another project"}])

      expect(wrapper.instance().updatePalettes).toHaveBeenCalledWith(1, [
        {
          id: 1,
          project_id: 1,
          name: 'a palette',
          color_1: '#123456',
          color_2: '#123456',
          color_3: '#123456',
          color_4: '#123456',
          color_5: '#123456',
        }, 
        {
          id: 2,
          project_id: 1,
          name: 'another palette',
          color_1: '#AABBCC',
          color_2: '#AABBCC',
          color_3: '#AABBCC',
          color_4: '#AABBCC',
          color_5: '#AABBCC',
        }
      ])
      


    })

    it('should call updateProjects with the correct information', () => {
      const result = wrapper.instance().updateProjects(1,[{"id": 1, "name": "a project"}, {"id": 2, "name": "another project"}])

      expect(wrapper.instance().props.updateProjects).toHaveBeenCalledWith([{"id": 2, "name": "another project"}])


    })

    it('should call updatePalettes with the correct information', () => {
      const result = wrapper.instance().updatePalettes(1,[
        {
          id: 1,
          project_id: 1,
          name: 'a palette',
          color_1: '#123456',
          color_2: '#123456',
          color_3: '#123456',
          color_4: '#123456',
          color_5: '#123456',
        }, 
        {
          id: 2,
          project_id: 1,
          name: 'another palette',
          color_1: '#AABBCC',
          color_2: '#AABBCC',
          color_3: '#AABBCC',
          color_4: '#AABBCC',
          color_5: '#AABBCC',
        }
      ])

      expect(wrapper.instance().props.updatePalettes).toHaveBeenCalledWith([])


    })
  })

  describe('mapState', () => {
    it('should return an object with the projects array', () => {
      const mockState = {
        projects: [
          {
            id: 1,
            name: 'a project'
          }, 
          {
            id: 2,
            name: 'another project'
          }
        ],
        palettes: [
          {
            id: 1,
            project_id: 1,
            name: 'a palette',
            color_1: '#FFFFFF',
            color_2: '#FFFFFF',
            color_3: '#FFFFFF',
            color_4: '#FFFFFF',
            color_5: '#FFFFFF',
          }
        ]
      }

      const expectedState = {
        projects: [
          {
            id: 1,
            name: 'a project'
          }, 
          {
            id: 2,
            name: 'another project'
          }
        ],
        palettes: [
          {
            id: 1,
            project_id: 1,
            name: 'a palette',
            color_1: '#FFFFFF',
            color_2: '#FFFFFF',
            color_3: '#FFFFFF',
            color_4: '#FFFFFF',
            color_5: '#FFFFFF',
          }
        ]
      }

      const mappedProps = mapState(mockState)

      expect(mappedProps).toEqual(expectedState)
    })
  })

  describe('mapDispatch', () => {
    it('calls dispatch with a projects array when updateProjects is called', () => {
      const mockDispatch = jest.fn()

      const actionToDispatch = addProjects([{id: 1, name: 'a name'}, {id: 2, name: 'another name'}])

      const mappedProps = mapDispatch(mockDispatch)

      mappedProps.updateProjects([{id: 1, name: 'a name'}, {id: 2, name: 'another name'}])

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a palettes array when updatePalettes is called', () => {
      const mockDispatch = jest.fn()

      const actionToDispatch = addPalettes([
        {
          id: 1,
          project_id: 1,
          name: 'a palette',
          color_1: '#FFFFFF',
          color_2: '#FFFFFF',
          color_3: '#FFFFFF',
          color_4: '#FFFFFF',
          color_5: '#FFFFFF',
        }
      ])

      const mappedProps = mapDispatch(mockDispatch)

      mappedProps.updatePalettes([
        {
          id: 1,
          project_id: 1,
          name: 'a palette',
          color_1: '#FFFFFF',
          color_2: '#FFFFFF',
          color_3: '#FFFFFF',
          color_4: '#FFFFFF',
          color_5: '#FFFFFF',
        }
      ])

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
