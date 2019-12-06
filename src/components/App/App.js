import React, { Component } from 'react';
import './App.css';
import { getProjects, getPalettes } from '../../apiCalls';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      palettes: [],
      colors: []
    }
  }
  componentDidMount = async () => {
    const projects = await getProjects();
    console.log(projects);
    const palettes = await getPalettes();
    console.log(palettes);
    this.setState({ projects, palettes });
  }

  render() {
    return (
      <h1>Hello</h1>
    );
  }
}

export default App;
