import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Palette.css';
import { connect } from 'react-redux';
import { addPalettes, setTempPalette } from '../../actions/index';
import { deletePalette } from '../../apiCalls';
const deleteButton = require('../../images/delete.svg');
export class Palette extends Component {
  handleDeletePalette = async () => {
    const id = Number(this.props.id);
    const updatedPalettes = this.props.palettes.filter((palette) => palette.id !== id);
    this.props.updatePalettes(updatedPalettes);
    deletePalette(id);
  }

  loadPalette = () => {
    const { color_1, color_2, color_3, color_4, color_5 } = this.props;
    const tempPalette = [
      { name: "color_1", color: color_1, isLocked: false, },
      { name: "color_2", color: color_2, isLocked: false, },
      { name: "color_3", color: color_3, isLocked: false, },
      { name: "color_4", color: color_4, isLocked: false, },
      { name: "color_5", color: color_5, isLocked: false, },
    ];
    this.props.setTempPalette(tempPalette);
  }

  render() {
    const { palette_name, color_1, color_2, color_3, color_4, color_5 } = this.props;
    return (
      <section className='palette' onClick={this.loadPalette}>
        <div className='title-container'>
          <h6 className='palette-name'>{palette_name}</h6>
          <img 
            className='delete-button' 
            src={deleteButton} 
            alt="delete button" 
            onClick={this.handleDeletePalette} 
          />
        </div>
        <div className='palette-color-container'>
          <div className='color1' style={{backgroundColor: color_1}} />
          <div className='color2' style={{backgroundColor: color_2}} />
          <div className='color3' style={{backgroundColor: color_3}} />
          <div className='color4' style={{backgroundColor: color_4}} />
          <div className='color5' style={{backgroundColor: color_5}} />
        </div>
      </section>
    );
  }
}

export const mapState = (state) => ({
  palettes: state.palettes,
});

export const mapDispatch = (dispatch) => ({
  updatePalettes: (palettes) => dispatch(addPalettes(palettes)),
  setTempPalette: (palette) => dispatch(setTempPalette(palette)),
});

export default connect(mapState, mapDispatch)(Palette);

Palette.propTypes = {
  palettes: PropTypes.array.isRequired,
  updatePalettes: PropTypes.func.isRequired,
  setTempPalette: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  palette_name: PropTypes.string.isRequired,
  color_1: PropTypes.string.isRequired,
  color_2: PropTypes.string.isRequired,
  color_3: PropTypes.string.isRequired,
  color_4: PropTypes.string.isRequired,
  color_5: PropTypes.string.isRequired,
};