import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewProject } from '../../actions/index'
import './SaveProjectForm.css'

export class SaveProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }


  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { addNewProject } = this.props
    const response = await this.props.postProject(name)
    const id = await response.id
    console.log('id', id)
    addNewProject(name)
  }


  render() {
    return (
      <div className='project-form-container'>
        <form className='project-form'>
          <input
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            placeholder='Enter project name'
            className='project-name-input'
          />
        </form>
        <button className='submit-project-btn' onClick={(e) => this.handleSubmit(e)}>Submit New Project</button>
      </div>
    )
  }
}



export const mapState = (state) => ({
  projects: state.projects
})

export const mapDispatch = (dispatch) => ({
  addNewProject: (project) => dispatch(addNewProject(project))
})

export default connect(mapState, mapDispatch)(SaveProjectForm);