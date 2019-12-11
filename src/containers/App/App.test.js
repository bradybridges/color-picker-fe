import React from 'react';
import ReactDOM from 'react-dom';
import {App, mapState, mapDispatch } from './App';
import { shallow } from 'enzyme'
import { addProjects, addPalettes, setTempPalette } from '../../actions'
import * as api from '../../apiCalls'
//getProjects, getPalettes


//props: projects, palettes, tempPalette, setProjects, setPalettes
//setTempPalette, getProjects, getPalettes

jest.mock('../../apiCalls')

describe('App', () => {
  describe('App component', () => {
    let wrapper;

    beforeEach(() => {
       api.getProjects.mockImplementation(() => {
        return Promise.resolve([
          {
            id: 1,
            name: 'a project'
          }, 
          {
            id: 2,
            name: 'another project'
          }
        ])
      })

       api.getPalettes.mockImplementation(() => {
        return Promise.resolve([
          {
            id: 1,
            project_id: 1,
            name: 'a palette',
            color_1: '#FFFFFF',
            color_2: '#111111',
            color_3: '#222222',
            color_4: '#333333',
            color_5: '#444444',
          },
          {
            id: 2,
            project_id: 1,
            name: 'some other palette',
            color_1: '#000000',
            color_2: '#AAAAAA',
            color_3: '#BBBBBB',
            color_4: '#CCCCCC',
            color_5: '#DDDDDD',
          }
        ])
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

      const mockPalettes = [
        {
          id: 1,
          project_id: 1,
          name: 'a palette',
          color_1: '#FFFFFF',
          color_2: '#111111',
          color_3: '#222222',
          color_4: '#333333',
          color_5: '#444444',
        },
        {
          id: 2,
          project_id: 1,
          name: 'some other palette',
          color_1: '#000000',
          color_2: '#AAAAAA',
          color_3: '#BBBBBB',
          color_4: '#CCCCCC',
          color_5: '#DDDDDD',
        }
      ]

      const mockTempPalette = [
        {name: 'color_1', color: '#AAAAAA', isLocked: false},
        {name: 'color_2', color: '#AAAAAA', isLocked: false},
        {name: 'color_3', color: '#AAAAAA', isLocked: false},
        {name: 'color_4', color: '#AAAAAA', isLocked: false},
        {name: 'color_5', color: '#AAAAAA', isLocked: false},
      ]

      const mockSetProjects = jest.fn()
      const mockSetPalettes = jest.fn()
      const mockSetTempPalette = jest.fn()

      wrapper = shallow(<App 
        projects={mockProjects} 
        palettes={mockPalettes} 
        tempPalette={mockTempPalette}
        setProjects={mockSetProjects}
        setPalettes={mockSetPalettes}
        setTempPalette={mockSetTempPalette} 
        />)
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should fetch projects after mounting', () => {
      expect(api.getProjects).toHaveBeenCalled()
    })

    it('should fetch palettes after mounting', () => {
      expect(api.getPalettes).toHaveBeenCalled()
    })

    it('should call setProjects after mounting', () => {
      expect(wrapper.instance().props.setProjects).toHaveBeenCalled()
      expect(wrapper.instance().props.setProjects).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'a project'
        }, 
        {
          id: 2,
          name: 'another project'
        }
      ])
    })

    it('should call setPalettes after mounting', () => {
      expect(wrapper.instance().props.setPalettes).toHaveBeenCalled()
      expect(wrapper.instance().props.setPalettes).toHaveBeenCalledWith([
        {
          id: 1,
          project_id: 1,
          name: 'a palette',
          color_1: '#FFFFFF',
          color_2: '#111111',
          color_3: '#222222',
          color_4: '#333333',
          color_5: '#444444',
        },
        {
          id: 2,
          project_id: 1,
          name: 'some other palette',
          color_1: '#000000',
          color_2: '#AAAAAA',
          color_3: '#BBBBBB',
          color_4: '#CCCCCC',
          color_5: '#DDDDDD',
        }
      ])
    })

    it('should call the generatePalette method when the button is clicked', () => {
      wrapper.instance().generatePalette = jest.fn()

      wrapper.instance().forceUpdate()

      wrapper.find('button').simulate('click')

      expect(wrapper.instance().generatePalette).toHaveBeenCalled()
    })
    
    it('should call setTempPalette when the button is clicked and generatePalette is called', () => {
      wrapper.instance().generatePalette()

      expect(wrapper.instance().props.setTempPalette).toHaveBeenCalled()
    })
  })
})


