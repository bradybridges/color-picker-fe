import React from 'react'
import { shallow } from 'enzyme'
import { SaveProjectForm, mapState, mapDispatch } from './SaveProjectForm'
import { addNewProject } from '../../actions'
import { postProject } from '../../apiCalls'


jest.mock('../../apiCalls')

describe('SaveProjectForm', () => {
  describe('SaveProjectForm component', () => {
    let wrapper;

    beforeEach(() => {

      postProject.mockImplementation(() => {
        return Promise.resolve({id: 3})
      })
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

      const mockPostProject = jest.fn()
      
      wrapper = shallow(<SaveProjectForm projects={mockProjects} postProject={mockPostProject} />)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should update name in state when handleChange is called', () => {
      const mockEvent = { preventDefault() {}, target: {name: 'name', value: 'exciting title'}}

      const expected = 'exciting title'

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state('name')).toEqual(expected)
    })

    it('should call the handleSubmit method method when the button is clicked with the correct information', () => {
      wrapper.instance().handleSubmit = jest.fn()
      wrapper.instance().forceUpdate()

      wrapper.find('button').simulate('click')

      expect(wrapper.instance().handleSubmit).toHaveBeenCalled()
    })

    it.skip('should call handleSubmit with the correct information', () => {
      const mockEvent = { preventDefault: jest.fn() }

      wrapper.instance().setState({'name': 'rainbows and unicorns'})

      wrapper.instance().addNewProject = jest.fn()

      wrapper.instance().handleSubmit = jest.fn()

      wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.instance().handleSubmit).toHaveBeenCalled


    })
  })
})


// it('call handleDeleteProject with the correct information', () => {
//   const mockEvent = { preventDefault: jest.fn() }
  
//   wrapper.instance().updateProjects = jest.fn()
//   wrapper.instance().updatePalettes = jest.fn()

//   wrapper.instance().handleDeleteProject(mockEvent)

//   expect(deleteProject).toHaveBeenCalledWith(1);

//   expect(wrapper.instance().updateProjects).toHaveBeenCalledWith(1, [{"id": 1, "name": "a project"}, {"id": 2, "name": "another project"}])

//   expect(wrapper.instance().updatePalettes).toHaveBeenCalledWith(1, [
//     {
//       id: 1,
//       project_id: 1,
//       name: 'a palette',
//       color_1: '#123456',
//       color_2: '#123456',
//       color_3: '#123456',
//       color_4: '#123456',
//       color_5: '#123456',
//     }, 
//     {
//       id: 2,
//       project_id: 1,
//       name: 'another palette',
//       color_1: '#AABBCC',
//       color_2: '#AABBCC',
//       color_3: '#AABBCC',
//       color_4: '#AABBCC',
//       color_5: '#AABBCC',
//     }
//   ])
  


// })



// it('should call the submitForm method when the button is clicked', () => {
//   wrapper.instance().submitForm = jest.fn()
//   wrapper.instance().forceUpdate()

//   wrapper.find('button').simulate('click')

//   expect(wrapper.instance().submitForm).toHaveBeenCalled()
// })

// it.skip('should call the submitForm method with the properties in state when the button is clicked', () => {
//   const mockTitle = 'a title'
//   const mockPlot = 'a plot'

//   wrapper.instance().submitForm = jest.fn()

//   wrapper.instance().setState({
//     title: mockTitle,
//     plot: mockPlot
//   })

//   wrapper.find('button').simulate('click')

//   expect(wrapper.instance().submitForm).toHaveBeenCalledWith(mockTitle, mockPlot)
// })
// })