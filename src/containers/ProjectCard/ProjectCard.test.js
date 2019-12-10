import React from 'react'
import { shallow } from 'enzyme'
import {ProjectCard, mapState, mapDispatch} from './ProjectCard'
// import { deleteProject } from '../../../apiCalls'

// jest.mock('../../../apiCalls')

describe('ProjectCard', () => {
  describe('ProjectCard component', () => {
    let wrapper;
    beforeEach(() => {
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
        palettes={mockPalettes} 
        projects={mockProjects} 
        updateProjects={mockUpdateProjects} 
        updatePalettes={mockUpdatePalettes} 
      />)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})