import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPalette } from '../../actions/index';
import './SavePaletteForm.css'

export class SavePaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedProject: null
    }
  }

  handleChange = e => {
    this.setState({
      selectedProject: [e.target.value]
    })
  }

  renderProjectOptions = () => {
    const options = this.props.projects.map((project) => {
      return <option key={`${project.name}`} value={project.id}>{project.name}</option>
    });
    return (
      <select onChange={this.handleChange}>
        {options}
      </select>
    );
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { tempPalette } = this.props;
    // const projectId = Number(e.target.querySelector('option').value);
    const projectId = parseInt(this.state.selectedProject)
    console.log('projId', projectId)
    // console.log('event target', e.target)
    // console.log('projectId in SavePaletteForm', e.target.querySelector('option'))
    const paletteName = e.target.querySelector('input').value;
    const color1 = tempPalette[0].color;
    const color2 = tempPalette[1].color;
    const color3 = tempPalette[2].color;
    const color4 = tempPalette[3].color;
    const color5 = tempPalette[4].color;
    const response = await this.props.savePalette(projectId, paletteName, color1, color2, color3, color4, color5);
    const paletteId = await response.id;
    const newPalette = { 
      id: paletteId,
      project_id: projectId, 
      palette_name: paletteName, 
      color_1: color1,
      color_2: color2,
      color_3: color3,
      color_4: color4,
      color_5: color5,
    }
    console.log('new palette', newPalette)
    this.props.addPalette(newPalette);
  }

  render() {
    return (
      <div className='form-container'>
      <form className='palette-form' onSubmit={this.handleSubmit}>
        {this.renderProjectOptions()}
        <input className='palette-title-input' placeholder="Enter Palette Name"/>
        <button className='palette-save-btn'>Save Palette</button>
      </form>
      </div>
    );
  }
}

export const mapState = (state) => ({
  tempPalette: state.tempPalette,
  projects: state.projects,
});

export const mapDispatch = (dispatch) => ({
  addPalette: (palette) => dispatch(addPalette(palette)),
});

export default connect(mapState, mapDispatch)(SavePaletteForm);