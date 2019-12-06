import React, { Component } from 'react';
import './App.css';
import { getProjects, getPalettes } from '../../apiCalls';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
 
  componentDidMount = async () => {
    const projects = await getProjects();
    this.props.setProjects(projects);
    const palettes = await getPalettes();
    this.props.setPalettes(palettes);
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <main>
        {this.state.isLoading && <h1>Loading...</h1>}
        <h1>Hello</h1>
      </main>
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
