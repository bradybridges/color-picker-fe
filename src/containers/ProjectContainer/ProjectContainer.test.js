import { ProjectContainer, mapState } from './ProjectContainer'
import { shallow } from 'enzyme'
import React from 'react'

describe('ProjectContainer', () => {
  describe('ProjectContainer component', () => {
    let wrapper;
    beforeEach(() => {
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

      wrapper = shallow(<ProjectContainer projects={mockProjects}/>)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
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
          ]
        }

        const mappedProps = mapState(mockState)

        expect(mappedProps).toEqual(expectedState)
      })
    })
  })
