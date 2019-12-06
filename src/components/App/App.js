import React, { Component } from 'react';
import './App.css';
import { getProjects, getPalettes } from '../../apiCalls';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

export class App extends Component {
 
  componentDidMount = async () => {
    const projects = await getProjects();
    this.props.setProjects(projects);
    const palettes = await getPalettes();
    this.props.setPalettes(palettes);
  }

  render() {
    return (
      <h1>Hello</h1>
    );
  }
}

export const mapState = (state) => ({
  projects: state.projects,
  palettes: state.palettes,
});

export const mapDispatch = (dispatch) => ({
  setProjects: (projects) => dispatch(actions.addProjects(projects)),
  setPalettes: (palettes) => dispatch(actions.addPalettes(palettes)),
});

export default connect(mapState, mapDispatch)(App);
