import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPalette } from '../../actions/index';

export class SavePaletteForm extends Component {
  renderProjectOptions = () => {
    const options = this.props.projects.map((project) => {
      return <option key={`${project.name}`} value={project.id}>{project.name}</option>
    });
    return (
      <select>
        {options}
      </select>
    );
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { tempPalette } = this.props;
    const projectId = Number(e.target.querySelector('option').value);
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
    this.props.addPalette(newPalette);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderProjectOptions()}
        <input placeholder="Enter Palette Name"/>
        <button>Save Palette</button>
      </form>
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