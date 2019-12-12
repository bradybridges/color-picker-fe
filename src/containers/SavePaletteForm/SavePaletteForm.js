import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPalette } from '../../actions/index';
import './SavePaletteForm.scss';

export class SavePaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedProject: '',
      paletteName: '',
    };
  }

  handleOptionChange = (e) => {
    this.setState({
      selectedProject: e.target.value,
    })
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      paletteName: e.target.value,
    })
  }

  resetForm = () => {
    this.setState({ paletteName: '' });
  }

  renderProjectOptions = () => {
    const { projects } = this.props;
    const firstId = projects.length ? String(projects[0].id): null;
    const selectedId = this.state.selectedProject;
    if(projects.length === 1 && firstId !== selectedId) {
      this.setState({ selectedProject: `${firstId}`});
    }
    const options = this.props.projects.map((project) => {
      return <option key={`${project.name}`} value={project.id}>{project.name}</option>
    });
    return (
      <select onChange={this.handleOptionChange}>
        {options}
      </select>
    );
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { tempPalette } = this.props;
    const projectId = parseInt(this.state.selectedProject)
    const paletteName = this.state.paletteName;
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
    this.resetForm();
  }

  render() {
    return (
      <div className="form-container">
        <form className="palette-form" onSubmit={this.handleSubmit}>
          {this.renderProjectOptions()}
          <input
            className="palette-title-input"
            placeholder="Enter Palette Name"
            onChange={this.handleInputChange}
            value={this.state.paletteName}
          />
          <button type="submit" className='palette-save-btn'>Save Palette</button>
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

SavePaletteForm.propTypes = {
  tempPalette: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  addPalette: PropTypes.func.isRequired,
  savePalette: PropTypes.func.isRequired,
};
