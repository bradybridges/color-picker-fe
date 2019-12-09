import React, { Component } from 'react';
import './App.css';
import * as api from '../../apiCalls';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import SavePaletteForm from '../SavePaletteForm/SavePaletteForm';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import SaveProjectForm from '../SaveProjectForm/SaveProjectForm'

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      tempColors: [
        {name: 'color_1', color: '#000000', isLocked: false },
        {name: 'color_2', color: '#000000', isLocked: false },
        {name: 'color_3', color: '#000000', isLocked: false },
        {name: 'color_4', color: '#000000', isLocked: false },
        {name: 'color_5', color: '#000000', isLocked: false },
      ],
    };
  }
 
  componentDidMount = async () => {
    const projects = await api.getProjects();
    const palettes = await api.getPalettes();
    this.props.setProjects(projects);
    this.props.setPalettes(palettes);
    this.setState({ isLoading: false });
  }

  generatePalette = () => {
    this.props.tempPalette.forEach((color, i) => {
      if(!color.isLocked) {
        const randomColor = this.generateColor();
        //this is so we don't modify store directly but call actions to handle this
        let updatedPalette = this.props.tempPalette.map((color) => color);
        updatedPalette[i].color = randomColor;
        this.props.setTempPalette(updatedPalette);
      }
    });
  }

  generateColor = () => {
    const options = ['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'];
    let newColor = [];
    for(let i = 0; i < 6; i++) { 
      const randomIndex = Math.floor(Math.random() * options.length);
      newColor.push(options[randomIndex]);
    }
    newColor.unshift('#');
    return newColor.join('');
  }

  render() {
    return (
      <main className='main-content'>
        {this.state.isLoading && <h1>Loading...</h1>}
        <h1 className='main-header'>Color Coordinated</h1>
        <div className='button-container'>
          <button onClick={this.generatePalette} className='generate-btn'>Generate</button>
        </div>
        <PaletteContainer />
        <SaveProjectForm postProject={api.postProject}/>
        <SavePaletteForm savePalette={api.postPalette}/>
        <section className='user-projects'>
          <ProjectContainer />
        </section>
      </main>
    );
  }
}

export const mapState = (state) => ({
  projects: state.projects,
  palettes: state.palettes,
  tempPalette: state.tempPalette,
});

export const mapDispatch = (dispatch) => ({
  setProjects: (projects) => dispatch(actions.addProjects(projects)),
  setPalettes: (palettes) => dispatch(actions.addPalettes(palettes)),
  setTempPalette: (palette) => dispatch(actions.setTempPalette(palette)),
});

export default connect(mapState, mapDispatch)(App);
