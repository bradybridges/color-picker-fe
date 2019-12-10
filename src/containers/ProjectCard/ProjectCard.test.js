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

    it('should something something ', () => {
      const mockEvent = { preventDefault() { } };
    })
  })
})




// it('should update userInfo state when addUserInfo gets invoked', () => {
//   // Setup
//   const wrapper = shallow(<App />);
//   const expected = [{ name: 'Darth Vader', quote: 'I am your father.', skillLevel: 'Expert' }];

//   expect(wrapper.state('userInfo')).toEqual([]);

//   // Execution
//   wrapper.instance().addUserInfo(expected)

//   // Expectation
//   expect(wrapper.state('userInfo')).toEqual(expected);
// });