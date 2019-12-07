import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTempPalette } from '../../actions/index';

const lockedImg = require('../../images/lock.svg');
const unlockedImg = require('../../images/unlocked-padlock.svg');

export class PaletteColorItem extends Component {
  handleToggleColorLock = () => {
    const { color, isLocked } = this.props;
    const updatedPalette = this.props.tempPalette.map((color) => color);
    const colorToUpdate = updatedPalette.find((palItem) => {
      if(palItem.color === color && palItem.isLocked === isLocked) {
        return true;
      }
    });
    colorToUpdate.isLocked = !colorToUpdate.isLocked;
    this.props.setTempPalette(updatedPalette);
  };

  render() {
    const { color, isLocked } = this.props;
    const lockImg = isLocked ? lockedImg : unlockedImg;
    const style = { backgroundColor: color }
    return (
      <section style={style}>
        <p>{color}</p>
        <img src={lockImg} alt="lock or unlock color" onClick={this.handleToggleColorLock}/>
      </section>
    );
  }
}

const mapState = (state) => ({
  tempPalette: state.tempPalette,
});

const mapDispatch = (dispatch) => ({
  setTempPalette: (palette) => dispatch(setTempPalette(palette)),
});

export default connect(mapState, mapDispatch)(PaletteColorItem);
