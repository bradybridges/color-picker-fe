import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProjectCard.scss';
import Palette from '../Palette/Palette';
import { deleteProject } from '../../apiCalls';
import * as actions from '../../actions';

export class ProjectCard extends Component {
  constructor() {
    super();
    this.state = {
      showDeleteModal: false,
    };
  }
  renderPalettes = () => {
    const { palettes, id } = this.props;
    const currentPalettes = palettes.filter((palette) => palette.project_id === id);
    return currentPalettes.map((palette, index) => {
      return (
        <Palette
          {...palette}
          key={`${palette.id}${index}`}
          className='palette-card'
        />
      );
    })
  }
  renderDeleteModal = () => {
    const { name } = this.props;
    return (
      <div className="delete-modal">
        <h4>Are you want to delete {name}?</h4>
        <div className="delete-confirmation-container">
          <button className="project-button" type="button" onClick={this.handleDeleteProject}>Delete</button>
          <button className="project-button" type="button" onClick={this.handleCancelDelete}>Cancel</button>
        </div>
      </div>
    );
  }
  handleCancelDelete = () => {
    this.setState({ showDeleteModal: false });
  }
  handleDeleteProject = (e) => {
    e.preventDefault();
    const { id, projects, palettes } = this.props;
    deleteProject(id);
    this.updateProjects(id, projects);
    this.updatePalettes(id, palettes);
  }
  showModal = () => {
    this.setState({ showDeleteModal: true });
  }
  updateProjects = (id, projects) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    this.props.updateProjects(updatedProjects);
  }
  updatePalettes = (id, palettes) => {
    const updatedPalettes = palettes.filter((palette) => palette.project_id !== id);
    this.props.updatePalettes(updatedPalettes);
  }
  render() {
    const { name } = this.props;
    return (
      <section className='project-card'>
        <div className="project-title-container">
          <h4 className='project-name'>{name}</h4>
          <button
            className="project-button"
            type="button"
            onClick={this.showModal}
          >
            Delete Project
          </button>
        </div>
        {this.renderPalettes()}
        {this.state.showDeleteModal && this.renderDeleteModal()}
      </section>
    );
  }
}

export const mapState = (state) => ({
  palettes: state.palettes
});

export const mapDispatch = (dispatch) => ({
  updateProjects: (projects) => dispatch(actions.addProjects(projects)),
  updatePalettes: (palettes) => dispatch(actions.addPalettes(palettes)),
});

export default connect(mapState, mapDispatch)(ProjectCard);
